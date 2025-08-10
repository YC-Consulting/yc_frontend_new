import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginStatus('idle');

    try {
      // TODO: Implement actual login logic
      // For now, simulate login process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success for demo
      if (formData.email && formData.password) {
        setLoginStatus('success');
        // TODO: Redirect to dashboard or previous page
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        throw new Error('Please fill in all fields');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-yellow-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">Y</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Yichuan AI</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.email || !formData.password}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-yellow-500 text-white font-medium px-6 py-3 rounded-lg hover:from-primary-600 hover:to-yellow-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Status Messages */}
            {loginStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">Login successful!</span>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  Redirecting to your dashboard...
                </p>
              </div>
            )}

            {loginStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-red-700">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-medium">Login failed</span>
                </div>
                <p className="text-red-600 text-sm mt-1">
                  Please check your credentials and try again
                </p>
              </div>
            )}
          </form>

          {/* Password Recovery Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Forgot your password? Please email{' '}
              <a 
                href="mailto:yichuaned@gmail.com" 
                className="text-primary-600 hover:text-primary-800 underline"
              >
                yichuaned@gmail.com
              </a>
              {' '}for assistance
            </p>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:text-primary-800"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-gray-500"
        >
          <p>
            By signing in, you agree to our{' '}
            <Link to="/privacy-policy" className="text-primary-600 hover:text-primary-800">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link to="/terms" className="text-primary-600 hover:text-primary-800">
              Terms of Service
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}