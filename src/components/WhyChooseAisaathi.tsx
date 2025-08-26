'use client';

import { useState, useEffect } from 'react';

export default function WhyChooseAiSaathi() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      name: 'Beautiful Templates',
      description: 'Professionally designed templates to make your resume stand out.',
      icon: '📄',
      gradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      color: '#86cff0'
    },
    {
      name: 'Secure & Private',
      description: 'Your data is protected with top-tier encryption and privacy measures.',
      icon: '🔒',
      gradient: 'linear-gradient(135deg, #fae8ff 0%, #f3e8ff 100%)',
      color: '#a855f7'
    },
    {
      name: '24/7 Support',
      description: 'Round-the-clock assistance to help you craft the perfect resume.',
      icon: '🛟',
      gradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      color: '#10b981'
    },
    {
      name: 'Lightning Fast',
      description: 'Create and download your resume in minutes with our streamlined process.',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      color: '#f59e0b'
    },
    {
      name: 'ATS-Friendly Templates',
      description: 'Templates optimized to pass applicant tracking systems with ease.',
      icon: '✅',
      gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      color: '#3b82f6'
    },
    {
      name: 'AI-Powered Optimization',
      description: 'Smart AI tailors your resume for maximum impact and relevance.',
      icon: '✨',
      gradient: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
      color: '#ec4899'
    },
  ];

  return (
    <section className="why-choose-section">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Why Choose <span className="gradient-text">AiSaathi</span>?
          </h2>
          <p className="section-subtitle">
            Experience the next generation of resume building with our powerful AI-driven platform
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`feature-card ${isVisible ? 'visible' : ''}`}
              style={{ 
                '--delay': `${index * 100}ms`,
                '--card-gradient': feature.gradient,
                '--card-color': feature.color
              } as React.CSSProperties}
            >
              <div className="feature-header">
                <span className="feature-icon">
                  {feature.icon}
                </span>
                <h3 className="feature-title">
                  {feature.name}
                </h3>
              </div>
              <p className="feature-description">{feature.description}</p>
              
              {/* Subtle hover effect line */}
              <div className="hover-line"></div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .why-choose-section {
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          padding: 2rem 1rem;
        }
        
        @media (min-width: 768px) {
          .why-choose-section {
            padding: 4rem 1rem;
          }
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
        }
        
        @media (min-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6 0%, #4f46e5 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .section-subtitle {
          font-size: 1.125rem;
          color: #4b5563;
          max-width: 48rem;
          margin: 0 auto;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .feature-card {
          background: var(--card-gradient);
          padding: 1.75rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.5);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
          position: relative;
          overflow: hidden;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-color);
          opacity: 0.7;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .feature-card.visible {
          opacity: 1;
          transform: translateY(0);
          animation-name: fadeInUp;
          animation-duration: 0.6s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          animation-delay: var(--delay);
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.07);
          border-color: rgba(255, 255, 255, 0.8);
        }
        
        .feature-card:hover::before {
          transform: scaleX(1);
        }
        
        .feature-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        
        .feature-icon {
          font-size: 1.875rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.8);
          color: var(--card-color);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(4px);
        }
        
        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          margin-left: 1rem;
        }
        
        .feature-description {
          color: #4b5563;
          line-height: 1.6;
        }
        
        .hover-line {
          width: 0;
          height: 2px;
          background: var(--card-color);
          margin-top: 1rem;
          transition: width 0.3s ease;
          opacity: 0.7;
        }
        
        .feature-card:hover .hover-line {
          width: 100%;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}