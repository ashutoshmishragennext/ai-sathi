'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-500 mb-4">
            <span
              className={`text-purple-900 inline-block ${
                isVisible ? 'animate-pulse-slow' : ''
              }`}
            >
              AI Saathi -
            </span>
            <span className="text-purple-600">Your AI Assistant</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            From building powerful CVs to guiding your career path, preparing
            for interviews, and mastering English—your trusted AI Assistant is
            here to support every step of your growth journey.
          </p>

          {/* Unified Call-to-Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/resumebuilder"
              className="text-sm px-6 py-3 rounded-md bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-700 hover:to-purple-900 hover:scale-105 hover:shadow-md transition-all duration-200 text-center"
            >
              CV let&apos;s build from here 
            </Link>

            {/* <Link
              href="/features"
              className="text-sm px-6 py-3 rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 hover:scale-105 hover:shadow-md transition-all duration-200 text-center"
            >
              Explore Templates
            </Link> */}

            <Link
              href="/interview-prep"
              className="text-sm px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 hover:scale-105 hover:shadow-md transition-all duration-200 text-center"
            >
              Mock Interview start from here
            </Link>
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
