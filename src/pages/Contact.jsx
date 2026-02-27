import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { Mail, MapPin, Send, Loader2, CheckCircle2, ChevronDown, ShieldCheck, Phone, Clock } from 'lucide-react';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans">
      <SEO 
        title="Contact Us | MrPrinterPro" 
        description="Get in touch with MrPrinterPro for premium support, corporate inquiries, or product guidance."
      />
      
      {/* --- CLEAN WHITE PAGE HEADER --- */}
      <div className="bg-white py-16 md:py-24 px-4 md:px-10 lg:px-16 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-8 bg-[#007185] rounded-full" />
              <span className="text-[12px] font-bold text-[#007185] uppercase tracking-widest">Connect with Experts</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
              Get in <span className="text-[#007185]">Touch</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Connect with our dedicated specialists for refined guidance on premium hardware and professional workspace configurations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* --- CONTACT INFO CARDS --- */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group">
              <div className="h-14 w-14 bg-[#007185]/10 text-[#007185] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#007185] group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-[15px] font-medium text-gray-500 mb-4">Our team typically replies within 45 mins.</p>
              <a href="mailto:info@mrprinterpro.shop" className="text-[15px] font-bold text-[#007185] hover:text-[#005a6a] hover:underline">
                info@mrprinterpro.shop
              </a>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group">
              <div className="h-14 w-14 bg-[#007185]/10 text-[#007185] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#007185] group-hover:text-white transition-all">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Headquarters</h3>
              <p className="text-[15px] font-medium text-gray-500 leading-relaxed">
                112 Water St Suite 202,<br/>
                Boston, MA 02109, USA
              </p>
            </div>

            <div className="bg-[#131921] p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="bg-white/10 p-3 rounded-xl inline-block mb-6 border border-white/10 backdrop-blur-sm">
                   <img src="/brands/hp.png" alt="HP" className="h-6 w-auto object-contain" />
                </div>
                <h4 className="text-2xl font-bold tracking-tight mb-4">
                  Authorized HP Partner
                </h4>
                <p className="text-gray-400 text-[14px] font-medium mb-6">
                  Providing enterprise-level authentic hardware and official warranty support.
                </p>
                <div className="inline-flex items-center gap-2 bg-[#007185] text-white px-4 py-2 rounded-lg text-[12px] font-bold uppercase tracking-wider">
                  <ShieldCheck size={16} /> Verified Merchant
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#007185]/20 rounded-full blur-[50px] group-hover:bg-[#007185]/40 transition-all duration-700" />
            </div>
          </div>

          {/* --- CONTACT FORM --- */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm">
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Send us a message</h2>
                <p className="text-gray-500 mt-2 font-medium">Please fill out the form below and we will get back to you as soon as possible.</p>
              </div>

              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <div className="h-20 w-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully</h2>
                  <p className="text-gray-500 font-medium mb-8">Thank you for reaching out. Our support team will contact you shortly.</p>
                  <button 
                    onClick={() => setStatus(null)} 
                    className="px-8 py-3 bg-[#007185] text-white font-bold rounded-lg hover:bg-[#005a6a] transition-all shadow-md active:scale-95"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-700">Full Name</label>
                      <input 
                        required type="text" placeholder="John Doe" value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#007185] focus:ring-2 focus:ring-[#007185]/20 outline-none text-[14px] font-medium transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-700">Email Address</label>
                      <input 
                        required type="email" placeholder="john@company.com" value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#007185] focus:ring-2 focus:ring-[#007185]/20 outline-none text-[14px] font-medium transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-700">Phone Number (Optional)</label>
                      <input 
                        type="tel" placeholder="+1 (555) 000-0000" value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#007185] focus:ring-2 focus:ring-[#007185]/20 outline-none text-[14px] font-medium transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-bold text-gray-700">Inquiry Topic</label>
                      <div className="relative">
                        <select 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#007185] focus:ring-2 focus:ring-[#007185]/20 outline-none text-[14px] font-medium transition-all appearance-none cursor-pointer pr-10 text-gray-700"
                        >
                          <option>General Inquiry</option>
                          <option>Product Support</option>
                          <option>Order Status</option>
                          <option>Corporate Sales</option>
                          <option>Warranty Claim</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-bold text-gray-700">Message</label>
                    <textarea 
                      required rows="6" placeholder="How can we assist you today?" value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#007185] focus:ring-2 focus:ring-[#007185]/20 outline-none text-[14px] font-medium transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      disabled={loading}
                      className="w-full md:w-auto h-12 px-10 bg-[#007185] text-white flex items-center justify-center gap-3 text-[14px] font-bold rounded-lg hover:bg-[#005a6a] transition-all shadow-md disabled:opacity-70 group active:scale-95"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <>
                          Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                  {status === 'error' && (
                    <p className="text-center text-red-500 text-[13px] font-bold mt-4">
                      Message failed to send. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

