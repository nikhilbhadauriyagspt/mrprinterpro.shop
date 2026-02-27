import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Truck, ShieldCheck, ArrowRight, Lock, MapPin, Mail, Loader2, ShoppingBag, Check, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalButtons } from "@paypal/react-paypal-js";
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Checkout() {
  const { cart, cartCount, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; 
  const tax = 0; 
  const finalTotal = total + shipping + tax;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrderSuccess = async (paymentDetails = null) => {
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        address: `${formData.address} (From: ${window.location.hostname})`,
        user_id: user?.id,
        total: finalTotal,
        items: cart,
        payment_details: paymentDetails
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setOrderId(data.order_id);
        setStep(3);
        clearCart();
      } else {
        alert('Error placing order: ' + data.message);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      if (formData.paymentMethod === 'cod') {
        await handleOrderSuccess();
      }
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 font-sans bg-[#fcfcfc]">
        <div className="h-24 w-24 bg-white rounded-full border border-gray-100 flex items-center justify-center mb-8 shadow-xl shadow-gray-200/50">
          <ShoppingBag size={40} className="text-gray-200" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Checkout is empty</h2>
        <p className="text-gray-500 font-medium mb-10 max-w-sm text-center">Please add professional hardware to your cart before proceeding to checkout.</p>
        <Link to="/shop">
          <button className="bg-[#007185] hover:bg-[#005a6a] text-white px-10 py-3.5 font-bold rounded-xl transition-all shadow-lg shadow-[#007185]/20">
            Return to Shop
          </button>
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 font-sans bg-[#fcfcfc] text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl w-full">
          <div className="h-24 w-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-100">
            <Check size={48} strokeWidth={3} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 leading-none uppercase">Order<br/><span className="text-[#007185]">Confirmed</span></h1>
          <p className="text-gray-500 font-medium text-lg mb-12">Your deployment protocol has been successfully initiated.</p>
          
          <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#007185]" />
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">Tracking Reference</p>
            <p className="text-3xl font-black text-[#007185] tracking-tight">#PFX-{orderId || 'PROCESS'}</p>
          </div>

          <Link to="/">
            <button className="bg-[#131921] hover:bg-black text-white px-14 py-4 font-bold rounded-2xl transition-all shadow-xl active:scale-95 text-[16px] uppercase tracking-wider">
              Back to Dashboard
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans pb-20">
      <SEO title="Secure Checkout | MrPrinterPro" />
      
      {/* --- PAGE HEADER --- */}
      <div className="bg-white py-12 md:py-16 px-4 md:px-10 lg:px-16 border-b border-gray-100 mb-12">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <Link to="/cart" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#007185] transition-colors mb-4 group">
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
              </Link>
              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-none">
                Secure <span className="text-[#007185]">Checkout</span>
              </h1>
            </div>

            {/* Stepper - Modern */}
            <div className="flex items-center bg-[#f9f9f9] p-1.5 rounded-2xl border border-gray-100">
              <div className={cn("flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all", step === 1 ? "bg-white shadow-sm text-gray-900" : "text-gray-400")}>
                 <div className={cn("h-6 w-6 flex items-center justify-center text-[11px] font-bold rounded-full border-2", step >= 1 ? "bg-[#007185] text-white border-[#007185]" : "border-gray-200")}>1</div>
                 <span className="text-[13px] font-bold uppercase tracking-tight">Logistics</span>
              </div>
              <div className={cn("flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all", step === 2 ? "bg-white shadow-sm text-gray-900" : "text-gray-400")}>
                 <div className={cn("h-6 w-6 flex items-center justify-center text-[11px] font-bold rounded-full border-2", step >= 2 ? "bg-[#007185] text-white border-[#007185]" : "border-gray-200")}>2</div>
                 <span className="text-[13px] font-bold uppercase tracking-tight">Settlement</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                  <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                    <div className="flex items-center gap-4 mb-10 border-b border-gray-50 pb-6">
                      <div className="h-10 w-10 bg-[#007185]/10 rounded-xl flex items-center justify-center text-[#007185]">
                        <Mail size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[13px] font-bold text-gray-700 ml-1">Email Address</label>
                       <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="john@company.com" className="w-full h-12 px-5 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:bg-white focus:border-[#007185] focus:ring-4 focus:ring-[#007185]/10 outline-none text-[15px] font-medium transition-all" />
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                    <div className="flex items-center gap-4 mb-10 border-b border-gray-50 pb-6">
                      <div className="h-10 w-10 bg-[#007185]/10 rounded-xl flex items-center justify-center text-[#007185]">
                        <MapPin size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Shipping Address</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-700 ml-1">First Name</label>
                        <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full h-12 px-5 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:bg-white focus:border-[#007185] outline-none text-[15px] font-medium transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-700 ml-1">Last Name</label>
                        <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full h-12 px-5 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:bg-white focus:border-[#007185] outline-none text-[15px] font-medium transition-all" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <label className="text-[13px] font-bold text-gray-700 ml-1">Street Address</label>
                      <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="House no / Street / Area" className="w-full h-12 px-5 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:bg-white focus:border-[#007185] outline-none text-[15px] font-medium transition-all" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-700 ml-1">City</label>
                        <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full h-12 px-5 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:bg-white focus:border-[#007185] outline-none text-[15px] font-medium transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[13px] font-bold text-gray-700 ml-1">Zip Code</label>
                        <input required name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className="w-full h-12 px-5 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:bg-white focus:border-[#007185] outline-none text-[15px] font-medium transition-all" />
                      </div>
                    </div>
                    <div className="mt-6 space-y-2">
                      <label className="text-[13px] font-bold text-gray-700 ml-1">Phone Number</label>
                      <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Phone Number" className="w-full h-12 px-5 bg-[#f9f9f9] border border-gray-200 rounded-xl focus:bg-white focus:border-[#007185] outline-none text-[15px] font-medium transition-all" />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                    <div className="flex items-center gap-4 mb-10 border-b border-gray-50 pb-6">
                      <div className="h-10 w-10 bg-[#007185]/10 rounded-xl flex items-center justify-center text-[#007185]">
                        <CreditCard size={20} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* COD */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                        className={cn(
                          "p-8 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[180px]",
                          formData.paymentMethod === 'cod' ? "bg-[#007185]/5 border-[#007185]" : "bg-white border-gray-100 hover:border-gray-300"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'cod' ? "border-[#007185] bg-[#007185]" : "border-gray-200")}>
                            {formData.paymentMethod === 'cod' && <Check size={14} className="text-white" strokeWidth={4} />}
                          </div>
                          <Truck size={32} className={formData.paymentMethod === 'cod' ? "text-[#007185]" : "text-gray-200"} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 leading-tight">Cash on Delivery</h4>
                          <p className="text-[12px] font-medium text-gray-500 mt-1">Settle directly upon hardware arrival</p>
                        </div>
                      </div>

                      {/* PayPal */}
                      <div 
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                        className={cn(
                          "p-8 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[180px]",
                          formData.paymentMethod === 'paypal' ? "bg-[#007185]/5 border-[#007185]" : "bg-white border-gray-100 hover:border-gray-300"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all", formData.paymentMethod === 'paypal' ? "border-[#007185] bg-[#007185]" : "border-gray-200")}>
                            {formData.paymentMethod === 'paypal' && <Check size={14} className="text-white" strokeWidth={4} />}
                          </div>
                          <Wallet size={32} className={formData.paymentMethod === 'paypal' ? "text-[#007185]" : "text-gray-200"} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 leading-tight flex items-center gap-2">PayPal Express</h4>
                          <p className="text-[12px] font-medium text-gray-500 mt-1">Instant digital asset settlement</p>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {formData.paymentMethod === 'paypal' && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-8 pt-10 mt-6 border-t border-gray-50">
                          <div className="p-6 bg-[#131921] rounded-2xl text-center relative overflow-hidden group shadow-xl">
                            <p className="text-[11px] font-bold uppercase tracking-widest mb-4 relative z-10 text-[#007185]">Secure Encrypted Gateway</p>
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 rounded-full text-white text-[12px] font-bold relative z-10 border border-white/10 backdrop-blur-md">
                              <Lock size={14} className="text-[#007185]" /> Secure Link Active
                            </div>
                          </div>
                          <div className="max-w-md mx-auto relative z-0">
                            <PayPalButtons 
                              style={{ layout: "vertical", shape: "rect", label: "pay" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [{ amount: { value: finalTotal.toString() }, description: `MrPrinterPro Order - ${cartCount} Items` }],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                try {
                                  const details = await actions.order.capture();
                                  await handleOrderSuccess(details);
                                } catch (err) { alert("Failed to process payment."); }
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-12 flex flex-col items-center gap-6">
              {(formData.paymentMethod === 'cod' || step === 1) && (
                <button 
                  type="submit" disabled={loading}
                  className="w-full md:w-auto h-14 px-16 bg-[#007185] hover:bg-[#005a6a] text-white font-bold rounded-2xl transition-all shadow-xl shadow-[#007185]/20 flex items-center justify-center gap-4 text-[16px] uppercase tracking-wider disabled:opacity-50 active:scale-95 group"
                >
                  {loading ? <Loader2 className="animate-spin" size={24} /> : (
                    <>
                      {step === 1 ? 'Next Step' : 'Confirm Order'}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="text-[13px] font-bold text-gray-400 hover:text-[#007185] transition-all flex items-center gap-2">
                   <ChevronLeft size={16} /> Back to Shipping
                </button>
              )}
            </div>
          </div>

          {/* --- SIDEBAR: SUMMARY --- */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 sticky top-32 shadow-2xl shadow-gray-200/50">
              <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-4">
                 <ShieldCheck size={20} className="text-emerald-600" />
                 <h3 className="text-[13px] font-bold uppercase tracking-widest text-gray-900">Order Manifest</h3>
              </div>
              
              <div className="space-y-6 mb-8 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="h-16 w-16 bg-[#f9f9f9] rounded-xl border border-gray-50 p-2 flex items-center justify-center shrink-0">
                      <img src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} className="max-w-full max-h-full object-contain mix-blend-multiply" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-gray-900 truncate leading-tight mb-1">{item.name}</h4>
                      <div className="flex items-center justify-between text-[12px] font-medium text-gray-500">
                         <span>Qty: {item.quantity}</span>
                         <span className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-gray-50 pt-8 mt-8">
                <div className="flex justify-between text-[14px] font-medium text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[14px] font-medium text-gray-500">
                  <span>Shipping</span>
                  <span className="font-bold text-emerald-600 uppercase">Free</span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-6">
                  <span className="text-[14px] font-bold uppercase tracking-tight text-gray-900">Total Amount</span>
                  <span className="text-3xl font-black text-[#007185] tracking-tighter">${finalTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
