import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, ChevronLeft, Plus, ShieldCheck, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, wishlistCount } = useCart();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-sans bg-[#fcfcfc]">
        <div className="h-24 w-24 bg-white rounded-full border border-gray-100 flex items-center justify-center mb-8 shadow-xl shadow-gray-200/50">
          <Heart size={40} className="text-gray-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-500 font-medium mb-10 max-w-sm text-center leading-relaxed">Save your favorite professional hardware here to keep track of them for future deployments.</p>
        <Link to="/shop">
          <button className="bg-[#007185] hover:bg-[#005a6a] text-white px-12 py-4 font-bold rounded-xl transition-all shadow-lg shadow-[#007185]/20 flex items-center gap-3 text-[16px] uppercase tracking-wider active:scale-95">
            Discover Products
            <ArrowRight size={20} />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20 font-sans">
      <SEO 
        title="Saved Inventory | MrPrinterPro" 
        description="View your curated list of favorite professional hardware."
      />
      
      {/* --- PAGE HEADER --- */}
      <div className="bg-white py-12 md:py-16 px-4 md:px-10 lg:px-16 border-b border-gray-100 mb-12">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1 w-8 bg-[#007185] rounded-full" />
                <span className="text-[12px] font-bold text-[#007185] uppercase tracking-widest">Saved Inventory</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                Your <span className="text-[#007185]">Wishlist</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-[#f9f9f9] px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
               <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
               <p className="text-[14px] font-bold text-gray-700">{wishlistCount} {wishlistCount === 1 ? 'Item' : 'Items'} Marked</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16">
        {/* --- GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {wishlist.map((p, i) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: (i % 5) * 0.05 }}
                className="group relative bg-white border border-gray-100 rounded-2xl p-5 flex flex-col h-full hover:shadow-xl hover:border-[#007185]/20 transition-all duration-500"
              >
                {/* Remove from Wishlist */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
                  className="absolute top-4 right-4 z-20 h-10 w-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center transition-all hover:bg-red-500 hover:text-white shadow-sm active:scale-90"
                >
                  <Trash2 size={18} />
                </button>

                {/* Product Visual */}
                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                  <div className="relative h-[200px] mb-6 flex items-center justify-center p-4">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.brand_name || 'AUTHORIZED'}</span>
                    <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#007185] transition-colors line-clamp-2 leading-tight min-h-[40px]">
                      {p.name}
                    </h3>
                    <div className="pt-2">
                      <span className="text-2xl font-black text-gray-900 tracking-tighter">${p.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>

                {/* Action */}
                <div className="mt-6 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full h-11 bg-white text-gray-900 border border-gray-200 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] hover:bg-[#007185] hover:text-white hover:border-[#007185] transition-all shadow-sm active:scale-95"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- FOOTER ACTION --- */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10 border-t border-gray-100 pt-10">
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#007185] transition-all font-bold text-[14px] group">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Continue Browsing Collections
          </Link>
          <div className="flex items-center gap-2 text-emerald-600">
             <ShieldCheck size={18} />
             <span className="text-[12px] font-bold uppercase tracking-widest">Verified Inventory Node</span>
          </div>
        </div>
      </div>
    </div>
  );
}
