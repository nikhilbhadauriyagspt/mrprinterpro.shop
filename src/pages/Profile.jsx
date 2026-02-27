import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { 
  User, 
  Lock, 
  Package, 
  LogOut, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  Calendar,
  Activity,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [isUpdating, setIsUpdating] = useState(false);
  const { showToast } = useCart();
  const navigate = useNavigate();

  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [securityForm, setSecurityForm] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders?user_id=${user.id}`);
      const data = await response.json();
      if (data.status === 'success') setOrders(data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        showToast("Profile updated successfully!");
      }
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSecurityUpdate = async (e) => {
    e.preventDefault();
    if (securityForm.password !== securityForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.password })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast("Password changed successfully!");
        setSecurityForm({ password: '', confirmPassword: '' });
      }
    } catch (err) {
      showToast("Security update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="bg-white min-h-screen pt-20 lg:pt-24 font-urbanist overflow-hidden">
      <SEO title="Member Dashboard | MrPrinterPro" />
      
      {/* --- PAGE HEADER --- */}
      <div className="py-12 lg:py-16 px-4 md:px-10 lg:px-16 border-b-2 border-slate-900 bg-slate-50 mb-12">
        <div className="max-w-[1920px] mx-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-8 bg-indigo-600" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Personal Hub</span>
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-[0.85]">
              Member<br/>
              <span className="text-indigo-600">Dashboard.</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- SIDEBAR --- */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border-2 border-slate-900 p-10 shadow-[12px_12px_0px_rgba(0,0,0,0.05)] text-center relative overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center">
                 <div className="h-20 w-20 bg-slate-900 border-2 border-slate-900 flex items-center justify-center text-white text-3xl font-black mb-6 uppercase tracking-tighter shadow-[6px_6px_0px_rgba(79,70,229,0.3)]">
                   {user.name.charAt(0)}
                 </div>
                 <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-2">{user.name}</h2>
                 <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">{user.email}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-900 p-2 shadow-[8px_8px_0px_rgba(0,0,0,0.05)]">
              {[
                { id: 'profile', label: 'Identity Config', icon: User },
                { id: 'orders', label: 'Order History', icon: Package },
                { id: 'security', label: 'Secure Terminal', icon: Lock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-6 py-4 transition-all uppercase text-[11px] font-black tracking-widest group",
                    activeTab === tab.id 
                    ? "bg-slate-900 text-white" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center gap-4">
                     <tab.icon size={16} strokeWidth={2.5} />
                     {tab.label}
                  </div>
                  <ChevronRight size={14} className={cn("transition-transform", activeTab === tab.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0")} />
                </button>
              ))}
              <div className="mt-4 pt-4 border-t-2 border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-4 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 transition-all border-2 border-transparent hover:border-red-600 mt-2"
                >
                  <LogOut size={16} strokeWidth={2.5} />
                  Terminate Session
                </button>
              </div>
            </div>
          </div>

          {/* --- CONTENT HUB --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-white border-2 border-slate-900 p-8 lg:p-16 shadow-[12px_12px_0px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center justify-between mb-12 border-b-4 border-slate-100 pb-8">
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tighter">Identity Details.</h3>
                    <User size={32} className="text-indigo-600" />
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                        <input 
                          required value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Code</label>
                        <input 
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full h-14 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Address</label>
                      <textarea 
                        rows="4" value={profileForm.address}
                        onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                        className="w-full p-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all resize-none"
                      ></textarea>
                    </div>
                    <button 
                      disabled={isUpdating}
                      className="h-16 px-12 bg-slate-900 text-white font-black text-[11px] uppercase tracking-[0.4em] hover:bg-indigo-600 transition-all border-2 border-slate-900 shadow-[8px_8px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                      {isUpdating ? "UPDATING_TERMINAL..." : "COMMIT CHANGES"}
                    </button>
                  </form>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-10"
                >
                  <div className="bg-slate-900 text-white border-2 border-slate-900 p-10 lg:p-14 shadow-[12px_12px_0px_rgba(79,70,229,0.2)] relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                           <div className="h-1 w-6 bg-indigo-400 animate-pulse" />
                           <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">Inventory Logs</h4>
                        </div>
                        <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-4">Order History.</h3>
                        <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">{orders.length} authorized acquisitions confirmed</p>
                      </div>
                      <Link to="/shop">
                        <button className="h-14 px-10 bg-white text-slate-900 border-2 border-white hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all font-black text-[10px] uppercase tracking-widest shadow-[6px_6px_0px_rgba(0,0,0,0.1)]">
                          NEW ACQUISITION
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-px bg-slate-200 border-2 border-slate-900 overflow-hidden">
                    {orders.length === 0 ? (
                      <div className="bg-white p-24 text-center">
                        <Package size={48} className="text-slate-200 mx-auto mb-6" />
                        <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.4em]">Zero history records detected.</p>
                      </div>
                    ) : (
                      orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="bg-white p-8 lg:p-10 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-8">
                             <div className="h-12 w-12 border-2 border-slate-900 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                <Activity size={20} />
                             </div>
                             <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Acquisition ID</p>
                                <h4 className="text-lg font-black text-slate-900 uppercase">#PFX-{order.id}</h4>
                             </div>
                          </div>
                          <div className="flex items-center gap-12">
                            <div className="hidden sm:block text-right">
                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Valuation</p>
                               <p className="text-xl font-black text-indigo-600 tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                            </div>
                            <Link to="/orders">
                              <button className="h-10 w-10 border-2 border-slate-900 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,0.1)] active:shadow-none">
                                <ArrowRight size={16} />
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="bg-white border-2 border-slate-900 p-8 lg:p-16 shadow-[12px_12px_0px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex items-center justify-between mb-12 border-b-4 border-slate-100 pb-8">
                    <h3 className="text-3xl lg:text-4xl font-black text-slate-900 uppercase tracking-tighter">Security Terminal.</h3>
                    <Lock size={32} className="text-indigo-600" />
                  </div>

                  <form onSubmit={handleSecurityUpdate} className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Access Key</label>
                      <div className="relative group">
                        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-slate-200 group-focus-within:border-slate-900 transition-colors">
                          <Lock className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} strokeWidth={2.5} />
                        </div>
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.password}
                          onChange={(e) => setSecurityForm({...securityForm, password: e.target.value})}
                          className="w-full h-14 pl-16 pr-16 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors">
                          {showPass ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verify Access Key</label>
                      <div className="relative group">
                        <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-slate-200 group-focus-within:border-slate-900 transition-colors">
                          <ShieldCheck className="text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={18} strokeWidth={2.5} />
                        </div>
                        <input 
                          type={showPass ? "text" : "password"} required value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({...securityForm, confirmPassword: e.target.value})}
                          className="w-full h-14 pl-16 px-6 bg-slate-50 border-2 border-slate-200 focus:bg-white focus:border-slate-900 outline-none text-xs font-bold uppercase transition-all"
                        />
                      </div>
                    </div>
                    <button 
                      disabled={isUpdating}
                      className="h-16 px-12 bg-red-600 text-white font-black text-[11px] uppercase tracking-[0.4em] hover:bg-slate-900 transition-all border-2 border-red-600 shadow-[8px_8px_0px_rgba(220,38,38,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                      {isUpdating ? "PROCESSING_AUTH..." : "AUTHORIZE KEY CHANGE"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

