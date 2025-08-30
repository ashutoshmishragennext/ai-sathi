import FirstPage from '@/components/firstpage'
import React from 'react'

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
    <div><FirstPage  /></div>
  )
}
