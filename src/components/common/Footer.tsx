"use client";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-2 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">AI Saathi</h3>
            <p className="text-gray-400 text-sm max-w-md">
              At AI Saathi, we’re redefining career support with AI-powered Assistant built for your success. Our Career GPS helps you navigate the right path, the CV Generator creates job-winning resumes, and Mock Interview Preparation builds your confidence for the big day.
              <br /><br />
              With English learning and personalized career guidance, AI Saathi is more than an assistant—it’s your partner in growth.
            </p>
          </div>
          
          {/* Query and Support */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Query and Support</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-400 text-sm">Email: Contact@Aisaathi.com</span></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            AI Saathi © All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;