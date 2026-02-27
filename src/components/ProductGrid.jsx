import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, Check, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useMemo } from "react";
import { cn } from "../lib/utils";

export default function ProductGrid({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const [activeTab, setActiveTab] = useState('ALL');

  const categories = ['ALL', 'PRINTERS', 'INK & TONER', 'ACCESSORIES'];

  const filteredProducts = useMemo(() => {
    if (activeTab === 'ALL') return products.slice(0, 20);
    
    return products.filter(p => {
      const name = p.name.toLowerCase();
      if (activeTab === 'PRINTERS') return name.includes('printer') || name.includes('laserjet');
      if (activeTab === 'INK & TONER') return name.includes('ink') || name.includes('toner');
      if (activeTab === 'ACCESSORIES') return name.includes('cable') || name.includes('adapter') || name.includes('tray');
      return true;
    }).slice(0, 20);
  }, [products, activeTab]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <section className="py-16 bg-[#EAEDED] font-sans relative overflow-hidden border-b border-gray-200">
      <div className="w-full px-4 md:px-10 lg:px-16">
        
        {/* --- CLEAN BOLD SECTION HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8 border-b border-gray-200 pb-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111] tracking-tighter">
              Latest <span className="text-[#007185]">Arrivals</span>
            </h2>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-4">
            {/* Premium Category Tabs */}
            <div className="flex gap-1 p-1 bg-white rounded-lg border border-gray-200 shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    "px-5 py-2 text-[11px] font-bold uppercase transition-all rounded-md",
                    activeTab === cat 
                      ? "bg-[#007185] text-white" 
                      : "text-gray-500 hover:text-gray-900"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <Link to="/shop" className="text-[14px] font-bold text-[#007185] hover:text-[#c45500] hover:underline transition-all">
              View Entire Catalog
            </Link>
          </div>
        </div>

        {/* --- PRODUCT GRID: BOX STYLE (Hero Grid Card Look) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p, i) => (
                <motion.div 
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white p-5 shadow-lg flex flex-col min-h-[420px] group transition-all hover:shadow-2xl border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-[#007185] uppercase tracking-tight">{p.brand_name || 'AUTHENTIC'}</span>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} className={isInWishlist(p.id) ? "text-red-500" : ""} />
                    </button>
                  </div>

                  <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-hidden mb-4 relative">
                      <img 
                        src={getImagePath(p.images)} 
                        alt={p.name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Not+Found"; }}
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[16px] font-bold text-[#111] line-clamp-2 leading-tight h-10 group-hover:text-[#007185] transition-colors">
                        {p.name}
                      </h3>
                      <div className="flex items-start">
                         <span className="text-[13px] mt-1 font-medium text-gray-900">$</span>
                         <span className="text-[24px] font-bold text-gray-900 leading-none">{Math.floor(p.price)}</span>
                         <span className="text-[13px] mt-1 font-medium text-gray-900">{(p.price % 1).toFixed(2).split('.')[1]}</span>
                      </div>
                    </div>
                  </Link>

                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                      disabled={addedItems[p.id]}
                      className={cn(
                        "w-full py-2.5 rounded-md font-bold text-[13px] transition-all transform active:scale-95 border",
                        addedItems[p.id] 
                          ? "bg-green-600 text-white border-green-600" 
                          : "bg-[#007185] text-white border-[#007185] hover:bg-[#005a6a]"
                      )}
                    >
                      {addedItems[p.id] ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
