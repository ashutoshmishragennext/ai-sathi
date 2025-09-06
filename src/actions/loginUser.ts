// loginUser.ts
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import * as z from "zod";
import { findUserByEmail } from "./user";
import { sendEmail } from "@/lib/mailer";
import { LoginSchema } from "@/validaton-schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateEmailVerificationToken } from "@/lib/token";

export async function loginUser(values: z.infer<typeof LoginSchema>) {
  const validation = LoginSchema.safeParse(values);
  
  if (!validation.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validation.data;
  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateEmailVerificationToken(existingUser.email);
    
    if (verificationToken) {
      const emailVerificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_ENDPOINT}`;
      const url = `${emailVerificationUrl}?token=${verificationToken.token}`;
      
      await sendEmail(
  "AI Saathi",
  verificationToken.email,
  "Activate your AI Saathi account",
  `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Activate Your AI Saathi Account</title>
      <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9f9f9; }
          .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background-color: #6a0dad; padding: 20px; text-align: center; }
          .logo { max-width: 180px; height: auto; }
          .content { padding: 30px; }
          .purple-section { background-color: #f5f0fd; padding: 25px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; padding: 12px 30px; background-color: #6a0dad; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .feature { display: flex; align-items: center; margin-bottom: 15px; }
          .feature-icon { font-size: 24px; margin-right: 15px; color: #6a0dad; }
          .footer { background-color: #3d0066; color: white; padding: 20px; text-align: center; font-size: 14px; }
          h1 { color: #6a0dad; margin-top: 0; }
          h2 { color: #4b0082; }
          .text-center { text-align: center; }
          .button-text {color: #ffffff ;}
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <img src="https://yourdomain.com/logo.png" alt="AI Saathi Logo" class="logo">
          </div>
          
          <div class="content">
              <h1 class="text-center">Activate Your AI Saathi Account</h1>
              
              <p>Hello there!</p>
              
              <p>Thank you for joining AI Saathi - Your AI Assistant! We're excited to help you build powerful CVs, guide your career path, prepare for interviews, and master English.</p>
              
              <div class="purple-section">
                  <p class="text-center">To get started, please verify your email address by clicking the button below:</p>
                  
                  <p class="text-center button-text">
                     <a href="${url}" 
   style="display:inline-block; padding:12px 30px; background-color:#6a0dad; 
          color:#ffffff !important; text-decoration:none !important; border-radius:5px; 
          font-weight:bold; margin:20px 0;">
   Activate Account
</a>
                  </p>
                  
                  <p class="text-center">Or copy and paste this link in your browser:<br>
                  <a href="${url}">${url}</a></p>
              </div>
              
              <h2>Why Choose AI Saathi?</h2>
              
              <div class="feature">
                  <div class="feature-icon">📄</div>
                  <div>
                      <strong>Beautiful Templates</strong>
                      <p>Professionally designed templates to make your resume stand out.</p>
                  </div>
              </div>
              
              <div class="feature">
                  <div class="feature-icon">🔒</div>
                  <div>
                      <strong>Secure & Private</strong>
                      <p>Your data is protected with top-tier encryption and privacy measures.</p>
                  </div>
              </div>
              
              <div class="feature">
                  <div class="feature-icon">⚡</div>
                  <div>
                      <strong>Lightning Fast</strong>
                      <p>Create and download your resume in minutes with our streamlined process.</p>
                  </div>
              </div>
              
          </div>
          
          <div class="footer">
              <p>Query and Support<br>Email: Contact@Aisaathi.com</p>
              <p>AI Saathi © All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`
);
      
      return { success: "Email sent for email verification!" };
    }
  }

  try {
    // Don't include redirectTo in signIn call
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false // Important: disable automatic redirect
    });

    if (result?.error) {
      return { error: "Invalid credentials!" };
    }

    return { success: "Logged in successfully!", redirectTo: DEFAULT_LOGIN_REDIRECT };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    return { error: "An unexpected error occurred." };
  }
}

