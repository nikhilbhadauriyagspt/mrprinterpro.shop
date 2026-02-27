import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopByCategory({ categories = [] }) {
  const subcategories = categories
    .filter(parent => 
      !parent.name.toLowerCase().includes('laptop') && 
      !parent.slug.toLowerCase().includes('laptop') &&
      !parent.name.toLowerCase().includes('chromebook')
    )
    .flatMap(parent => parent.children || [])
    .filter(sub => 
      !sub.name.toLowerCase().includes('laptop') && 
      !sub.slug.toLowerCase().includes('laptop') &&
      !sub.name.toLowerCase().includes('chromebook')
    );

  const getImagePath = (image) => {
    if (image) return `/${image}`;
    return `https://via.placeholder.com/400x400?text=Category`;
  };

  return (
    <section className="py-12 bg-white font-sans border-b border-gray-100">
      <div className="w-full px-4 md:px-10 lg:px-16">
        
        {/* Full Width Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-gray-100 pb-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#111] tracking-tighter">
              Explore by <span className="text-[#007185]">Category</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
             <Link to="/shop" className="hidden sm:block text-[15px] font-bold text-[#007185] hover:text-[#c45500] hover:underline transition-all">
                View Entire Collection
             </Link>
          </div>
        </div>

        {/* Full Width Slider - Fixed 5 items per view */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1.5}
            navigation={{
              prevEl: '.cat-prev-btn',
              nextEl: '.cat-next-btn',
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 }, // Exactly 5 categories on large screens
            }}
            className="!py-4 !static"
          >
            {subcategories.map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={`/shop?category=${item.slug}`} className="flex flex-col items-center gap-6 group/item">
                  {/* Circular Container - Scaled for 5 per view */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56">
                    {/* Background Circle */}
                    <div className="absolute inset-0 rounded-full bg-[#f9f9f9] border border-gray-100 transition-all duration-500 group-hover/item:bg-white group-hover/item:border-orange-400 group-hover/item:shadow-[0_10px_40px_rgba(231,118,0,0.1)]" />
                    
                    {/* Image */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10 lg:p-12 overflow-hidden">
                      <img 
                        src={getImagePath(item.image)} 
                        alt={item.name}
                        className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover/item:scale-110"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=" + item.name; }}
                      />
                    </div>
                  </div>

                  {/* High Visibility Label */}
                  <div className="text-center space-y-1">
                    <span className="block text-[16px] md:text-[18px] font-extrabold text-gray-900 transition-colors group-hover/item:text-[#c45500]">
                      {item.name}
                    </span>
                    <span className="text-[12px] font-bold text-[#007185] opacity-0 group-hover/item:opacity-100 transition-all uppercase tracking-widest">
                      Explore Now
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Floating Navigation Arrows - Matching BestSellers style */}
          <button className="cat-prev-btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 h-12 w-12 bg-white border border-gray-300 shadow-md rounded-sm flex items-center justify-center hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft size={28} className="text-gray-700" />
          </button>
          <button className="cat-next-btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 h-12 w-12 bg-white border border-gray-300 shadow-md rounded-sm flex items-center justify-center hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight size={28} className="text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
