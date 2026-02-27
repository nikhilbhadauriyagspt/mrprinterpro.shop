import { Link } from 'react-router-dom';
import { Globe, Mail, Loader2, MapPin, ShieldCheck, ArrowUpRight, Facebook, Twitter, Instagram, Youtube, Phone, Zap, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { showToast } = useCart();

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const flat = data.data.flatMap(cat => [cat, ...(cat.children || [])]);
          const unique = Array.from(new Map(flat.map(item => [item.slug, item])).values())
            .filter(cat => 
              !cat.name.toLowerCase().includes('laptop') && 
              !cat.slug.toLowerCase().includes('laptop') &&
              !cat.name.toLowerCase().includes('chromebook')
            )
            .slice(0, 6);
          setCategories(unique);
        }
      });
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (data.status === 'success') {
        showToast(data.message, 'success');
        setEmail('');
      } else {
        showToast(data.message, 'info');
      }
    } catch (err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#fcfcfc] text-gray-900 pt-20 pb-10 font-sans border-t border-gray-200">
      <div className="w-full px-4 md:px-10 lg:px-16">
        
        {/* --- TOP ROW: BRAND & NEWSLETTER (CLEAN DESIGN) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="inline-flex items-center gap-4 group">
              <img src="/logo/mr-logo.png" alt="MrPrinterPro" className="h-10 lg:h-12 w-auto object-contain" />
              <div className="h-10 w-px bg-gray-200" />
              <div className="flex flex-col leading-tight">
                <span className="text-[8px] font-medium text-gray-400 uppercase tracking-[0.2em]">A Subsidiary of</span>
                <span className="text-[12px] font-bold text-gray-900 tracking-wide">PrimeFix Solutions</span>
              </div>
            </Link>
            <p className="text-gray-500 text-[15px] md:text-lg font-medium leading-relaxed max-w-sm">
              Authorized HP Partner specializing in premium hardware solutions and professional operational systems for global enterprises.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm">
                  <ShieldCheck size={16} className="text-[#007185]" />
                  <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">Authorized HP Partner</span>
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm">
                  <Globe size={16} className="text-[#007185]" />
                  <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">US Logistics</span>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="bg-[#131921] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group shadow-2xl">
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tighter">Stay updated with professional inventory.</h3>
                  <p className="text-gray-400 font-medium">Join our network for exclusive enterprise deals and hardware updates.</p>
                </div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter corporate email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#007185] transition-all"
                  />
                  <button
                    disabled={loading}
                    className="bg-[#007185] hover:bg-[#005a6a] text-white px-10 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg active:scale-95"
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : "Subscribe Now"}
                    <ArrowRight size={18} />
                  </button>
                </form>
              </div>
              <Zap size={240} className="absolute -bottom-20 -right-20 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>
        </div>

        {/* --- LINKS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 lg:gap-12 mb-20">
          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-8">Collections</h4>
            <ul className="space-y-4">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link to={`/shop?category=${cat.slug}`} className="text-gray-500 hover:text-[#007185] transition-all text-[14px] font-medium flex items-center gap-2 group/link">
                    {cat.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-8">Company</h4>
            <ul className="space-y-4">
              {[{ name: 'About Us', path: '/about' }, { name: 'Contact Us', path: '/contact' }, { name: 'Track Orders', path: '/orders' }, { name: 'FAQs', path: '/faq' }].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-500 hover:text-[#007185] transition-all text-[14px] font-medium flex items-center gap-2 group/link">
                    {item.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-8">Policy Hub</h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', path: '/privacy-policy' }, 
                { name: 'Terms & Conditions', path: '/terms-and-conditions' }, 
                { name: 'Return Policy', path: '/return-policy' }, 
                { name: 'Shipping Policy', path: '/shipping-policy' },
                { name: 'Cookie Policy', path: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-500 hover:text-[#007185] transition-all text-[14px] font-medium flex items-center gap-2 group/link">
                    {item.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div>
              <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-6">Contact Support</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                   <MapPin size={18} className="text-[#007185] shrink-0 mt-0.5" />
                   <span className="text-[14px] font-medium text-gray-500 leading-relaxed">
                     112 Water St Suite 202, Boston, MA 02109, USA
                   </span>
                </div>
                <div className="flex items-center gap-3">
                   <Mail size={18} className="text-[#007185] shrink-0" />
                   <span className="text-[14px] font-medium text-gray-500">info@mrprinterpro.shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[13px] font-medium text-gray-400 text-center md:text-left">
            © 2026 MrPrinterPro | ALL RIGHTS RESERVED. <br className="md:hidden" />
            <span className="hidden md:inline mx-2 text-gray-200">|</span> 
            A SUBSIDIARY OF PRIMEFIX SOLUTIONS 
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                <span className="text-[12px] font-bold text-gray-600 uppercase tracking-tight">Verified Merchant</span>
             </div>
             <div className="h-6 w-px bg-gray-200" />
             <div className="flex items-center text-2xl font-black italic">
                <span className="text-[#003087]">Pay</span>
                <span className="text-[#009cde]">Pal</span>
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
}



