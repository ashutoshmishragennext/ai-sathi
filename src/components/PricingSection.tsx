'use client';

import { useState } from 'react';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: billingCycle === 'yearly' ? '0' : '0',
      description: 'Perfect for getting started',
      features: [
        '1 Resume',
        'Basic Templates',
        'PDF Export',
        'Email Support',
      ],
      cta: 'Get Started Free',
      popular: false,
    },
    {
      name: 'Pro',
      price: billingCycle === 'yearly' ? '179' : '199',
      description: 'For professionals seeking more',
      features: [
        'Unlimited Resumes',
        'Premium Templates',
        'AI Optimization',
        'Multiple Formats (PDF, Word)',
        'Priority Support',
      ],
      cta: 'Start Pro Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'yearly' ? '269' : '299',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team Collaboration',
        'Custom Branding',
        'API Access',
        'Dedicated Support',
      ],
      cta: 'Start Enterprise Trial',
      popular: false,
    },
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Choose the plan that best fits your needs
          </p>

          {/* Billing Toggle */}
          <div className="mt-4 flex justify-center items-center">
            <span
              className={`mr-2 text-xs font-medium ${
                billingCycle === 'monthly' ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              Monthly
            </span>
            <button
              className="relative rounded-full w-8 h-4 transition duration-200 ease-linear"
              onClick={() =>
                setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')
              }
            >
              <div
                className={`relative rounded-full w-8 h-4 transition duration-200 ease-linear ${
                  billingCycle === 'yearly' ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-transform duration-200 ease-linear transform ${
                    billingCycle === 'yearly' ? 'translate-x-4' : ''
                  }`}
                ></div>
              </div>
            </button>
            <span
              className={`ml-2 text-xs font-medium ${
                billingCycle === 'yearly' ? 'text-gray-800' : 'text-gray-500'
              }`}
            >
              Yearly{' '}
              <span className="text-xs text-purple-600 bg-purple-100 px-1 py-0.5 rounded-full">
                Save 10%
              </span>
            </span>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm bg-white flex flex-col"
                style={{ height: '420px' }} // Fixed height for all cards
              >
                <div className="pt-6 pb-3 px-4 bg-white">
                  {plan.popular && (
                    <div className="mb-2 bg-purple-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full inline-block">
                      POPULAR
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-base font-bold text-gray-800">
                      {plan.name}
                    </h3>
                    <div className="mt-2 flex items-baseline justify-center">
                      <span className="text-xl font-extrabold text-gray-800">
                        ₹{plan.price}
                      </span>
                      <span className="ml-1 text-xs font-medium text-gray-500">
                        /month
                      </span>
                    </div>
                  
                    {billingCycle === 'yearly' && (
                      <p className="mt-1 text-xs text-gray-500">
                        billed annually
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-600">
                      {plan.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 flex-grow overflow-y-auto"> {/* Scrollable content area */}
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg
                          className="h-3 w-3 text-purple-500 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-xs text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 pt-0"> {/* Button container at bottom */}
                  <button
                    className={`w-full py-1.5 px-3 rounded-md font-medium text-xs transition-all duration-200 ${
                      plan.popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}