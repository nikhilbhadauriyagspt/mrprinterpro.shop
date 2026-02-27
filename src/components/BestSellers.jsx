import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { cn } from "../lib/utils";

import 'swiper/css';

export default function BestSellers({ products = [] }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});

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
    <section className="py-10 bg-white font-sans relative overflow-hidden border-b border-gray-100">
      <div className="w-full px-4 md:px-10 lg:px-16">
        
        {/* --- FULL WIDTH SECTION HEADER --- */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111] tracking-tighter">
            Most Popular <span className="text-[#007185]">Printers</span>
          </h2>
          <Link to="/shop" className="text-[15px] font-bold text-[#007185] hover:text-[#c45500] hover:underline transition-colors">
            View Entire Collection
          </Link>
        </div>

        {/* --- FULL WIDTH PRODUCT CAROUSEL --- */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.5}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{ prevEl: '.bs-prev-btn', nextEl: '.bs-next-btn' }}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
              1536: { slidesPerView: 6 },
            }}
            className="!static"
          >
            {products.slice(0, 15).map((p) => (
                <SwiperSlide key={p.id}>
                  <div className="flex flex-col h-full bg-white group/card p-2">
                    
                    {/* Image Area */}
                    <Link to={`/product/${p.slug}`} className="relative h-[220px] flex items-center justify-center p-4 bg-[#f9f9f9] rounded-xl mb-4 overflow-hidden border border-transparent group-hover/card:border-gray-200 transition-all">
                      <img 
                        src={getImagePath(p.images)} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply group-hover/card:scale-105 transition-transform duration-500" 
                        alt={p.name} 
                      />
                      
                      {/* Quick Wishlist */}
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover/card:opacity-100 transition-opacity"
                      >
                        <Heart size={18} className={cn(isInWishlist(p.id) ? "text-red-500 fill-red-500" : "text-gray-400")} />
                      </button>
                    </Link>

                    {/* Content Area */}
                    <div className="flex flex-col px-1">
                      <Link to={`/product/${p.slug}`} className="mb-2">
                        <h3 className="text-[14px] font-medium text-gray-800 group-hover/card:text-[#007185] line-clamp-2 leading-tight h-10 transition-colors">
                          {p.name}
                        </h3>
                      </Link>

                      <div className="flex flex-col gap-1">
                         <div className="flex items-start text-[#111]">
                            <span className="text-[13px] mt-1 font-medium">$</span>
                            <span className="text-[22px] font-semibold leading-none">{Math.floor(p.price)}</span>
                            <span className="text-[13px] mt-1 font-medium">{(p.price % 1).toFixed(2).split('.')[1]}</span>
                         </div>
                      </div>

                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                        className={cn(
                          "mt-4 w-full py-2 rounded-lg text-[13px] font-medium transition-all transform active:scale-95 border",
                          addedItems[p.id] 
                            ? "bg-green-600 text-white border-green-600" 
                            : "bg-[#007185] hover:bg-[#005a6a] text-white border-[#008ba0]"
                        )}
                      >
                        {addedItems[p.id] ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Floating Navigation Arrows - Clean Style */}
          <button className="bs-prev-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 h-12 w-12 bg-white border border-gray-200 shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft size={28} className="text-gray-700" />
          </button>
          <button className="bs-next-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 h-12 w-12 bg-white border border-gray-200 shadow-xl rounded-full flex items-center justify-center hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight size={28} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
