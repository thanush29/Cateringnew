import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, Shield, ChefHat } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import logoImage from '/Site-logo.png';
export function AdminLogin() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/image.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/heroSection.mp4" type="video/mp4" />
        </video>
        {/* Lighter overlay for better video visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40"></div>
        {/* Subtle animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-md relative z-20 border border-white/20"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="relative inline-flex items-center justify-center w-24 h-24 mb-6"
          >
            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-80"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full bg-white/90"
              animate={{
                scale: [1, 0.95, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative z-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full p-3 shadow-xl">
            <img 
              src={logoImage}
              alt="Admin Logo"
              className="w-12 h-12 object-contain rounded-full"
            />
          </div>

          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 relative">
              <span className="text-white drop-shadow-2xl">
                Admin Portal
              </span>
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-lg"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/90 font-semibold mt-4 flex items-center justify-center gap-2 drop-shadow-lg"
          >
            <ChefHat size={18} className="text-yellow-300" />
            Shanvik Catering & Events
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <label htmlFor="email" className="block text-sm font-bold text-white mb-2 flex items-center gap-2 drop-shadow-lg">
              <Mail size={16} className="text-yellow-300" />
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-all duration-300" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-purple-400/30 focus:border-white/40 transition-all duration-300 bg-white/10 backdrop-blur-sm hover:border-white/30 text-white placeholder-white/40 font-medium"
                placeholder="Enter Admin Mail ID"
                required
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <label htmlFor="password" className="block text-sm font-bold text-white mb-2 flex items-center gap-2 drop-shadow-lg">
              <Lock size={16} className="text-yellow-300" />
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-all duration-300" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-purple-400/30 focus:border-white/40 transition-all duration-300 bg-white/10 backdrop-blur-sm hover:border-white/30 text-white placeholder-white/40 font-medium"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-red-500/20 backdrop-blur-md border-2 border-red-400/50 text-white p-4 rounded-xl text-sm font-semibold flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-full py-4 rounded-xl font-bold text-white overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              animate={{
                x: loading ? ["-100%", "100%"] : 0,
                opacity: loading ? 0.8 : 0,
              }}
              transition={{
                x: { duration: 1.5, repeat: Infinity, ease: "linear" },
              }}
            />
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
              {loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Signing in...
                </>
              ) : (
                <>
                  <img src={logoImage} alt="logo" className="w-5 h-5" />
                    Sign In Securely

                </>
              )}
            </span>
          </motion.button>
        </form>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-4 py-2">
            <Lock size={14} className="text-green-400" />
            <p className="text-xs text-white/90 font-semibold">
              Enterprise-grade Security
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}