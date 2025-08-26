'use client';

import { useState } from 'react';

export default function TemplatesPreview() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const templateCategories = [
    { id: 'all', name: 'All Templates' },
    { id: 'professional', name: 'Professional' },
    { id: 'modern', name: 'Modern' },
    { id: 'creative', name: 'Creative' },
    { id: 'minimalist', name: 'Minimalist' },
  ];

  const templates = [
    {
      id: 1,
      name: 'Executive Pro',
      category: 'professional',
      description: 'Elegant design for experienced professionals and executives',
      preview: '/api/placeholder/300/380',
      popular: true
    },
    {
      id: 2,
      name: 'Modern Edge',
      category: 'modern',
      description: 'Contemporary design with clean lines and subtle colors',
      preview: '/api/placeholder/300/380',
      popular: false
    },
    {
      id: 3,
      name: 'Creative Portfolio',
      category: 'creative',
      description: 'For designers, artists, and creative professionals',
      preview: '/api/placeholder/300/380',
      popular: true
    },
    {
      id: 4,
      name: 'Minimalist',
      category: 'minimalist',
      description: 'Clean, simple, and focused on content',
      preview: '/api/placeholder/300/380',
      popular: false
    },
    {
      id: 5,
      name: 'Corporate Classic',
      category: 'professional',
      description: 'Timeless design for corporate environments',
      preview: '/api/placeholder/300/380',
      popular: false
    },
    {
      id: 6,
      name: 'Tech Specialist',
      category: 'modern',
      description: 'Designed for IT professionals and developers',
      preview: '/api/placeholder/300/380',
      popular: true
    },
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of ATS-friendly templates designed to help you land your dream job
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {templateCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden">
                  <div className="w-4/5 h-36 bg-white shadow-lg rounded-sm flex items-center justify-center text-gray-400">
                    📄 Resume Preview
                  </div>
                </div>
                {template.popular && (
                  <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    POPULAR
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-5">{template.description}</p>
                <button className="w-full bg-blue-900 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg">
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-blue-100 rounded-2xl p-10 text-black shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to create your resume?</h3>
          <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have landed their dream jobs with professionally designed resumes from AiSaathi
          </p>
          <button className="bg-blue-900 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md transform hover:scale-105">
            Generate Your Resume Now
          </button>
        </div>
      </div>
    </section>
  );
}