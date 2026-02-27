import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import { HelpCircle, Search, Plus, Mail, ChevronRight, MapPin, ShieldCheck, X } from 'lucide-react';
import { cn } from '../lib/utils';

const faqData = [
  {
    category: "Orders & Purchasing",
    questions: [
      { q: "How do I place an order on MrPrinterPro?", a: "Simply browse our products, add your items to the cart, and complete the checkout using your preferred payment method." },
      { q: "Do I need an account to purchase?", a: "No. You can checkout as a guest. However, creating an account helps you track orders and access your purchase history." },
      { q: "How can I check my order status?", a: "Log into your account and visit My Orders to view real-time updates. You will also receive email notifications." },
      { q: "Can I modify or cancel my order after placing it?", a: "Orders can be modified or canceled before shipping. Once the item is dispatched, cancellations aren’t possible." },
      { q: "What payment methods do you accept?", a: "We accept major credit/debit cards (Visa, Mastercard), PayPal, and other secure digital payment options." },
      { q: "Is shopping on MrPrinterPro secure?", a: "Yes. All transactions are encrypted and processed through verified, PCI-compliant payment networks including PayPal Secure." }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      { q: "What are your shipping options?", a: "We offer standard and expedited shipping across the USA, depending on your location." },
      { q: "Do you deliver nationwide?", a: "Yes, we ship to all 50 states, including business addresses." },
      { q: "How long does delivery take?", a: "Delivery typically takes 3–7 business days, based on your region and order volume." },
      { q: "How much does shipping cost?", a: "Shipping charges vary by product weight, location, and delivery speed." },
      { q: "Will I receive a tracking number?", a: "Yes. You’ll receive a tracking link via email as soon as your order ships." }
    ]
  },
  {
    category: "Products & Warranty",
    questions: [
      { q: "Are your products genuine and covered under warranty?", a: "Yes. All products are 100% genuine and come with an official manufacturer's warranty." },
      { q: "Do you sell only HP products or other brands too?", a: "We are an Authorized HP Partner, but we also sell printers and accessories from other trusted brands." },
      { q: "How can I choose the right printer?", a: "You can contact our expert support for personalized buying recommendations based on your usage and budget." },
      { q: "What if an item is out of stock?", a: "You can join the Back in Stock alert on the product page, and we’ll notify you as soon as it becomes available." }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      { q: "What is your return policy?", a: "We accept returns for eligible products within 7–14 days of delivery, depending on the item category." },
      { q: "How do I request a return or replacement?", a: "Submit a request through your My Orders section or contact our support team." },
      { q: "How long does a refund take?", a: "Refunds are processed within 5–7 business days after inspection." }
    ]
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = faqData.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans">
      <SEO 
        title="FAQ Support Hub | MrPrinterPro" 
        description="Find answers to common questions about orders, shipping, products, and professional support."
      />
      
      {/* --- CLEAN WHITE PAGE HEADER --- */}
      <div className="bg-white py-16 md:py-24 px-4 md:px-10 lg:px-16 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1 w-8 bg-[#007185] rounded-full" />
                <span className="text-[12px] font-bold text-[#007185] uppercase tracking-widest">Support Hub</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                Knowledge <span className="text-[#007185]">Center</span>
              </h1>
              <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                Find expert answers to your questions about professional hardware, shipping, and enterprise support.
              </p>
            </div>

            <div className="w-full max-w-xl">
              <div className="flex bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#007185]/20 focus-within:border-[#007185] transition-all">
                <div className="h-14 w-14 flex items-center justify-center text-gray-400">
                  <Search size={22} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for solutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-14 bg-transparent outline-none text-[15px] font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* --- SIDEBAR NAVIGATION --- */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <div className="p-4 border-b border-gray-50 mb-2">
                <span className="text-[13px] font-bold text-gray-900 uppercase tracking-widest">Categories</span>
              </div>
              <div className="space-y-1">
                {faqData.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => { setActiveCategory(cat.category); setOpenIndex(0); }}
                    className={cn(
                      "w-full text-left px-5 py-4 rounded-xl transition-all font-bold text-[14px] flex items-center justify-between group",
                      activeCategory === cat.category 
                      ? "bg-[#007185] text-white shadow-lg shadow-[#007185]/20" 
                      : "text-gray-500 hover:bg-gray-50 hover:text-[#007185]"
                    )}
                  >
                    {cat.category}
                    <ChevronRight size={16} className={cn("transition-transform", activeCategory === cat.category ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0")} />
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Support Card */}
            <div className="bg-[#131921] p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-6 bg-[#007185]" />
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Need more help?</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-[14px] text-gray-400 font-medium">Email our specialists at:</p>
                  <p className="text-xl font-bold text-white">info@mrprinterpro.shop</p>
                </div>
                <a href="mailto:info@mrprinterpro.shop" className="inline-flex items-center gap-3 bg-[#007185] hover:bg-[#005a6a] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 text-[14px]">
                  <Mail size={18} />
                  Contact Support
                </a>
              </div>
              <HelpCircle size={180} className="absolute -bottom-10 -right-10 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>

          {/* --- ACCORDION CONTENT --- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }} 
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6 px-2">
                   <h2 className="text-3xl font-bold text-gray-900">
                     {activeCategory}
                   </h2>
                </div>
                
                <div className="space-y-4">
                  {filteredData.find(c => c.category === activeCategory)?.questions.map((faq, idx) => (
                    <div 
                      key={idx}
                      className={cn(
                        "bg-white border transition-all duration-300 rounded-2xl overflow-hidden",
                        openIndex === idx ? "border-[#007185] shadow-xl shadow-[#007185]/5" : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <button
                        onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                        className="w-full px-6 py-6 md:px-8 md:py-8 flex items-center justify-between text-left group"
                      >
                        <span className={cn(
                          "text-[16px] md:text-[18px] font-bold leading-tight pr-8 transition-colors",
                          openIndex === idx ? "text-[#007185]" : "text-gray-800 group-hover:text-[#007185]"
                        )}>
                          {faq.q}
                        </span>
                        <div className={cn(
                          "h-8 w-8 rounded-full border flex items-center justify-center shrink-0 transition-all",
                          openIndex === idx ? "bg-[#007185] border-[#007185] text-white rotate-180" : "bg-gray-50 border-gray-100 text-gray-400 group-hover:border-[#007185] group-hover:text-[#007185]"
                        )}>
                          <Plus size={18} className={cn("transition-transform duration-300", openIndex === idx && "rotate-45")} />
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {openIndex === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 md:px-8 md:pb-8">
                              <div className="bg-[#f9f9f9] p-6 md:p-8 rounded-xl border-l-4 border-[#007185] text-gray-600 text-[15px] md:text-[16px] font-medium leading-relaxed">
                                <p>{faq.a}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {filteredData.length === 0 && (
                  <div className="py-24 text-center bg-white border border-gray-100 rounded-3xl shadow-sm">
                    <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <X size={32} className="text-[#007185]" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">No Solutions Found</h4>
                    <p className="text-gray-500 font-medium mt-2">Try adjusting your search terms to find what you're looking for.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

