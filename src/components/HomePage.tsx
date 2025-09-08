// "use client";
// import React, { useState } from "react";
// import InterviewPrepPricing from "./languify/pricing";
// import FirstPage from "@/app/(protected)/dashboard/user/FirstPage/page";

// const HomePage = () => {
//   const [activeTab, setActiveTab] = useState<"interview" | "resume">("interview");

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <div
//         style={{
//           background: "#2a003f",
//           color: "white",
//           width: 240,
//           height: "100vh",
//           padding: "32px 24px",
//           fontFamily: "sans-serif",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Logo */}
//         {/* <div
//           style={{
//             fontWeight: 700,
//             fontSize: 18,
//             marginBottom: 30,
//             letterSpacing: 1,
//           }}
//         >
//           My App
//         </div> */}

//         {/* Interview Prep Button */}
//         <button
//           onClick={() => setActiveTab("interview")}
//           style={{
//             width: "100%",
//             padding: "12px 16px",
//             background:
//               activeTab === "interview"
//                 ? "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)"
//                 : "linear-gradient(135deg, #9333EA 0%, #6D28D9 100%)",
//             border: "none",
//             borderRadius: "12px",
//             color: "white",
//             fontSize: 14,
//             fontWeight: 600,
//             cursor: "pointer",
//             marginBottom: 16,
//           }}
//         >
//           🎯 Interview Prep
//         </button>

//         {/* Resume Builder Button */}
//         <button
//           onClick={() => setActiveTab("resume")}
//           style={{
//             width: "100%",
//             padding: "12px 16px",
//             background:
//               activeTab === "resume"
//                 ? "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)"
//                 : "linear-gradient(135deg, #9333EA 0%, #6D28D9 100%)",
//             border: "none",
//             borderRadius: "12px",
//             color: "white",
//             fontSize: 14,
//             fontWeight: 600,
//             cursor: "pointer",
//           }}
//         >
//           📄 Resume Builder
//         </button>
//       </div>

//       {/* Main Content */}
//       <div style={{ flex: 1, background: "#f3e8ff", overflowY: "auto" }}>
//         {activeTab === "interview" ? (
//           <InterviewPrepPricing />
//         ) : (
//           <FirstPage />
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;



"use client";
import React, { useState } from "react";
import InterviewPrepPricing from "./languify/pricing";
import FirstPage from "@/app/(protected)/dashboard/user/FirstPage/page";
import { Menu, X, Target, FileText } from "lucide-react";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<"interview" | "resume">("interview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-lg shadow-lg p-2 hover:bg-gray-50 transition-colors"
      >
        {sidebarOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 lg:w-60
          bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        {/* <div className="p-6 lg:p-8 border-b border-purple-700/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">✨</span>
            </div>
          
          </div>
        </div> */}

        {/* Navigation */}
        <nav className="flex-1  lg:p-3 space-y-4">
          <button
            onClick={() => {
              setActiveTab("interview");
              setSidebarOpen(false);
            }}
            className={`
              w-full group relative overflow-hidden
              px-6 py-4 rounded-xl
              transition-all duration-300
              flex items-center space-x-4
              ${
                activeTab === "interview"
                  ? "bg-white/20 backdrop-blur-sm shadow-lg scale-105"
                  : "hover:bg-white/10 hover:scale-102"
              }
            `}
          >
            <div className={`
               rounded-lg transition-colors
              ${activeTab === "interview" ? "bg-purple-400" : "bg-purple-600"}
            `}>
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-white font-semibold text-base">Interview Prep</h3>
            </div>
            
          </button>

          <button
            onClick={() => {
              setActiveTab("resume");
              setSidebarOpen(false);
            }}
            className={`
              w-full group relative overflow-hidden
              px-6 py-4 rounded-xl
              transition-all duration-300
              flex items-center space-x-4
              ${
                activeTab === "resume"
                  ? "bg-white/20 backdrop-blur-sm shadow-lg scale-105"
                  : "hover:bg-white/10 hover:scale-102"
              }
            `}
          >
            <div className={`
               rounded-lg transition-colors
              ${activeTab === "resume" ? "bg-purple-400" : "bg-purple-600"}
            `}>
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-white font-semibold">Resume Builder</h3>
              {/* <p className="text-purple-200 text-sm">Create & customize</p> */}
            </div>
           
          </button>
        </nav>

        {/* Footer */}
        <div className="p-6 lg:p-8 border-t border-purple-700/30">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-purple-200 text-sm">All systems online</span>
            </div>
            <p className="text-purple-300 text-xs">Ready to build your career</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 transition-all duration-300">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/50">
          {/* Content Header - Mobile */}
          {/* <div className="lg:hidden pt-16 pb-4 px-4">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {activeTab === "interview" ? "🎯 Interview Preparation" : "📄 Resume Builder"}
              </h2>
              <p className="text-gray-600 text-sm">
                {activeTab === "interview" 
                  ? "Prepare for your dream job interviews" 
                  : "Create professional resumes that stand out"
                }
              </p>
            </div>
          </div> */}

          {/* Tab Content */}
          <div className="relative">
            <div className={`transition-all duration-500 ${activeTab === "interview" ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}>
              {activeTab === "interview" && <InterviewPrepPricing />}
            </div>
            <div className={`transition-all duration-500 ${activeTab === "resume" ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"}`}>
              {activeTab === "resume" && <FirstPage />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;