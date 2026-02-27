import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Printer } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

// Assets
import banner1 from "@/assets/bannerr/banner1.jpg";
import banner2 from "@/assets/bannerr/banner2.jpg";
import banner3 from "@/assets/bannerr/banner3.jpg";
import banner4 from "@/assets/bannerr/banner4.jpg";

const slides = [
  {
    id: "NXT-01",
    brand: "Quantum Series",
    tagline: "Enterprise-Grade Performance",
    desc: "Experience the next level of office efficiency with lightning-fast output and advanced security.",
    image: banner1,
    link: "/shop"
  },
  {
    id: "VIS-02",
    brand: "Chroma Master",
    tagline: "Elite Color Fidelity",
    desc: "Achieve museum-grade color accuracy with our wide-gamut ink technology. Gold standard for pros.",
    image: banner2,
    link: "/shop"
  },
  {
    id: "SMR-03",
    brand: "Nimbus Ecosystem",
    tagline: "Intelligent Connectivity",
    desc: "Bridge the gap between digital and physical securely from any device with our wireless ecosystem.",
    image: banner3,
    link: "/shop"
  },
  {
    id: "ULT-04",
    brand: "Titan Heavy-Duty",
    tagline: "Built for Unstoppable Work",
    desc: "Relentless 24/7 duty cycles with a reinforced industrial chassis built for demanding environments.",
    image: banner4,
    link: "/shop"
  }
];

