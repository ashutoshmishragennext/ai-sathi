import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: true, message: "Email is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://staging-api.languify.in/client/v2/generate-link?userEmail=${email}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          secret: process.env.LANGUIFY_SECRET || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Languify API error: ${response.statusText}`);
    }

    const data = await response.json();

    // extract the redirect link
    const redirectUrl = data?.data?.link;

    return NextResponse.json({
      error: false,
      message: "Redirect URL generated successfully",
      redirectUrl, // 👈 only sending the link
    });

  } catch (error: any) {
    console.error('Error onboarding user to Languify:', error);
    return NextResponse.json(
      { error: true, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
