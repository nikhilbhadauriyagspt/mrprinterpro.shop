import Hero from "@/components/Hero";
import SEO from "@/components/SEO";
import Features from "@/components/Features";
import Collections from "@/components/Collections";
import ShopByCategory from "@/components/ShopByCategory";
import BrandShowcase from "@/components/BrandShowcase";
import ProductGrid from "@/components/ProductGrid";
import CategorySlider from "@/components/CategorySlider";
import BestSellers from "@/components/BestSellers";
import QuickPicks from "@/components/QuickPicks";
import TheVault from "@/components/TheVault";
import PromotionGrid from "@/components/PromotionGrid";
import { Shield, Wrench, ArrowUpRight, Headphones, RefreshCw, ArrowRight, Loader2, ChevronRight, Zap, Globe, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";

export default function Home() {
  const [data, setData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    categories: [],
    brands: [],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch(`${API_BASE_URL}/products?limit=1000`).then(r => r.json()),
          fetch(`${API_BASE_URL}/categories`).then(r => r.json()),
          fetch(`${API_BASE_URL}/brands`).then(r => r.json())
        ]);

        if (prodRes.status === 'success' && catRes.status === 'success' && brandRes.status === 'success') {
          const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
          const filteredBrands = brandRes.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));
          
          const all = prodRes.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          
          const printers = all.filter(p => 
            p.name.toLowerCase().includes('printer') || 
            p.name.toLowerCase().includes('laserjet') || 
            p.name.toLowerCase().includes('pixma')
          );
          const accessories = all.filter(p => 
            p.name.toLowerCase().includes('ink') || 
            p.name.toLowerCase().includes('toner') ||
            p.name.toLowerCase().includes('cable') ||
            p.name.toLowerCase().includes('adapter')
          );

          const shuffled = [...all].sort(() => 0.5 - Math.random());

          setData({
            all,
            printers,
            accessories,
            mixedArrivals: shuffled,
            categories: catRes.data,
            brands: filteredBrands,
            loading: false
          });
        }
      } catch (err) {
        console.error(err);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white font-snpro overflow-x-hidden text-slate-900">
      <SEO 
        title="Authorized HP Partner | Premium Printers & Hardware" 
        description="Premium destination for authorized HP printers, precision systems, and essential accessories. Delivering excellence in professional solutions across the USA."
      />
      
      <Hero />
      <Features />
      <ShopByCategory categories={data.categories} />
      <Collections />
      <BestSellers products={data.all} />
      <BrandShowcase brands={data.brands} />
      <ProductGrid products={data.mixedArrivals.slice(0, 30)} />

      <QuickPicks products={data.all} />

      {/* --- BUSINESS PRODUCTIVITY SHOWCASE: NEW DESIGN --- */}
      <section className="py-20 bg-white font-sans border-b border-gray-100">
        <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16">
          
          {/* Header Area */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-[#111] tracking-tighter">
              Powering <span className="text-[#007185]">Enterprise Productivity</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium">
              Scalable printing solutions and dedicated support designed to keep your business moving forward without interruption.
            </p>
          </div>

          {/* New 3-Column Solution Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Solution 1: Managed Print */}
            <div className="relative group overflow-hidden rounded-2xl bg-[#f9f9f9] border border-gray-100 p-10 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-white hover:border-[#007185]/20">
              <div className="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center mb-8 text-[#007185] group-hover:scale-110 group-hover:bg-[#007185] group-hover:text-white transition-all duration-500">
                <RefreshCw size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Managed Print Services</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                Automated ink replenishment and fleet monitoring to ensure you never run out of critical supplies.
              </p>
              <Link to="/contact" className="mt-auto text-[#007185] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </Link>
            </div>

            {/* Solution 2: System Setup */}
            <div className="relative group overflow-hidden rounded-2xl bg-[#f9f9f9] border border-gray-100 p-10 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-white hover:border-[#007185]/20">
              <div className="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center mb-8 text-[#007185] group-hover:scale-110 group-hover:bg-[#007185] group-hover:text-white transition-all duration-500">
                <Wrench size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Configuration</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                Professional hardware setup and network integration by our team of certified specialists.
              </p>
              <Link to="/contact" className="mt-auto text-[#007185] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Book a Setup <ArrowRight size={18} />
              </Link>
            </div>

            {/* Solution 3: Lifetime Support */}
            <div className="relative group overflow-hidden rounded-2xl bg-[#f9f9f9] border border-gray-100 p-10 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:bg-white hover:border-[#007185]/20">
              <div className="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center mb-8 text-[#007185] group-hover:scale-110 group-hover:bg-[#007185] group-hover:text-white transition-all duration-500">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Extended Protection</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8">
                Comprehensive warranty plans and priority maintenance support for all enterprise-level hardware units.
              </p>
              <Link to="/contact" className="mt-auto text-[#007185] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                Explore Plans <ArrowRight size={18} />
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

