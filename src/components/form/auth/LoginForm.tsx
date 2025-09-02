"use client";

import { loginUser } from "@/actions/loginUser";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/validaton-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [error, setError] = useState<string | undefined>(undefined);
  const [isRedirecting, setIsRedirecting] = useState<boolean | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    if (isPending || isRedirecting) return;

    setError(undefined);
    setSuccess(undefined);

    try {
      startTransition(async () => {
        const result = await loginUser(data);
        
        if (result?.error) {
          setError(result.error);
          return;
        }

        if (result?.success) {
          setSuccess(result.success);
          
          if (result.redirectTo) {
            setIsRedirecting(true);
            // Small delay to show success message
            await new Promise(resolve => setTimeout(resolve, 500));
            window.location.href = result.redirectTo;
          }
        }
      });
    } catch (e) {
      console.error("Login error:", e);
      setError("Authentication failed. Please try again.");
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setError(undefined);
      await signIn("google", {
        callbackUrl: "/dashboard", // Adjust this to your desired redirect
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <Card className="w-full max-w-md overflow-hidden border-0 shadow-xl">
        <div className="h-2 bg-gradient-to-r from-dark-blue to-custom-purple"></div>
        
        {/* Logo Section */}
        <CardHeader className="pt-8 pb-2 flex flex-col items-center space-y-2">
          {/* Your logo here if needed */}
        </CardHeader>

        {/* Login Header */}
        <div className="text-center px-8">
          <h1 className="text-2xl font-bold text-dark-blue">Welcome Back</h1>
          <p className="mt-2 text-sm text-custom-slate">Please login to your account</p>
        </div>

        {/* Login Form */}
        <CardContent className="pt-6 px-8 pb-8">
          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isPending}
            className="w-full h-12 border border-custom-slate/30 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-200 mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isGoogleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-custom-slate/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-custom-slate">Or continue with email</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="text-sm font-medium text-custom-slate">Email</div>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-slate h-5 w-5 group-hover:text-dark-blue transition-colors duration-200" />
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the Email"
                          className="h-12 pl-10 rounded-lg border-custom-slate/30 focus:border-dark-blue focus:ring-1 focus:ring-dark-blue transition-all duration-200"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="text-sm font-medium text-custom-slate">Password</div>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-custom-slate h-5 w-5 group-hover:text-dark-blue transition-colors duration-200" />
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          className="h-12 pl-10 pr-10 rounded-lg border-custom-slate/30 focus:border-dark-blue focus:ring-1 focus:ring-dark-blue transition-all duration-200"
                          type={showPassword ? "text" : "password"}
                          disabled={isPending}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-custom-slate hover:text-dark-blue transition-colors duration-200"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-custom-slate/30 text-dark-blue focus:ring-dark-blue h-4 w-4"
                  />
                  <span className="ml-2 text-sm text-custom-slate">Remember me</span>
                </label>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="px-0 text-sm text-custom-purple hover:text-dark-blue"
                >
                  <Link href="/auth/forgot-password">Forgot password?</Link>
                </Button>
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <button
                type="submit"
                disabled={isPending}
                className="w-full h-12 bg-gradient-to-r from-dark-blue to-custom-purple hover:from-custom-purple hover:to-dark-blue text-white rounded-lg font-medium transition-all duration-500 transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center mt-6">
                <Link 
                  href="/auth/register" 
                  className="text-sm font-medium text-custom-slate hover:text-dark-blue transition-colors"
                >
                  Don&apos;t have an account? {" "}
                  <span className="text-custom-purple hover:text-dark-blue font-medium underline-offset-4 hover:underline transition-all duration-200">
                    Register Instead
                  </span>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;