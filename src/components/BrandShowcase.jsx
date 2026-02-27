import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function BrandShowcase({ brands = [] }) {
  const getBrandLogo = (brand) => {
    if (brand.logo) return brand.logo;
    return `https://ui-avatars.com/api/?name=${brand.name}&background=f8fafc&color=0f172a&bold=true`;
  };

  if (brands.length === 0) return null;

  const marqueeBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-16 lg:py-24 bg-white font-urbanist relative overflow-hidden border-b border-slate-200">
      
      <div className="max-w-[1920px] mx-auto relative z-10">
        
        {/* --- FULL WIDTH SECTION HEADER --- */}
        <div className="px-4 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-100 pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111] tracking-tighter">
              Authorized <span className="text-[#007185]">Partnerships</span>
            </h2>
          </div>
          
          <div className="hidden md:block">
            <Link to="/shop" className="text-[15px] font-bold text-[#007185] hover:text-[#c45500] hover:underline transition-all">
              View Global Network
            </Link>
          </div>
        </div>

        {/* --- PREMIUM MARQUEE --- */}
        <div className="relative w-full overflow-hidden border-y border-gray-50 bg-[#f9f9f9] py-16">
          <div className="animate-marquee-slow flex items-center gap-12 whitespace-nowrap px-4">
            {marqueeBrands.map((brand, i) => (
              <Link 
                key={`${brand.id}-${i}`}
                to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                className="group shrink-0"
              >
                <div className="h-32 w-64 bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:border-[#007185] hover:shadow-xl relative overflow-hidden">
                  {/* Subtle Top Indicator */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-[#007185] transition-all duration-500 group-hover:w-full" />
                  
                  <div className="h-14 w-36 relative z-10 flex items-center justify-center">
                    <img 
                      src={getBrandLogo(brand)} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-110" 
                    />
                  </div>
                  
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest transition-colors group-hover:text-[#007185]">
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
