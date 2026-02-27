import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'user', identifier: email, password })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] font-sans px-6 py-20">
      <div className="max-w-md w-full">
        
        {/* --- BRANDING --- */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
            <img src="/logo/mr-logo.png" alt="MrPrinterPro" className="h-10 w-auto object-contain" />
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[8px] font-medium text-gray-400 uppercase tracking-[0.2em]">A Subsidiary of</span>
              <span className="text-[12px] font-bold text-gray-900 tracking-wide">PrimeFix Solutions</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2 font-medium">Sign in to access your professional dashboard.</p>
        </div>

        {/* --- LOGIN CARD --- */}
        <div className="bg-white border border-gray-200 p-8 md:p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 relative overflow-hidden">
          <form onSubmit={handleLogin} className="space-y-6">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium"
                >
                  <AlertCircle size={18} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007185] transition-colors">
                    <Mail size={20} />
                  </div>
                  <input 
                    required type="email" placeholder="john@example.com" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-13 pl-12 pr-6 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#007185] focus:ring-4 focus:ring-[#007185]/10 outline-none text-[15px] font-medium transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[13px] font-bold text-gray-700">Password</label>
                  <Link to="#" className="text-[12px] font-bold text-[#007185] hover:underline">Forgot password?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007185] transition-colors">
                    <Lock size={20} />
                  </div>
                  <input 
                    required type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-13 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#007185] focus:ring-4 focus:ring-[#007185]/10 outline-none text-[15px] font-medium transition-all"
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full h-13 bg-[#007185] hover:bg-[#005a6a] text-white flex items-center justify-center gap-3 text-[15px] font-bold rounded-xl transition-all shadow-lg shadow-[#007185]/20 disabled:opacity-70 active:scale-95 group"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Sign In
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-[14px] font-medium text-gray-500">
              New to the platform?
              <Link to="/signup" className="text-[#007185] font-bold hover:underline ml-2">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

