import React from 'react';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';
import { ShieldCheck, Zap, Globe, ArrowRight, Award, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <SEO 
        title="About Our Enterprise | MrPrinterPro" 
        description="Learn about the operational standards and strategic vision behind MrPrinterPro."
      />

      {/* --- LIGHT PREMIUM HERO --- */}
      <section className="relative py-16 lg:py-24 px-4 md:px-10 lg:px-16 bg-[#f9f9f9] border-b border-gray-100 overflow-hidden">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
              <Award size={14} className="text-[#007185]" />
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Authorized Excellence</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Strategic <br />
                <span className="text-[#007185]">Partnerships.</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                Orchestrating high-performance operational ecosystems through precision stewardship and direct authorized hardware channels.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/shop">
                <button className="bg-[#007185] hover:bg-[#005a6a] text-white px-10 py-3.5 font-bold rounded-lg transition-all shadow-lg shadow-[#007185]/10 flex items-center gap-3 text-[15px] uppercase tracking-wider">
                  View Collection
                  <ArrowRight size={18} />
                </button>
              </Link>
              <div className="flex items-center gap-3 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                <img src="/brands/hp.png" alt="HP" className="h-5 w-auto" />
                <div className="h-6 w-px bg-gray-200" />
                <span className="text-[11px] font-bold text-gray-700 uppercase tracking-tight">Authorized HP Partner</span>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden border border-gray-200 shadow-2xl shadow-gray-200/50">
              <img src={banner1} alt="Professional Setup" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CORE VALUES --- */}
      <section className="py-20 lg:py-28 px-4 md:px-10 lg:px-16">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Built on <span className="text-[#007185]">Precision</span></h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">Setting the benchmark for authorized professional hardware acquisition and deployment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck size={28} />, title: "AUTHENTICITY", desc: "Every hardware unit in our repository undergoes rigorous 100% genuine verification protocols.", color: "bg-blue-50" },
              { icon: <Zap size={28} />, title: "PERFORMANCE", desc: "We deliver only the most elite hardware configurations tailored for demanding enterprise workflows.", color: "bg-teal-50" },
              { icon: <Target size={28} />, title: "STRATEGY", desc: "Setting the global standard for professional hardware acquisition and long-term operational success.", color: "bg-indigo-50" }
            ].map((item, i) => (
              <div 
                key={i}
                className="p-8 md:p-10 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center text-[#007185] mb-6 transition-transform group-hover:scale-110 shadow-sm", item.color)}>
                  {item.icon}
                </div>
                <h4 className="text-[18px] font-bold text-gray-900 uppercase tracking-widest mb-3">{item.title}</h4>
                <p className="text-gray-500 text-[15px] font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORPORATE VISION --- */}
      <section className="py-20 bg-[#fafafa] border-y border-gray-100">
        <div className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">Empowering <br /> <span className="text-[#007185]">Global Stewardship.</span></h3>
                <p className="text-gray-600 text-lg font-medium leading-relaxed">
                  MrPrinterPro stands as the primary gateway for enterprise-level technological ecosystems. We don't just sell hardware; we architect solutions that redefine business productivity.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "Official HP Partnership Verification",
                  "Direct Hardware Acquisition Channels",
                  "Relentless Professional Standards",
                  "Strategic Enterprise Planning"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-700 font-bold text-[15px]">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#007185]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    <img src={banner2} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="h-32 bg-[#007185] rounded-2xl flex items-center justify-center p-6 text-white text-center">
                    <p className="text-lg font-bold leading-tight">Innovation in every print layer.</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    <img src={banner3} className="w-full h-full object-cover grayscale" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LIGHT CTA --- */}
      <section className="py-24 px-4 md:px-10 lg:px-16 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-gray-50 border border-gray-100 rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-sm">
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight uppercase">Ready for <span className="text-[#007185]">uninterrupted printing?</span></h2>
              <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">Buy now the best and authentic printers & accessories</p>
              <div className="pt-4">
                <Link to="/shop">
                  <button className="bg-[#007185] hover:bg-[#005a6a] text-white px-12 py-4 font-bold rounded-xl transition-all shadow-lg shadow-[#007185]/10 flex items-center gap-3 mx-auto text-[16px] uppercase tracking-wider active:scale-95">
                    Explore Inventory
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
