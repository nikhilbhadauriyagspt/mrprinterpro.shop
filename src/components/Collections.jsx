import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// Import local assets
import printerCat from "@/assets/category/printer_cat.jpg";

export default function Collections() {
  return (
    <section className="relative w-full bg-[#131921] overflow-hidden font-sans border-y border-gray-800">
      
      <div className="w-full px-4 md:px-10 lg:px-16 flex flex-col md:flex-row items-stretch min-h-[350px] md:h-[450px]">
        
        {/* --- LEFT: CONTENT (60% width on Desktop) --- */}
        <div className="flex-[1.2] p-8 md:p-16 flex flex-col justify-center relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl space-y-6 md:space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
              Elite <span className="text-[#febd69]">Performance.</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-lg font-medium leading-relaxed max-w-lg">
              Experience superior efficiency with our curated range of enterprise-grade hardware, specifically engineered to optimize your business workflows.
            </p>
          </div>

          <div className="pt-2">
            <Link to="/shop?category=printers">
              <button className="bg-[#007185] hover:bg-[#005a6a] text-white px-10 py-3 font-bold rounded-lg transition-all flex items-center gap-3 text-[14px] uppercase tracking-wider active:scale-95 border border-[#008ba0]">
                Explore Collection
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </motion.div>
        </div>

        {/* --- RIGHT: PRODUCT IMAGE (40% width, fully visible) --- */}
        <div className="flex-1 relative flex items-center justify-center p-6 md:p-12">
          {/* Subtle background glow to make the image pop */}
          <div className="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img 
              src={printerCat} 
              className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              alt="Elite Performance Printer"
            />
          </motion.div>
        </div>

      </div>

    </section>
  );
}
