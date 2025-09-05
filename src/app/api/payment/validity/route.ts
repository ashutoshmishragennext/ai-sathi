// src/app/api/user/validity/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/db';
import { StudentsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required.' }, { status: 400 });
    }

    const student = await db.query.StudentsTable.findFirst({
      where: eq(StudentsTable.email, email),
    });

    const now = new Date();
    const isValid = student && student.validityExpiresAt && student.validityExpiresAt > now;

    return NextResponse.json({
      success: true,
      isValid,
    });
  } catch (error) {
    console.error('Error checking user validity:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}