const gridCards = [
  {
    title: "Office Bestsellers",
    items: [
      { label: "Laser Printers", img: "/category/laser-printers.jpg", link: "/shop?category=laser-printers" },
      { label: "Inkjet Models", img: "/category/inkjet-printers.jpg", link: "/shop?category=inkjet-printers" },
      { label: "All-in-One", img: "/category/all-in-one-printers.jpg", link: "/shop?category=all-in-one-printers" },
      { label: "Supertank Series", img: "/category/supertank-printers.jpg", link: "/shop?category=supertank-printers" }
    ],
    footer: "Shop all Office"
  },
  {
    title: "Industrial Power",
    items: [
      { label: "Thermal Printers", img: "/category/thermal-printers.jpg", link: "/shop?category=thermal-printers" },
      { label: "Wide Format", img: "/category/large-format-printers.jpg", link: "/shop?category=large-format-printers" },
      { label: "Dot Matrix", img: "/category/dot-matrix-printers.jpg", link: "/shop?category=dot-matrix-printers" },
      { label: "LED Printing", img: "/category/led-printers.jpg", link: "/shop?category=led-printers" }
    ],
    footer: "Explore Industrial"
  },
  {
    title: "Creative Pro",
    items: [
      { label: "Photo Pro", img: "/category/photo-printers.jpg", link: "/shop?category=photo-printers" },
      { label: "Supplies", img: "/category/printer-accessories.jpg", link: "/shop?category=printer-accessories" },
      { label: "Large Roll Feed", img: "/category/large-format-printers.jpg", link: "/shop?category=large-format-printers" },
      { label: "Fine Art Print", img: "/category/photo-printers.jpg", link: "/shop?category=photo-printers" }
    ],
    footer: "See specialized"
  },
  {
    title: "Trending Now",
    items: [
      { label: "Home Office", img: "/category/all-in-one-printers.jpg", link: "/shop?category=all-in-one-printers" },
      { label: "Essentials", img: "/category/printer-accessories.jpg", link: "/shop?category=printer-accessories" },
      { label: "Smart Printers", img: "/category/laser-printers.jpg", link: "/shop?category=laser-printers" },
      { label: "Thermal Labels", img: "/category/thermal-printers.jpg", link: "/shop?category=thermal-printers" }
    ],
    footer: "View all deals"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full bg-[#EAEDED] font-sans pb-12">
      
      {/* --- HERO SLIDER --- */}
      <div className="relative h-[450px] md:h-[550px] lg:h-[650px] w-full overflow-hidden bg-black">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={slides[current].image} 
              alt={slides[current].brand} 
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/30 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#EAEDED] via-transparent to-transparent z-10" />
          </motion.div>
        </AnimatePresence>

        {/* SIDE ARROWS */}
        <div className="absolute inset-y-0 left-0 right-0 z-[60] flex items-center justify-between px-4 md:px-10 pointer-events-none">
           <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevSlide(); }} className="h-12 w-12 flex items-center justify-center bg-black/10 hover:bg-black/40 text-white rounded-full transition-all border border-white/20 backdrop-blur-sm pointer-events-auto active:scale-90">
              <ChevronLeft size={28} />
           </button>
           <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextSlide(); }} className="h-12 w-12 flex items-center justify-center bg-black/10 hover:bg-black/40 text-white rounded-full transition-all border border-white/20 backdrop-blur-sm pointer-events-auto active:scale-90">
              <ChevronRight size={28} />
           </button>
        </div>

        {/* CONTENT OVERLAY */}
        <div className="absolute top-[12%] md:top-[15%] left-6 md:left-20 right-6 md:right-20 z-30 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex-1 space-y-2 md:space-y-3">
                <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight drop-shadow-lg leading-tight">
                  {slides[current].brand}
                </h2>
                <p className="text-[#00a8c2] text-xl md:text-3xl font-black uppercase drop-shadow-md">
                  {slides[current].tagline}
                </p>
                <p className="text-white/90 text-[14px] md:text-lg font-medium max-w-xl leading-relaxed">
                  {slides[current].desc}
                </p>
              </div>

              <div className="pointer-events-auto">
                <Link to={slides[current].link} className="shrink-0">
                  <button className="bg-[#007185] hover:bg-[#005a6a] text-white px-10 py-3 font-bold rounded-md border border-[#008ba0] transition-all transform hover:-translate-y-1 active:translate-y-0 text-[14px] uppercase tracking-wider shadow-lg">
                    Shop Now
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- GRID CARDS: REVERTED TO 2X2 FULL WIDTH --- */}
      <div className="relative z-40 -mt-24 md:-mt-40 lg:-mt-52 px-4 md:px-10 lg:px-16">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {gridCards.map((card, i) => (
            <div key={i} className="bg-white p-5 shadow-xl flex flex-col h-[420px] rounded-sm transition-all hover:shadow-2xl border border-gray-100">
              <h3 className="text-[21px] font-bold text-[#111] mb-4 leading-tight h-14 overflow-hidden">{card.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
                {card.items.map((item, idx) => (
                  <Link key={idx} to={item.link} className="group flex flex-col gap-1.5">
                    <div className="aspect-square bg-[#f9f9f9] rounded-sm border border-gray-100 flex items-center justify-center p-3 overflow-hidden">
                      <img 
                        src={item.img} 
                        alt={item.label} 
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    <span className="text-[12px] text-gray-700 font-bold group-hover:text-[#007185] leading-tight min-h-[32px] line-clamp-2 transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50">
                <Link to="/shop" className="text-[#007185] text-[13px] font-bold hover:text-[#c45500] hover:underline transition-all">
                  {card.footer}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- SIGN IN STRIP --- */}
        <div className="w-full mt-10">
           <div className="bg-white p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border-t-4 border-[#007185] rounded-sm">
              <div className="flex items-center gap-6">
                 <div className="p-4 bg-[#f9f9f9] rounded-full">
                    <Printer className="text-[#007185]" size={36} />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-[20px] font-bold text-gray-900">Sign in for the best experience</h4>
                    <p className="text-[15px] text-gray-600">Track orders and see personalized deals for your professional printing needs.</p>
                 </div>
              </div>
              <Link to="/login" className="bg-[#007185] hover:bg-[#005a6a] text-white px-16 py-4 rounded-lg text-[15px] font-black border border-[#008ba0] shadow-md transition-all active:scale-95 whitespace-nowrap">
                Sign in securely
              </Link>
           </div>
        </div>
      </div>

    </div>
  );
}
