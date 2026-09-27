import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, loading, error, clearError, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

//   useEffect(() => {
//     if (isAuthenticated && isAdmin) {
//       navigate('/admin/dashboard', { replace: true });
//     } else if (isAuthenticated && !isAdmin) {
//       navigate('/', { replace: true });
//     }
//   }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    clearError();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        // User is not an admin
        clearError();
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-2xl font-light text-white tracking-wider">
              <span className="font-bold">They</span>ThatTestify
            </h1>
          </Link>
          
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Admin Access</h2>
            <p className="text-gray-400 mt-2">Secure administrative portal</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-400 text-red-200 px-4 py-3 rounded-lg flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Admin Login Form */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl p-8 border border-white/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="Enter admin email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all backdrop-blur-sm"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/40 hover:text-white/60" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/40 hover:text-white/60" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-white/30 rounded bg-white/10"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-white/70">
                  Keep me signed in
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Shield className="mr-2 h-5 w-5" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-400/30 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
              <div className="text-sm text-yellow-200">
                <p className="font-medium mb-1">Security Notice</p>
                <p className="text-yellow-300/80">
                  This is a restricted area. All access attempts are logged and monitored. 
                  Only authorized administrators should access this portal.
                </p>
              </div>
            </div>
          </div>

          {/* Public Site Link */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              Not an admin?{' '}
              <Link
                to="/login"
                className="text-red-400 hover:text-red-300 font-medium transition-colors"
              >
                User Login
              </Link>{' '}
              or{' '}
              <Link
                to="/"
                className="text-white/60 hover:text-white/80 font-medium transition-colors"
              >
                Return to Site
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Security Info */}
        <div className="text-center">
          <p className="text-white/30 text-xs">
            Protected by enterprise-grade security • Session timeout: 2 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;