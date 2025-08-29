/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { UploadDocumentDialog } from '@/components/new/UploadDocumentDialog';
// import DocumentTypeForm from '@/components/MetadataCreation';
// import UploadDocumentDialog from '@/components/new/UploadDocumentDialog';
// import { StudentFolderDialog } from '@/components/students/DetailsInput';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { UserManagement } from '@/components/UserManagement';
import { useCurrentUser } from '@/hooks/auth';
import {
  ChevronLeft,
  ChevronRight,
  Database,
  File,
  LogOut,
  Menu,
  Settings,
  Users
} from 'lucide-react';
// import UserManagement from '@/components/UserManagement';
// import NavbarNMC from '@/components/NavbarNMC';
// import AdminStorageDashboard from '@/components/insights/page';
// import { FolderManagement } from '@/components/new/FolderManagement';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isUploadDocumentOpen, setIsUploadDocumentOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const user = useCurrentUser();
  // console.log("user",user);
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState('user');

  const handleLogout = async () => {
    await signOut({ redirectTo: "/auth/login" });
  };

     const [roles, setRoles] = useState<string[]>([]);
  
    //  useEffect(() => {
    //   const fetchUserData = async () => {
    //     try {
    //       const res = await fetch(/api/users?id=${user?.id});
    //       const data = await res.json();
    
    //       if (!Array.isArray(data) || data.length === 0) return;
    
    //       const userData = data[0]; // ✅ Get first user from array
    
    //       const defaultRole = userData?.role ? [userData.role] : [];
    //       const otherRoles = Array.isArray(userData?.otherRoles) ? userData.otherRoles : [];
    
    //       // Optionally remove duplicates
    //       const uniqueRoles = Array.from(new Set([...defaultRole, ...otherRoles]));
    
    //       setRoles(uniqueRoles);
    //     } catch (error) {
    //       console.error("Failed to fetch user data:", error);
    //     }
    //   };
    
    //   fetchUserData();
    // }, []);
  
    //  const handleRoleClick = (role: string) => {
    //   router.push(/dashboard/${role.toLowerCase()}); // e.g., /dashboard/eits_admin
    // };
  if (status === 'loading') {
    return <div className="h-screen flex justify-center items-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (!session) {
    return null;
  }

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Navigation items for bottom tabs (mobile) and sidebar (desktop)
  const navItems = [
    { id: 'user', label: 'User', icon: <Users className="h-5 w-5" /> },
    { id: 'create schema', label: 'Create', icon: <File className="h-5 w-5" /> },
    { id: 'storage', label: 'Storage', icon: <Database className="h-5 w-5" /> },
  ];

  // Render the appropriate component based on selection
  const renderMainContent = () => {
    switch (activeComponent) {
      case 'user':
        return "User";
      // case 'create schema':
      //   return <DocumentTypeForm/>;
      // case 'storage':
      //   return <AdminStorageDashboard/>;
      // case 'activity':
      //   return (
      //     <div className="p-4">
      //       <h1 className="text-xl md:text-2xl font-bold mb-6">Recent Activity</h1>
      //       <div className="border rounded-lg p-6 bg-white shadow-sm">
      //         <h2 className="text-lg font-semibold mb-4">Activity Log</h2>
      //         {/* Activity logs and timeline */}
      //       </div>
      //     </div>
      //   );
      // default:
      //   return (
      //     <div className="text-center p-8 text-gray-500">
      //       Select an option from the tabs
      //     </div>
      //   );
    }
  };

  return (
  <div className="min-h-screen bg-gray-50">
    {/* Top Navigation */}
    {/* <NavbarNMC roles={roles}/> */}
    
    <div className="flex">
      {/* Desktop Sidebar */}
      <div 
        className={`hidden md:flex ${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r transition-all duration-300 ease-in-out h-[calc(100vh-64px)] flex-col justify-between`}
      >
        <div>
          <div className="flex justify-end p-2">
            <button 
              onClick={toggleSidebar} 
              className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
          <ul className="space-y-2 px-3 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveComponent(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeComponent === item.id
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto pb-20 md:pb-6">
        <div className="px-2 md:px-4">
          {renderMainContent()}
        </div>
      </div>
    </div>

    {/* Mobile Bottom Navigation - Instagram Style */}
    {/* 
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveComponent(item.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors min-w-0 flex-1 ${
              activeComponent === item.id
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}
          >
            <div className={`${activeComponent === item.id ? 'scale-110' : 'scale-100'} transition-transform`}>
              {item.icon}
            </div>
            <span className={`text-xs mt-1 font-medium ${
              activeComponent === item.id ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
    */}

    {/* Dialogs */}
    {/* {isCreateFolderOpen && organizationId && (
      <StudentFolderDialog
        open={isCreateFolderOpen}
        onOpenChange={setIsCreateFolderOpen}
        organizationId={organizationId}
        parentFolderId={selectedFolderId || undefined}
        onSuccess={(folderData) => {
          // Here you would typically refresh the folder list
          console.log('Student folder created:', folderData);
          
          // For a real app, you'd want to update your folder state or refetch the folder list
          // For example:
          // refetchFolders();
          // OR
          // setFolders(prev => [...prev, folderData]);
          
          // You might also want to select the newly created folder
          setSelectedFolderId(folderData.id);
        }}
      />
    )} */}

    {/* {isUploadDocumentOpen && organizationId && (
      <UploadDocumentDialog
        open={isUploadDocumentOpen}
        onOpenChange={setIsUploadDocumentOpen}
        organizationId={organizationId}
        studentId={studentId || ''}
        folderId={selectedFolderId || ''}
        onSuccess={() => {
          // Refetch documents
        }}
      />
    )} */}
  </div>
);
}