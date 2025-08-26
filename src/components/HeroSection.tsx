'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Your Perfect Resume with{' '}<br></br>
            <span className={`text-blue-600 inline-block ${isVisible ? 'animate-pulse-slow' : ''}`}>
              AiSaathi
            </span>
          </h1>
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build professional, ATS-friendly resumes in minutes with AI-powered
            customization and expert templates.
          </p>
          {/* Call-to-Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Link
              href="/get-started"
              className="text-sm px-6 py-3 rounded-md bg-gradient-to-r from-blue-700 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 hover:scale-105 hover:shadow-md transition-all duration-200"
            >
              Start Building Now
            </Link>
            <Link
              href="/features"
              className="text-sm px-6 py-3 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 hover:scale-105 hover:shadow-md transition-all duration-200"
            >
              Explore Templates
            </Link>
          </div>
        </div>
      </div>
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