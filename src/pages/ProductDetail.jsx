import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  ChevronRight, 
  Truck, 
  ShieldCheck, 
  RefreshCcw,
  Loader2,
  Plus,
  Minus,
  Share2,
  Check,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${API_BASE_URL}/products/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
          
          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';
          const brand = data.data.brand_name;
          
          let fetchUrl = `${API_BASE_URL}/products?limit=6`;
          if (categorySlug) {
            fetchUrl += `&category=${categorySlug}`;
          } else if (brand) {
            fetchUrl += `&brand=${brand}`;
          }

          fetch(fetchUrl)
            .then(res => res.json())
            .then(relData => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter(p => p.id !== data.data.id));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map(img => `/${img}`) : [];
    } catch (e) {
      return [];
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfcfc]">
        <Loader2 className="animate-spin h-12 w-12 text-[#007185] mb-6" />
        <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-gray-300">Synchronizing Data...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-[#fcfcfc] px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-500 font-medium mb-10 max-w-sm">The requested item is not available in our authorized repository.</p>
        <Link to="/shop" className="px-10 py-4 bg-[#007185] text-white font-bold rounded-xl hover:bg-[#005a6a] transition-all shadow-lg active:scale-95">Return to Shop</Link>
      </div>
    );
  }

  const images = getImages(product.images);
  const mainImage = images.length > 0 ? images[activeImage] : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans pb-24">
      <SEO 
        title={`${product.name} | MrPrinterPro`} 
        description={product.description?.substring(0, 160)}
      />
      
      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16 py-4">
          <nav className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-gray-400">
            <Link to="/" className="hover:text-[#007185] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-gray-200" />
            <Link to="/shop" className="hover:text-[#007185] transition-colors">Catalog</Link>
            <ChevronRight size={14} className="text-gray-200" />
            <span className="text-[#007185] truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- IMAGE GALLERY --- */}
          <div className="space-y-6">
            <div className="aspect-square bg-white border border-gray-100 rounded-[2.5rem] flex items-center justify-center p-10 md:p-16 relative group shadow-2xl shadow-gray-200/50">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
              />
              <button 
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "absolute top-8 right-8 h-12 w-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-90",
                  isInWishlist(product.id) ? "text-red-500" : "text-gray-300 hover:text-red-500"
                )}
              >
                <Heart size={24} fill={isInWishlist(product.id) ? "currentColor" : "none"} strokeWidth={2} />
              </button>
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-24 w-24 border-2 rounded-2xl flex-shrink-0 flex items-center justify-center p-4 transition-all bg-white overflow-hidden",
                      activeImage === idx ? "border-[#007185] shadow-lg shadow-[#007185]/10" : "border-gray-100 hover:border-gray-300"
                    )}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- PRODUCT INFO --- */}
          <div className="flex flex-col py-2">
            <div className="mb-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="inline-block px-4 py-1 bg-[#007185]/10 text-[#007185] text-[11px] font-bold uppercase tracking-widest rounded-full border border-[#007185]/20">
                  {product.brand_name || 'AUTHENTIC'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tighter">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-5xl lg:text-6xl font-black text-[#007185] tracking-tighter">${product.price.toLocaleString()}</span>
                {product.sale_price && (
                  <span className="text-2xl font-bold text-gray-300 line-through">${product.sale_price.toLocaleString()}</span>
                )}
              </div>

              {product.description && (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                  <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest mb-4">Specifications</h4>
                  <p className="text-gray-600 font-medium leading-relaxed text-[15px] md:text-lg">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            {/* --- ACTIONS --- */}
            <div className="space-y-8 mt-auto pt-10 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Quantity Control */}
                <div className="h-14 flex items-center bg-gray-50 rounded-xl border border-gray-200 overflow-hidden w-full sm:w-auto">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-full w-14 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-lg font-bold w-10 text-center text-gray-900 bg-white h-full flex items-center justify-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-full w-14 flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 border-l border-gray-200"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex-1 h-14 flex items-center justify-center gap-4 font-bold uppercase tracking-widest transition-all rounded-xl shadow-lg active:scale-95",
                    isAdded 
                      ? "bg-emerald-500 text-white shadow-emerald-100" 
                      : "bg-[#007185] hover:bg-[#005a6a] text-white shadow-[#007185]/20"
                  )}
                >
                  {isAdded ? (
                    <><Check size={20} strokeWidth={3} /> Item Added</>
                  ) : (
                    <><ShoppingBag size={20} /> Add to Cart</>
                  )}
                </button>
                
                <button className="h-14 w-14 bg-white text-gray-400 flex items-center justify-center border border-gray-200 rounded-xl hover:text-[#007185] hover:border-[#007185] transition-all active:scale-90">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Guarantees Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-5 bg-white border border-gray-100 rounded-2xl shadow-sm group hover:shadow-md transition-all">
                  <Truck size={24} className="text-[#007185] mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center p-5 bg-white border border-gray-100 rounded-2xl shadow-sm group hover:shadow-md transition-all">
                  <ShieldCheck size={24} className="text-[#007185] mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">1Y Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center p-5 bg-white border border-gray-100 rounded-2xl shadow-sm group hover:shadow-md transition-all">
                  <RefreshCcw size={24} className="text-[#007185] mb-2" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">14D Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 lg:mt-32 pt-16 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-1 w-8 bg-[#007185] rounded-full" />
                  <span className="text-[12px] font-bold text-[#007185] uppercase tracking-widest">Recommended</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                  Related <span className="text-[#007185]">Configurations</span>
                </h3>
              </div>
              <Link to="/shop" className="text-[14px] font-bold text-[#007185] hover:text-[#c45500] hover:underline transition-all">
                View All Related Models
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {relatedProducts.slice(0, 5).map((p, i) => (
                <Link 
                  to={`/product/${p.slug}`} 
                  key={p.id} 
                  className="group bg-white border border-gray-100 rounded-2xl p-5 flex flex-col h-full hover:shadow-xl transition-all duration-500"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="aspect-square flex items-center justify-center p-4 mb-6 bg-[#f9f9f9] rounded-xl overflow-hidden group-hover:bg-white transition-colors duration-500">
                    <img 
                      src={getImagePath(p.images)} 
                      alt={p.name}
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{p.brand_name || 'AUTHENTIC'}</p>
                    <h4 className="text-[15px] font-bold text-gray-900 group-hover:text-[#007185] transition-colors line-clamp-2 leading-tight mb-4">{p.name}</h4>
                    <span className="text-xl font-black text-gray-900 mt-auto tracking-tighter">${p.price.toLocaleString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
