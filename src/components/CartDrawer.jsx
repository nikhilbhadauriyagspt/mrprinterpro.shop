import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer, cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
          />

          {/* Cart Drawer - Modern Retail Design */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-white z-[1001] shadow-2xl flex flex-col font-sans"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between bg-[#fcfcfc]">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-[#007185]/10 rounded-xl flex items-center justify-center text-[#007185]">
                  <ShoppingBag size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                  <p className="text-[13px] text-gray-500 font-medium">{cartCount} {cartCount === 1 ? 'item' : 'items'} selected</p>
                </div>
              </div>
              <button 
                onClick={closeCartDrawer}
                className="h-9 w-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-white hover:border-gray-300 transition-all active:scale-95"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex gap-5 group border-b border-gray-50 pb-6 last:border-0"
                    >
                      {/* Image */}
                      <div className="h-24 w-24 bg-[#f9f9f9] rounded-2xl p-3 flex items-center justify-center flex-shrink-0 border border-gray-100">
                        <img 
                          src={item.images ? `${(typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0])}` : ''} 
                          alt={item.name}
                          className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100x100"; }}
                        />
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-[#007185] uppercase tracking-widest">{item.brand_name || 'AUTHENTIC'}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <Link to={`/product/${item.slug}`} onClick={closeCartDrawer}>
                            <h3 className="text-[14px] font-bold text-gray-900 leading-tight line-clamp-2 hover:text-[#007185] transition-colors">{item.name}</h3>
                          </Link>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="h-9 flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-full w-8 flex items-center justify-center hover:bg-gray-200 transition-all text-gray-600"><Minus size={12} /></button>
                            <span className="text-[13px] font-bold w-8 text-center text-gray-900">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-full w-8 flex items-center justify-center hover:bg-gray-200 transition-all text-gray-600"><Plus size={12} /></button>
                          </div>
                          <span className="text-[16px] font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100">
                    <ShoppingBag size={32} className="text-gray-200" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-[14px] text-gray-500 font-medium mb-8 max-w-[240px]">Explore our authorized inventory to find the best hardware for your needs.</p>
                  <Link 
                    to="/shop"
                    onClick={closeCartDrawer}
                    className="px-10 py-3 bg-[#007185] text-white font-bold rounded-xl hover:bg-[#005a6a] transition-all shadow-lg shadow-[#007185]/20"
                  >
                    Browse Catalog
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div>
                     <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Subtotal</span>
                     <span className="text-3xl font-bold text-gray-900 tracking-tight">${total.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                     <div className="flex items-center justify-end gap-2 text-emerald-600">
                        <ShieldCheck size={14} />
                        <span className="text-[11px] font-bold uppercase">Secure Transaction</span>
                     </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link 
                    to="/cart" 
                    onClick={closeCartDrawer}
                    className="w-full h-13 bg-white border border-gray-200 text-gray-700 flex items-center justify-center font-bold rounded-xl hover:border-[#007185] hover:text-[#007185] transition-all shadow-sm"
                  >
                    View Full Cart
                  </Link>
                  <Link 
                    to="/checkout"
                    onClick={closeCartDrawer}
                    className="w-full h-14 bg-[#007185] hover:bg-[#005a6a] text-white flex items-center justify-center gap-3 font-bold rounded-xl transition-all shadow-lg shadow-[#007185]/20 group active:scale-95"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
