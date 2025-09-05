'use client';

import { useState, useEffect } from 'react';
import { Check, Users, Clock, Headphones, Trophy, UserCheck, BarChart3, ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Add this type declaration at the top of your file
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Custom hook to load the Razorpay script dynamically
const useRazorpay = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default function InterviewPrepPricing() {
  const [selectedPlan, setSelectedPlan] = useState<string>('Standard Plan');
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false); // New state to control the card display
  const { data: session, status } = useSession();
  const router = useRouter();
  const userEmail = session?.user?.email;

  useRazorpay();

  // useEffect to check user's validity and handle redirection
  useEffect(() => {
    const checkValidityAndRedirect = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await fetch('/api/payment/validity', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: session.user.email }),
          });

          const data = await response.json();
          
          if (data.isValid) {
            setHasAccess(true); // Set state to true if user has valid access
            setLoading(false); // Stop loading to render the component
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error('Failed to check user validity:', error);
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        setLoading(false);
      }
    };

    checkValidityAndRedirect();
  }, [status, session]); // Removed 'router' from dependency array

  // ... (rest of the component, handlePayment function remains the same)
  const plans = [
    {
      name: 'Basic Plan',
      duration: '1 Test Access',
      price: '50',
      originalPrice: '100',
      description: 'Perfect for quick interview preparation',
      features: [
        '1 Test Access',
        'Practice Interview Questions',
        'Email Support',
        'Basic Performance Tracking',
        'Mobile-Friendly Platform'
      ],
      icon: <Clock className="w-6 h-6" />,
      cta: 'Start Basic Plan',
      popular: false,
      savings: 'Save ₹50'
    },
    {
      name: 'Standard Plan',
      duration: '1 Months Access',
      price: '200',
      originalPrice: '750',
      description: 'Most popular choice for comprehensive prep',
      features: [
        'Everything in Basic Plan',
        '1 Months Access',
        'Mock Interviews with AI Feedback',
        'Advanced Question Bank (500+)',
        'Industry-Specific Practice',
        'Progress Analytics Dashboard'
      ],
      icon: <Users className="w-6 h-6" />,
      cta: 'Choose Standard',
      popular: true,
      savings: 'Save ₹550'
    },
    {
      name: 'Premium Plan',
      duration: '6 Months Access',
      price: '1000',
      originalPrice: '2000',
      description: 'Complete interview mastery package',
      features: [
        'Everything in Standard Plan',
        '6 Months Access',
        '1:1 Expert Interview Coaching (2 Sessions)',
        'Detailed Performance Reports',
        'Custom Interview Scenarios',
        'Resume Review & Optimization',
      ],
      icon: <Trophy className="w-6 h-6" />,
      cta: 'Go Premium',
      popular: false,
      savings: 'Save ₹1000'
    }
  ];

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handlePayment = async (planName: string, price: string) => {
    if (!userEmail || !session?.user?.id) {
      alert('Please log in to make a purchase.');
      return;
    }

    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(price),
          planName: planName,
          userEmail: userEmail,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create payment order.');
      }

      const { order } = data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Languify',
        description: `Purchase of ${planName}`,
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const [firstName, ...lastNameParts] = session.user?.name?.split(' ') || ['', ''];
            const lastName = lastNameParts.join(' ');

            const verificationResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userData: {
                  userId: session.user?.id,
                  name: session.user?.name,
                  firstName: firstName,
                  lastName: lastName,
                  email: userEmail,
                  planName: planName,
                },
              }),
            });

            const verificationData = await verificationResponse.json();

            if (verificationResponse.ok && verificationData.success) {
              alert('Payment successful and access granted!');
              router.push(verificationData.data.redirectUrl);
            } else {
              alert(`Payment verification failed: ${verificationData.error || 'Unknown error'}`);
            }
          } catch (error) {
            console.error('Error during payment verification:', error);
            alert('An error occurred during payment verification. Please contact support.');
          }
        },
        prefill: {
          name: session?.user?.name || '',
          email: userEmail, 
        },
        notes: {
          planName: planName,
          userEmail: userEmail,
        },
        theme: {
          color: '#8B5CF6',
        },
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        alert('Razorpay SDK not loaded. Please try again.');
      }
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      alert(error.message || 'Failed to initiate payment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-700">Checking your access status...</p>
      </div>
    );
  }

  // Conditional Rendering based on `hasAccess`
  if (hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border-t-4 border-purple-500">
          <Check className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You Already Have Access!</h2>
          <p className="text-gray-600 mb-6">
            It looks like your account already has a valid subscription. You can head straight to the platform and continue your interview preparation.
          </p>
          <button
  onClick={() => window.open('https://staging-interview.languify.in', '_blank')}
  className="w-full py-3 px-6 rounded-lg font-bold text-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center justify-center"
>
  Go to Preparation Dashboard <ArrowRight className="ml-2 w-5 h-5" />
</button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="pt-6 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Want to prepare yourself for interviews? 🚀
          </h1>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <UserCheck className="w-5 h-5 mr-2 text-green-500" />
              <span>10,000+ Students Prepared</span>
            </div>
            <div className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
              <span>85% Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.name;
            const isPopular = plan.popular;
            
            return (
              <div
                key={index}
                onClick={() => handlePlanSelection(plan.name)}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col h-full ${
                  isSelected
                    ? 'ring-4 ring-purple-500 ring-opacity-50 shadow-2xl bg-gradient-to-br from-white to-purple-50' 
                    : 'shadow-xl bg-white hover:shadow-2xl'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-gradient-to-r from-pink-300 to-blue-500 text-white text-center py-3 font-bold text-sm tracking-wide">
                      ✓ SELECTED
                    </div>
                  </div>
                )}

                <div className={`p-8 flex-1 flex flex-col ${ isSelected ? 'pt-16' : 'pt-5'}`}>
                  <div className="text-center mb-6">
                    <div className="mb-4">
                      <div className={`inline-flex p-3 rounded-full ${
                        isSelected
                          ? 'bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {plan.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {plan.description}
                    </p>
                    
                    <div className="mb-2">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-lg text-gray-500 line-through">
                          ₹{plan.originalPrice}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {plan.savings}
                        </span>
                      </div>
                      
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          ₹{plan.price}
                        </span>
                      </div>
                      
                      <p className="text-sm font-medium text-blue-600">
                        {plan.duration}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePayment(plan.name, plan.price);
                      }}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      {isSelected ? `Pay ${plan.cta} →` : `${plan.cta} →`}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Trusted by students from top colleges across India</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">IIT</div>
              <div className="text-sm text-gray-500">Delhi, Bombay, Madras</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">IIM</div>
              <div className="text-sm text-gray-500">Ahmedabad, Bangalore</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">BITS</div>
              <div className="text-sm text-gray-500">Pilani, Goa</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400">NIT</div>
              <div className="text-sm text-gray-500">Trichy, Warangal</div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you succeed.
          </p>
          <div className="flex items-center justify-center">
            <Headphones className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-blue-600 font-medium">support@languify.in</span>
          </div>
        </div>
      </div>
    </div>
  );
}