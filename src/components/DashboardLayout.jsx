// import React, { useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { 
//   BarChart3, Users, MessageSquare, Settings, 
//   Menu, X, LogOut, User, Bell, Search,
//   Home, ChevronDown 
// } from 'lucide-react';

// const DashboardLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout, isAdmin } = useAuth();

//   const navigation = [
//     { name: 'Overview', href: '/admin/dashboard', icon: BarChart3 },
//     { name: 'Testimonies', href: '/admin/testimonies', icon: MessageSquare },
//     { name: 'Users', href: '/admin/users', icon: Users },
//     { name: 'Settings', href: '/admin/settings', icon: Settings },
//   ];

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   const isCurrentPath = (path) => {
//     return location.pathname === path;
//   };

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
//           <p className="text-gray-600 mb-6">You need admin privileges to access this area.</p>
//           <Link 
//             to="/" 
//             className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-medium transition-colors"
//           >
//             Go to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Mobile sidebar backdrop */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-gray-600 bg-opacity-75 lg:hidden z-40"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
//         sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
//         <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200">
//           <Link to="/" className="flex items-center">
//             <h1 className="text-xl font-light text-gray-900 tracking-wider">
//               <span className="font-bold">They</span>ThatTestify
//             </h1>
//           </Link>
//           <button
//             className="lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X className="h-6 w-6 text-gray-400" />
//           </button>
//         </div>

//         <nav className="mt-8 px-4 space-y-2">
//           {navigation.map((item) => {
//             const Icon = item.icon;
//             const current = isCurrentPath(item.href);
            
//             return (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
//                   current
//                     ? 'bg-amber-50 text-amber-700 border-r-2 border-amber-600'
//                     : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                 }`}
//                 onClick={() => setSidebarOpen(false)}
//               >
//                 <Icon 
//                   className={`mr-3 h-5 w-5 transition-colors ${
//                     current ? 'text-amber-600' : 'text-gray-400 group-hover:text-gray-600'
//                   }`} 
//                 />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Admin Badge */}
//         <div className="absolute bottom-4 left-4 right-4">
//           <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-lg text-center">
//             <p className="text-sm font-medium">Admin Panel</p>
//           </div>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="lg:pl-64 flex flex-col min-h-screen">
//         {/* Top header */}
//         <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
//           <div className="flex items-center justify-between h-16 px-6">
//             <div className="flex items-center">
//               <button
//                 className="lg:hidden mr-4"
//                 onClick={() => setSidebarOpen(true)}
//               >
//                 <Menu className="h-6 w-6 text-gray-400" />
//               </button>
              
//               {/* Breadcrumb */}
//               <nav className="flex items-center space-x-2 text-sm">
//                 <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
//                   <Home className="h-4 w-4" />
//                 </Link>
//                 <span className="text-gray-300">/</span>
//                 <span className="text-gray-500">Admin</span>
//                 <span className="text-gray-300">/</span>
//                 <span className="text-gray-900 font-medium capitalize">
//                   {location.pathname.split('/').pop()}
//                 </span>
//               </nav>
//             </div>

//             <div className="flex items-center space-x-4">
//               {/* Search */}
//               <div className="hidden md:block">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Search className="h-4 w-4 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Notifications */}
//               <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
//                 <Bell className="h-5 w-5" />
//                 <span className="absolute top-1 right-1 block h-2 w-2 bg-red-400 rounded-full"></span>
//               </button>

//               {/* Profile Dropdown */}
//               <div className="relative">
//                 <button
//                   onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                   className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
//                     {user?.profilePicture ? (
//                       <img 
//                         src={user.profilePicture} 
//                         alt={user.firstName}
//                         className="w-8 h-8 rounded-full object-cover"
//                       />
//                     ) : (
//                       <User className="h-4 w-4 text-amber-600" />
//                     )}
//                   </div>
//                   <div className="hidden md:block text-left">
//                     <p className="text-sm font-medium text-gray-900">
//                       {user?.firstName} {user?.lastName}
//                     </p>
//                     <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
//                   </div>
//                   <ChevronDown className="h-4 w-4 text-gray-400" />
//                 </button>

//                 {/* Dropdown Menu */}
//                 {profileDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
//                     <div className="px-4 py-2 border-b border-gray-100">
//                       <p className="text-sm font-medium text-gray-900">
//                         {user?.firstName} {user?.lastName}
//                       </p>
//                       <p className="text-sm text-gray-500">{user?.email}</p>
//                     </div>
                    
//                     <Link
//                       to="/profile"
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                       onClick={() => setProfileDropdownOpen(false)}
//                     >
//                       <User className="h-4 w-4 mr-2" />
//                       View Profile
//                     </Link>
                    
//                     <Link
//                       to="/"
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                       onClick={() => setProfileDropdownOpen(false)}
//                     >
//                       <Home className="h-4 w-4 mr-2" />
//                       Back to Site
//                     </Link>
                    
//                     <div className="border-t border-gray-100">
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
//                       >
//                         <LogOut className="h-4 w-4 mr-2" />
//                         Sign Out
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="flex-1 p-6">
//           {children}
//         </main>

//         {/* Footer */}
//         <footer className="bg-white border-t border-gray-200 py-4 px-6">
//           <div className="flex items-center justify-between">
//             <p className="text-sm text-gray-500">
//               © 2025 TheyThatTestify. All rights reserved.
//             </p>
//             <div className="flex items-center space-x-4 text-sm text-gray-500">
//               <span>v1.0.0</span>
//               <span>•</span>
//               <span>Admin Dashboard</span>
//             </div>
//           </div>
//         </footer>
//       </div>

//       {/* Click outside handler for dropdown */}
//       {profileDropdownOpen && (
//         <div 
//           className="fixed inset-0 z-40"
//           onClick={() => setProfileDropdownOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default DashboardLayout;


import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, Users, MessageSquare, Settings, 
  Menu, X, LogOut, User, Bell, Search,
  Home, ChevronDown 
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();

  const navigation = [
    { name: 'Overview', href: '/admin/dashboard', icon: BarChart3 },
    { name: 'Testimonies', href: '/admin/testimonies', icon: MessageSquare },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need admin privileges to access this area.</p>
          <Link 
            to="/" 
            className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed positioning */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex-shrink-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-xl font-light text-gray-900 tracking-wider">
                <span className="font-bold">They</span>ThatTestify
              </h1>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* Navigation - Scrollable */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              const current = isCurrentPath(item.href);
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    current
                      ? 'bg-amber-50 text-amber-700 border-r-4 border-amber-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon 
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                      current ? 'text-amber-600' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Admin Badge - Fixed at bottom */}
          <div className="px-4 pb-4 flex-shrink-0">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-3 rounded-lg text-center">
              <p className="text-sm font-medium">Admin Panel</p>
              <p className="text-xs opacity-80">Secure Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                className="lg:hidden mr-4"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6 text-gray-400" />
              </button>
              
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm">
                <Link to="/" className="text-gray-500 hover:text-gray-700 transition-colors">
                  <Home className="h-4 w-4" />
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-500">Admin</span>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 font-medium capitalize">
                  {location.pathname.split('/').pop()}
                </span>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 block h-2 w-2 bg-red-400 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    {user?.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.firstName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-4 w-4 text-amber-600" />
                    )}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Link>
                    
                    <Link
                      to="/"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Back to Site
                    </Link>
                    
                    <div className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              © 2025 TheyThatTestify. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>v1.0.0</span>
              <span>•</span>
              <span>Admin Dashboard</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Click outside handler for dropdown */}
      {profileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;