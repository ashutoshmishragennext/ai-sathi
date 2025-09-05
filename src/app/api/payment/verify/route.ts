// src/app/api/payment/verify/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { db } from '@/db';
import { PaymentsTable, StudentsTable, NewPayment, NewStudent } from '@/db/schema';
import { eq } from 'drizzle-orm';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

interface UserData {
  userId: string;
  name: string;
  email: string;
  planName?: string;
  firstName?: string;
  lastName?: string;
}

interface LanguifyUserData {
  name: string;
  email: string;
  accessPeriod: number;
}

interface PaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  userData: UserData;
}

async function onboardUser(userData: LanguifyUserData): Promise<any> {

  console.log(userData)
  try {
    const response = await fetch('https://staging-api.languify.in/client/user-onboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'secret': process.env.LANGUIFY_SECRET || '',
      },
      body: JSON.stringify({
        user: userData,
        batch: process.env.LANGUIFY_BATCH_ID,
      }),
    });

    if (!response.ok) {
      throw new Error(`Languify API error: ${response.statusText}`);
    }
    

    return await response.json();
  } catch (error) {
    console.error('Error onboarding user to Languify:', error);
    throw error;
  }
}

function getAccessPeriod(planName: string): number {
  switch (planName) {
    case 'Basic Plan':
      return 0;
    case 'Standard Plan':
      return 1;
    case 'Premium Plan':
      return 6;
    default:
      return 1;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentVerificationRequest = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userData,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userData?.userId) {
      return NextResponse.json({
        success: false,
        error: 'Missing required payment verification data',
      }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('RAZORPAY_KEY_SECRET is not defined');
      return NextResponse.json({
        success: false,
        error: 'Payment configuration error',
      }, { status: 500 });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return NextResponse.json({
        success: false,
        error: 'Payment verification failed due to invalid signature',
      }, { status: 400 });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const order = await razorpay.orders.fetch(razorpay_order_id);
    
    const planName = (order.notes as any)?.planName || userData.planName || 'Standard Plan';
    const accessPeriodMonths = getAccessPeriod(planName);

    const newPayment: NewPayment = {
      userId: userData.userId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      planName: planName,
      amount: Number(payment.amount),
      status: payment.status,
    };
    await db.insert(PaymentsTable).values(newPayment).onConflictDoNothing({
      target: PaymentsTable.razorpayPaymentId,
    });

    const now = new Date();
    const existingStudent = await db.query.StudentsTable.findFirst({
        where: eq(StudentsTable.userId, userData.userId)
    });

    let newExpiryDate = now;
    if (existingStudent && existingStudent.validityExpiresAt && existingStudent.validityExpiresAt > now) {
        newExpiryDate = new Date(existingStudent.validityExpiresAt);
    }
    newExpiryDate.setMonth(newExpiryDate.getMonth() + accessPeriodMonths);
    
    const newStudentData: Partial<NewStudent> = {
      userId: userData.userId,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      accessPeriodMonths: accessPeriodMonths,
      validityExpiresAt: newExpiryDate,
    };
    await db.insert(StudentsTable).values(newStudentData as NewStudent).onConflictDoUpdate({
      target: StudentsTable.userId,
      set: {
        accessPeriodMonths: accessPeriodMonths,
        validityExpiresAt: newExpiryDate,
        updatedAt: now,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    });

    const languifyUserData: LanguifyUserData = {
      name: userData.name,
      email: userData.email,
      accessPeriod: accessPeriodMonths,
    };
    await onboardUser(languifyUserData);

    return NextResponse.json({
      success: true,
      message: 'Payment verified and user access granted.',
      data: {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        planName,
        accessPeriod: accessPeriodMonths,
        redirectUrl: 'https://staging-interview.languify.in',
      },
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json({
      success: false,
      error: 'Payment verification failed',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
    }, { status: 500 });
  }
}