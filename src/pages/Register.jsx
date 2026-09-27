import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, EyeOff, Mail, Lock, User, Phone, MapPin, 
  Briefcase, Church, FileText, Camera, ArrowRight, 
  AlertCircle, CheckCircle 
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: '',
    city: '',
    occupation: '',
    church: '',
    bio: '',
    profilePicture: null,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [step, setStep] = useState(1); // Multi-step form
  
  const { register, loading, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/', { replace: true });
  //   }
  // }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, []);

  useEffect(() => {
    // Check password match
    if (formData.password && formData.confirmPassword) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    clearError();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePicture: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && 
               formData.password && formData.confirmPassword && passwordMatch;
      case 2:
        return true; // Optional fields
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(1) || !passwordMatch) {
      return;
    }

    const result = await register(formData);
    
    if (result.success) {
      navigate('/login', {
        state: {
          message: result.message || 'Registration successful! Please check your email to verify your account.'
        }
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-light text-white mb-2">Create Your Account</h2>
        <p className="text-white/70">Step 1 of 2 - Basic Information</p>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            First Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-white/50" />
            </div>
            <input
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              placeholder="First name"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Last Name *
          </label>
          <input
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            className="block w-full px-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-white/50" />
          </div>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            placeholder="Enter your email"
          />
        </div>
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/50" />
            </div>
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-12 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-white/50 hover:text-white/70" />
              ) : (
                <Eye className="h-5 w-5 text-white/50 hover:text-white/70" />
              )}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`block w-full pl-3 pr-12 py-3 border rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                passwordMatch ? 'border-white/20 focus:ring-amber-400' : 'border-red-400 focus:ring-red-400'
              }`}
              placeholder="Confirm password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-white/50 hover:text-white/70" />
              ) : (
                <Eye className="h-5 w-5 text-white/50 hover:text-white/70" />
              )}
            </button>
          </div>
          {!passwordMatch && formData.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">Passwords do not match</p>
          )}
        </div>
      </div>

      {/* Password Requirements */}
      <div className="text-xs text-white/60">
        Password must contain at least 8 characters with uppercase, lowercase, and number.
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-light text-white mb-2">Tell Us About Yourself</h2>
        <p className="text-white/70">Step 2 of 2 - Optional Information</p>
      </div>

      {/* Profile Picture */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Profile Picture
        </label>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border-2 border-white/20">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Camera className="h-8 w-8 text-white/50" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white/70">
              Click the circle to upload a profile picture
            </p>
            <p className="text-xs text-white/50">
              JPG, PNG or GIF (max. 5MB)
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-white/50" />
            </div>
            <input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              placeholder="Phone number"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Country
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-white/50" />
            </div>
            <input
              name="country"
              type="text"
              value={formData.country}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              placeholder="Country"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            City
          </label>
          <input
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            className="block w-full px-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            placeholder="City"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Occupation
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-white/50" />
            </div>
            <input
              name="occupation"
              type="text"
              value={formData.occupation}
              onChange={handleInputChange}
              className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
              placeholder="Your occupation"
            />
          </div>
        </div>
      </div>

      {/* Church */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Church (Optional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Church className="h-5 w-5 text-white/50" />
          </div>
          <input
            name="church"
            type="text"
            value={formData.church}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
            placeholder="Your church name"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Bio (Optional)
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <FileText className="h-5 w-5 text-white/50" />
          </div>
          <textarea
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleInputChange}
            className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
            placeholder="Tell us a little about yourself..."
            maxLength={500}
          />
        </div>
        <div className="text-xs text-white/50 text-right">
          {formData.bio.length}/500 characters
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-light text-white tracking-wider mb-2">
              <span className="font-bold">They</span>ThatTestify
            </h1>
          </Link>
          <p className="text-white/70 text-lg">Join our mission</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-400 text-red-200 px-4 py-3 rounded-lg flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-white/30 text-white/80 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Back
                </button>
              )}
              
              <div className="ml-auto">
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!validateStep(step)}
                    className="group flex items-center px-6 py-3 bg-amber-400 text-black rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    Next
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !validateStep(1)}
                    className="group flex items-center px-6 py-3 bg-amber-400 text-black rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    ) : (
                      <>
                        Create Account
                        <CheckCircle className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center space-x-2">
          {[1, 2].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`h-2 w-8 rounded-full transition-colors ${
                step >= stepNumber ? 'bg-amber-400' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Register;