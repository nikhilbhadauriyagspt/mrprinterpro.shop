import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronLeft, ShieldCheck, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-sans bg-[#fcfcfc]">
        <div className="h-24 w-24 bg-white rounded-full border border-gray-100 flex items-center justify-center mb-8 shadow-xl shadow-gray-200/50">
          <ShoppingBag size={40} className="text-gray-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 font-medium mb-10 max-w-sm text-center leading-relaxed">It looks like you haven't added anything to your cart yet. Explore our authorized collection to get started.</p>
        <Link to="/shop">
          <button className="bg-[#007185] hover:bg-[#005a6a] text-white px-12 py-4 font-bold rounded-xl transition-all shadow-lg shadow-[#007185]/20 flex items-center gap-3 text-[16px] uppercase tracking-wider active:scale-95">
            Start Shopping
            <ArrowRight size={20} />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20 font-sans">
      
      {/* --- PAGE HEADER --- */}
      <div className="bg-white py-12 md:py-16 px-4 md:px-10 lg:px-16 border-b border-gray-100 mb-12">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1 w-8 bg-[#007185] rounded-full" />
                <span className="text-[12px] font-bold text-[#007185] uppercase tracking-widest">Active Basket</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                Shopping <span className="text-[#007185]">Cart</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-[#f9f9f9] px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
               <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
               <p className="text-[14px] font-bold text-gray-700">{cartCount} {cartCount === 1 ? 'Item' : 'Items'} Reserved</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* --- ITEMS LIST --- */}
          <div className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row items-center gap-8 group"
                >
                  <div className="h-32 w-32 sm:h-40 sm:w-40 bg-[#f9f9f9] rounded-2xl border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:border-[#007185]/30 transition-colors p-4">
                    <img 
                      src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                      alt={item.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/150x150"; }}
                    />
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col mb-6">
                      <span className="text-[11px] font-bold text-[#007185] uppercase tracking-[0.2em] mb-2">{item.brand_name || 'AUTHENTIC'}</span>
                      <Link to={`/product/${item.slug}`}>
                        <h3 className="text-xl font-bold text-gray-900 hover:text-[#007185] transition-colors line-clamp-2 leading-tight">{item.name}</h3>
                      </Link>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="h-11 flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-full w-12 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"><Minus size={16} /></button>
                        <span className="text-[15px] font-bold w-10 text-center text-gray-900 border-x border-gray-200 h-full flex items-center justify-center bg-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-full w-12 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors"><Plus size={16} /></button>
                      </div>
                      <span className="text-2xl font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="h-10 w-10 bg-gray-50 rounded-full text-gray-300 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all absolute top-4 right-4 sm:static"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* --- SUMMARY MODULE --- */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-2xl shadow-gray-200/50 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4 uppercase tracking-widest text-[13px]">Order Summary</h3>
              
              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center text-gray-500">
                  <span className="text-[15px] font-medium">Subtotal ({cartCount} items)</span>
                  <span className="text-[17px] font-bold text-gray-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className="text-[15px] font-medium flex items-center gap-2">
                    Shipping
                    <Truck size={14} className="text-[#007185]" />
                  </span>
                  <span className="text-[13px] font-bold text-emerald-600 uppercase tracking-tight">FREE</span>
                </div>
                <div className="h-px bg-gray-50 my-2" />
                <div className="flex justify-between items-end">
                  <span className="text-[16px] font-bold text-gray-900 uppercase tracking-tight">Total Amount</span>
                  <div className="text-right">
                    <span className="text-4xl font-black text-[#007185] tracking-tighter">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <button className="w-full h-14 bg-[#007185] hover:bg-[#005a6a] text-white flex items-center justify-center gap-4 font-bold rounded-2xl transition-all shadow-xl shadow-[#007185]/20 group active:scale-95">
                  Secure Checkout
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center gap-2 text-emerald-600 py-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <ShieldCheck size={18} />
                  <span className="text-[12px] font-bold uppercase">100% Secure Transaction</span>
                </div>
                <div className="flex justify-center items-center gap-4 opacity-60">
                   <img src="/logo/mr-logo.png" className="h-4 grayscale" alt="" />
                   <div className="h-4 w-px bg-gray-300" />
                   <div className="flex items-center text-lg font-black italic">
                      <span className="text-[#003087]">Pay</span>
                      <span className="text-[#009cde]">Pal</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12">
          <Link to="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#007185] transition-all font-bold text-[14px] group">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Continue Browsing Collections
          </Link>
        </div>
      </div>
    </div>
  );
}

