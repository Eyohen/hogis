import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'coinley-checkout/dist/style.css'

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import DashboardLayout from './components/DashboardLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminTestimonies from './pages/admin/Testimonies';
import AdminUsers from './pages/admin/Users';
import AdminSettings from './pages/admin/Settings';
import TestimonyDetail from './pages/TestimonyDetail';
import ShareTestimony from './pages/ShareTestimony';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-600'></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // if (!isAdmin) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};

// Redirect authenticated users from login pages
const RedirectIfAuthenticated = ({ children, adminPage = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    if (adminPage && isAdmin) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (!adminPage) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};


function App() {
  return (


    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/testimony/:id" element={<TestimonyDetail />} />
        <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        {/* User Authentication Routes */}
        {/* <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfAuthenticated>
              <Register />
            </RedirectIfAuthenticated>
          }
        /> */}


        <Route path="/share-testimony" element={
          <ProtectedRoute>
            <ShareTestimony />
          </ProtectedRoute>
        } />


        {/* Admin Authentication Route */}
        {/* <Route
          path="/admin/login"
          element={
            <RedirectIfAuthenticated adminPage={true}>
              <AdminLogin />
            </RedirectIfAuthenticated>
          }
        /> */}

             <Route
          path="/admin/login"
          element={
   
              <AdminLogin />
         
          }
        />



        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/testimonies" element={
          <AdminRoute>
            <AdminTestimonies />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />
        <Route path="/admin/settings" element={
          <AdminRoute>
            <AdminSettings />
          </AdminRoute>
        } />

        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>


  );
}

export default App;