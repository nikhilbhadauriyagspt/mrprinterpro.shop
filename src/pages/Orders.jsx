import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, X, CheckCircle2, Clock, MapPin, ArrowRight, Calendar, Loader2, Truck, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';
import SEO from '@/components/SEO';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const statusMap = [
    { key: 'pending', label: 'Order Received', icon: Clock, desc: 'Your order has been registered' },
    { key: 'processing', label: 'Processing', icon: Package, desc: 'Hardware is being prepared' },
    { key: 'shipped', label: 'In Transit', icon: Truck, desc: 'Your order is on the way' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin, desc: 'Courier is arriving soon' },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2, desc: 'Order successfully handed over' }
  ];

  const getStatusIndex = (status) => statusMap.findIndex(s => s.key === status);

  const fetchOrders = async (email = null) => {
    setLoading(true);
    try {
      const identifier = user ? `user_id=${user.id}` : `email=${email}`;
      const response = await fetch(`${API_BASE_URL}/orders?${identifier}`);
      const data = await response.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const handleGuestSearch = (e) => {
    e.preventDefault();
    if (guestEmail) fetchOrders(guestEmail);
  };

  if (!user && orders.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center px-6 font-sans">
        <div className="max-w-xl w-full text-center space-y-8">
          <div className="h-24 w-24 bg-white rounded-full border border-gray-100 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gray-200/50">
            <Package size={40} className="text-[#007185]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Track Your Order</h1>
          <p className="text-gray-500 font-medium text-lg">Enter your email address to locate your active shipments and view their real-time status.</p>
          
          <form onSubmit={handleGuestSearch} className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl border border-gray-200 shadow-sm focus-within:ring-2 focus-within:ring-[#007185]/20 transition-all">
            <input 
              type="email" required placeholder="Enter guest email address" value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="flex-1 h-12 px-6 bg-transparent outline-none text-[15px] font-medium"
            />
            <button className="bg-[#007185] hover:bg-[#005a6a] text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
              Locate Order
            </button>
          </form>

          <div className="pt-10 border-t border-gray-100">
            <p className="text-gray-500 font-medium">Already have an account? <Link to="/login" className="text-[#007185] font-bold hover:underline">Sign in here</Link></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-24 font-sans">
      <SEO title="Order History | MrPrinterPro" />
      
      {/* --- PAGE HEADER --- */}
      <div className="bg-white py-12 md:py-16 px-4 md:px-10 lg:px-16 border-b border-gray-100 mb-12">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1 w-8 bg-[#007185] rounded-full" />
                <span className="text-[12px] font-bold text-[#007185] uppercase tracking-widest">Customer Dashboard</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                Your <span className="text-[#007185]">Orders</span>
              </h1>
            </div>
            <div className="flex items-center gap-4 bg-[#f9f9f9] px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
               <div className="h-2 w-2 rounded-full bg-[#007185] animate-pulse" />
               <p className="text-[14px] font-bold text-gray-700">{orders.length} Shipments Found</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-12 w-12 text-[#007185] mb-6" />
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-gray-300">Syncing order history...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-32 bg-white border border-gray-100 rounded-3xl shadow-sm px-6">
            <Package size={48} className="text-gray-200 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 font-medium mb-10">You haven't placed any orders yet. Start exploring our premium hardware catalog.</p>
            <Link to="/shop">
              <button className="bg-[#007185] hover:bg-[#005a6a] text-white px-10 py-3.5 font-bold rounded-xl transition-all shadow-lg shadow-[#007185]/20 active:scale-95">
                Browse Shop
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={order.id} 
                className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group"
              >
                {/* Order Header */}
                <div className="p-6 md:p-8 border-b border-gray-50 bg-[#fcfcfc] flex flex-wrap items-center justify-between gap-8">
                  <div className="flex items-center gap-8">
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Order Reference</p>
                      <h3 className="text-[15px] font-bold text-gray-900 uppercase tracking-tight">#PFX-{order.order_code || order.id}</h3>
                    </div>
                    <div className="hidden sm:block space-y-1">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Placed On</p>
                      <p className="text-[14px] font-bold text-gray-700">{new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 border",
                      order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      order.status === 'pending' ? "bg-amber-50 text-amber-600 border-amber-100" :
                      "bg-blue-50 text-[#007185] border-blue-100"
                    )}>
                      <div className={cn("h-1.5 w-1.5 rounded-full", 
                        order.status === 'completed' || order.status === 'delivered' ? "bg-emerald-500" :
                        order.status === 'pending' ? "bg-amber-500" : "bg-[#007185] animate-pulse"
                      )} />
                      {order.status}
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
                      <p className="text-2xl font-black text-gray-900 tracking-tighter">${parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-10 md:gap-16">
                  <div className="flex-1 space-y-6">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6 group/item pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                        <div className="h-20 w-20 bg-[#f9f9f9] rounded-2xl border border-gray-100 flex items-center justify-center p-3 shrink-0 group-hover/item:border-[#007185]/30 transition-all">
                          <img 
                            src={item.images ? (typeof item.images === 'string' ? JSON.parse(item.images)[0] : item.images[0]) : ''} 
                            className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform group-hover/item:scale-110" alt="" 
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[15px] font-bold text-gray-900 truncate leading-tight mb-1">{item.product_name}</h4>
                          <div className="flex items-center gap-4">
                             <span className="text-[13px] font-medium text-gray-500">Qty: {item.quantity}</span>
                             <span className="text-[14px] font-bold text-gray-900">${parseFloat(item.price).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Delivery Info */}
                  <div className="md:w-[320px] space-y-8 md:border-l md:border-gray-100 md:pl-10">
                    <div className="space-y-6">
                       <div className="space-y-3">
                          <div className="flex items-center gap-3 text-gray-900">
                             <MapPin size={18} className="text-[#007185]" />
                             <h4 className="text-[13px] font-bold uppercase tracking-widest">Delivery Hub</h4>
                          </div>
                          <p className="text-[14px] font-medium text-gray-500 leading-relaxed pl-7">
                            {order.address}, {order.city}<br />
                            {order.zipCode || 'United States'}
                          </p>
                       </div>
                       
                       <button 
                        onClick={() => setSelectedOrder(order)}
                        className="w-full h-13 bg-[#131921] hover:bg-black text-white flex items-center justify-center gap-3 text-[13px] font-bold rounded-xl transition-all active:scale-95"
                      >
                        Track Status <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Tracking Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSelectedOrder(null)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white z-[1001] shadow-2xl rounded-[2.5rem] p-8 md:p-12"
              >
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Track Shipment</h2>
                    <p className="text-[13px] font-medium text-gray-500 mt-1">Ref: #PFX-{selectedOrder.id}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all active:scale-90">
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>

                <div className="relative space-y-10 py-2">
                  <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-100" />

                  {statusMap.map((step, idx) => {
                    const isCompleted = getStatusIndex(selectedOrder.status) >= idx;
                    const isActive = selectedOrder.status === step.key;
                    const Icon = step.icon;

                    return (
                      <div key={step.key} className="relative flex gap-8">
                        <div className={cn(
                          "h-10 w-10 rounded-full z-10 transition-all duration-500 flex items-center justify-center",
                          isCompleted ? 'bg-[#007185] text-white shadow-lg shadow-[#007185]/30' : 'bg-white border-2 border-gray-100 text-gray-300'
                        )}>
                          <Icon size={18} className={isActive ? 'animate-pulse' : ''} />
                        </div>
                        
                        <div className="flex-1 py-0.5">
                          <h4 className={cn(
                            "text-[15px] font-bold transition-colors duration-500",
                            isCompleted ? 'text-gray-900' : 'text-gray-300'
                          )}>
                            {step.label}
                          </h4>
                          <p className={cn(
                            "text-[13px] font-medium mt-0.5 transition-colors duration-500",
                            isCompleted ? 'text-gray-500' : 'text-gray-300'
                          )}>
                            {step.desc}
                          </p>
                          {isActive && (
                            <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-[#007185]/10 text-[#007185] rounded-full text-[10px] font-bold uppercase tracking-wider">
                              <div className="h-1.5 w-1.5 bg-[#007185] rounded-full animate-ping" />
                              Current Phase
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-2">
                    <Package size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">MrPrinterPro Logistics</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest">Standard Dispatch</span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
