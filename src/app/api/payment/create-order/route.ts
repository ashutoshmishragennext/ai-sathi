// src/app/api/payment/create-order/route.ts
import { NextResponse, type NextRequest } from 'next/server';
import Razorpay from 'razorpay';

// Initialize a single Razorpay instance at the top level
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Define the request body interface for clarity
interface CreateOrderRequest {
  amount: number;
  currency?: string;
  planName: string;
  userEmail: string;
}

// Define the response from Razorpay's API for type safety
interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, any>;
  created_at: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();
    const { amount, currency = 'INR', planName, userEmail } = body;

    // Data validation: Check if all required fields are present
    if (!amount || !planName || !userEmail) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields: amount, planName, and userEmail are required.' 
      }, { status: 400 });
    }

    // Amount validation: Must be a positive number
    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Amount must be a positive number.' 
      }, { status: 400 });
    }

    // Email validation: Use a basic regex for format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid email format.' 
      }, { status: 400 });
    }

    // Convert amount to paise (1 INR = 100 paise) and ensure it's an integer
    const finalAmount = Math.round(amount * 100);

    // Create the order with Razorpay's API
    const order = await razorpay.orders.create({
      amount: finalAmount,
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        planName,
        userEmail,
      },
    });

    return NextResponse.json({
      success: true,
      order,
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    // Return a generic error message for security in production
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create payment order.', 
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined 
      },
      { status: 500 }
    );
  }
}