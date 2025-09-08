// 'use client';
// import { useCurrentUser } from '@/hooks/auth';
// import Link from 'next/link';
// import { useState } from 'react';
// import { useSession, signOut } from 'next-auth/react';
// import { LogOut, Settings, User } from 'lucide-react';


// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const user = useCurrentUser()
//     const { data: session, status } = useSession();
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
// const handleSignOut = async () => {
//     await signOut({ callbackUrl: '/' });
//   };
//   const navLinks = [
//     { name: 'Home', href: '/' },
//     { name: 'Features', href: '/features' },
//     { name: 'How It Works', href: '/how-it-works' },
//     { name: 'Pricing', href: '/pricing' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   return (
//     <nav className="bg-white shadow-xl border-b border-purple-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center">
//               <img 
//                 src="/logo.png" 
//                 alt="AI Saathi Logo" 
//                 className="h-10 w-auto" 
//               />
//                              <h1 
//   className="text-lg font-bold" 
//   style={{ color: "rgb(124, 58, 237)" }}
// >
//   AI Saathi
// </h1>


//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex flex-1 justify-center items-center">
//             <div className="flex space-x-6">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200"
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Buttons */}
//           {/* { user ?
//           <div>
//             {user?.name}
//             </div> :
//             <div className="hidden md:flex items-center space-x-4">
//             <Link
//               href="/auth/login"
//               className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 hover:scale-105 hover:shadow-md transition-all duration-200"
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/auth/register"
//               className="text-sm px-4 py-2 rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 hover:scale-105 hover:shadow-md transition-all duration-200"
//             >
//               Get Started
//             </Link>
//           </div>
//           } */}

//             <div className="hidden md:flex items-center space-x-4">
//             {status === 'loading' ? (
//               <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
//             ) : session ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center space-x-2 text-sm text-gray-700 hover:text-purple-600 focus:outline-none"
//                 >
//                   {session.user?.image ? (
//                     <img
//                       src={session.user.image}
//                       alt="Profile"
//                       className="h-8 w-8 rounded-full border-2 border-purple-200"
//                     />
//                   ) : (
//                     <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
//                       <User className="h-4 w-4 text-purple-600" />
//                     </div>
//                   )}
//                   <span className="font-medium">{session.user?.name}</span>
//                   <svg
//                     className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
//                     <Link
//                       href="/profile"
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
//                       onClick={() => setIsProfileOpen(false)}
//                     >
//                       <Settings className="h-4 w-4 mr-2" />
//                       Profile Settings
//                     </Link>
//                     <button
//                       onClick={handleSignOut}
//                       className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
//                     >
//                       <LogOut className="h-4 w-4 mr-2" />
//                       Sign Out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 href="/auth/login"
//                 className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 hover:scale-105 hover:shadow-md transition-all duration-200"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>
        

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-600 hover:text-purple-600 focus:outline-none"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-purple-100">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="block px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <div className="px-3 py-2 space-y-2">
//               <Link
//                 href="/auth/login"
//                 className="block text-sm px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 hover:scale-105 hover:shadow-md text-center transition-all duration-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Sign In
//               </Link>
//               <Link
//                 href="/auth/register"
//                 className="block text-sm px-4 py-2 rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 hover:scale-105 hover:shadow-md text-center transition-all duration-200"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Get Started
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


'use client';
import { useCurrentUser } from '@/hooks/auth';
import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, Settings, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useCurrentUser();
  const { data: session, status } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-xl border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="AI Saathi Logo" 
                className="h-10 w-auto" 
              />
              <h1 
                className="text-lg font-bold ml-2" 
                style={{ color: "rgb(124, 58, 237)" }}
              >
                AI Saathi
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - Auth dependent content */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-purple-600 focus:outline-none"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="h-8 w-8 rounded-full border-2 border-purple-200"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                  )}
                  <span className="font-medium">{session.user?.name}</span>
                  <svg
                    className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <Link
                      href="/dashboard/user"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
Dashboard                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 hover:scale-105 hover:shadow-md transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm px-4 py-2 rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 hover:scale-105 hover:shadow-md transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden sm:hidden lg:flex">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:hidden md:flex lg:flex bg-white border-t border-purple-100">
            {/* {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))} */}
            
            {session ? (
              // Mobile authenticated menu
              <>
                <div className="flex items-center px-3 py-2 border-b border-purple-100 mb-2">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-purple-200"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="font-medium text-gray-800">{session.user?.name}</p>
                    <p className="text-sm text-gray-500">{session.user?.email}</p>
                  </div>
                </div>
                
                <Link
                  href="/dashboard/user"
                  className="block px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // Mobile unauthenticated menu
              <div className="px-3 py-2 space-y-2">
                <Link
                  href="/auth/login"
                  className="block text-sm px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 text-center transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="block text-sm px-4 py-2 rounded-md border border-purple-600 text-purple-600 hover:bg-purple-50 text-center transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop for desktop dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </nav>
  );
}