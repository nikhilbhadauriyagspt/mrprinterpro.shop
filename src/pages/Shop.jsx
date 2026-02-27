import { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  ChevronDown, 
  X,
  Loader2,
  Check,
  SlidersHorizontal,
  ShoppingBag,
  Heart,
  LayoutGrid,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';
import { cn } from '../lib/utils';

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const { category: pathCategory, brand: pathBrand } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const category = searchParams.get('category') || pathCategory || '';
  const brand = searchParams.get('brand') || pathBrand || '';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(d => {
        if (d.status === 'success') {
          const filtered = d.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
        }
      });
    const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
    fetch(`${API_BASE_URL}/brands`).then(res => res.json()).then(d => {
      if (d.status === 'success') {
        setBrands(d.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase())));
      }
    });
  }, []);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }
    if (pathBrand) {
      navigate(`/shop?brand=${encodeURIComponent(pathBrand)}`, { replace: true });
      return;
    }

    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('limit', '1000');
    
    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const filteredProducts = data.data.filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('macbook') && 
            !p.name.toLowerCase().includes('notebook') &&
            !p.name.toLowerCase().includes('chromebook')
          );
          setProducts(filteredProducts);
          setTotal(filteredProducts.length);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams, pathCategory, pathBrand, navigate]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    newParams.set('page', '1');
    navigate(`/shop?${newParams.toString()}`);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0]}`;
    } catch (e) { }
    return "https://via.placeholder.com/400x400?text=No+Image";
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans">
      <SEO 
        title="Official Catalog | MrPrinterPro" 
        description="Browse our authorized collection of premium printers and hardware."
      />
      
      {/* --- CLEAN WHITE PAGE HEADER --- */}
      <div className="bg-white py-16 md:py-20 px-4 md:px-10 lg:px-16 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-[1920px] mx-auto relative z-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1 w-8 bg-[#007185] rounded-full" />
                <span className="text-[12px] font-bold text-[#007185] uppercase tracking-widest">Authorized Inventory</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
                Product <span className="text-[#007185]">Catalog</span>
              </h1>
              <p className="text-gray-500 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                Authorized inventory of enterprise printers and premium hardware systems.
              </p>
            </div>

            <div className="w-full max-w-xl">
              <div className="flex bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#007185]/20 focus-within:border-[#007185] transition-all">
                <input 
                  type="text" 
                  placeholder="Search by model or specification..."
                  value={search}
                  onChange={(e) => updateFilter('search', e.target.value)}
                  className="flex-1 h-14 px-6 text-base text-gray-900 bg-transparent outline-none"
                />
                <button type="submit" onClick={(e) => { e.preventDefault(); updateFilter('search', search); }} className="h-14 px-8 bg-[#007185] text-white hover:bg-[#005a6a] transition-colors flex items-center justify-center">
                  <Search size={22} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FILTER CONTROL BAR (HERO STYLE) --- */}
      <div className="sticky top-[56px] z-[45] bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 px-4 md:px-10 lg:px-16 shadow-sm">
        <div className="max-w-[1920px] mx-auto flex flex-wrap items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "h-11 px-6 flex items-center gap-3 text-[13px] font-bold uppercase tracking-tight transition-all rounded-lg border",
                isFilterOpen 
                  ? "bg-[#007185] text-white border-[#007185] shadow-lg shadow-[#007185]/20" 
                  : "bg-white border-gray-200 text-gray-700 hover:border-[#007185] hover:text-[#007185]"
              )}
            >
              <Filter size={18} />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>

            <div className="hidden lg:flex items-center gap-2">
              <AnimatePresence>
                {category && (
                  <button onClick={() => updateFilter('category', '')} className="h-9 px-4 bg-[#007185]/10 border border-[#007185]/20 text-[#007185] text-[11px] font-bold rounded-full flex items-center gap-2 hover:bg-[#007185]/20">
                    {category} <X size={14} />
                  </button>
                )}
                {brand && (
                  <button onClick={() => updateFilter('brand', '')} className="h-9 px-4 bg-gray-100 border border-gray-200 text-gray-700 text-[11px] font-bold rounded-full flex items-center gap-2 hover:bg-gray-200">
                    {brand} <X size={14} />
                  </button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Sort By</span>
                <div className="relative">
                  <select 
                    value={sort} onChange={(e) => updateFilter('sort', e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-[13px] font-bold text-gray-700 appearance-none pr-10 focus:outline-none focus:border-[#007185]"
                  >
                    <option value="newest">Latest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="name_asc">Alphabetical (A-Z)</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
             </div>
             <div className="h-8 w-px bg-gray-200 hidden sm:block" />
             <p className="text-[13px] font-bold text-gray-900">{total} Products Found</p>
          </div>
        </div>

        {/* --- FILTER DRAWER --- */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-gray-100 mt-4">
                
                <div className="space-y-6">
                  <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-3">Collections</h4>
                  <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-4 custom-scrollbar">
                    {categories.map(cat => (
                      <button 
                        key={cat.id} onClick={() => updateFilter('category', cat.slug)}
                        className={cn("w-full text-left px-4 py-2.5 text-[13px] font-medium rounded-lg transition-all", category === cat.slug ? "bg-[#007185] text-white shadow-md" : "text-gray-500 hover:text-[#007185] hover:bg-[#007185]/5")}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-3">Partner Brands</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {brands.map(b => (
                      <button 
                        key={b.id} onClick={() => updateFilter('brand', brand === b.name ? '' : b.name)}
                        className={cn("px-3 py-3 text-[11px] font-bold uppercase border rounded-lg transition-all", brand === b.name ? "bg-[#007185] text-white border-[#007185] shadow-md" : "bg-white border-gray-200 text-gray-500 hover:border-[#007185] hover:text-[#007185]")}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#131921] rounded-2xl p-10 text-white flex flex-col justify-between group relative overflow-hidden">
                   <div className="relative z-10 space-y-4">
                      <LayoutGrid size={40} className="text-[#007185] mb-4 opacity-50 transition-transform duration-700 group-hover:rotate-90" />
                      <h5 className="text-3xl font-bold tracking-tighter leading-tight">Advanced Refinement</h5>
                      <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-sm">Narrow down your selection by category and brand to find the perfect professional hardware for your needs.</p>
                   </div>
                   <button 
                     onClick={() => navigate('/shop')}
                     className="relative z-10 mt-10 w-full py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-[#007185] hover:text-white transition-all shadow-xl"
                   >
                     Clear All Filters
                   </button>
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#007185]/10 rounded-full blur-[80px] -z-0" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- RESULTS GRID --- */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-10 lg:px-16 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-48">
            <Loader2 className="animate-spin h-12 w-12 text-[#007185] mb-6" />
            <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-gray-300">Synchronizing Inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-white border border-gray-100 rounded-3xl shadow-sm px-6">
            <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-8">
               <X size={32} className="text-[#007185]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Matches Found</h2>
            <p className="text-gray-500 font-medium max-w-sm mb-10">We couldn't find any authorized products matching your current refinements.</p>
            <button onClick={() => navigate('/shop')} className="px-10 py-4 bg-[#007185] text-white font-bold rounded-xl hover:bg-[#005a6a] transition-all shadow-lg shadow-[#007185]/20">Clear All Search Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((p, i) => (
              <motion.div 
                key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 5) * 0.05 }}
                className="group relative bg-white border border-gray-100 rounded-2xl p-5 flex flex-col h-full hover:shadow-2xl hover:border-[#007185]/20 transition-all duration-500"
              >
                {/* Wishlist */}
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
                  className={cn(
                    "absolute top-4 right-4 z-20 h-10 w-10 bg-white rounded-full border border-gray-100 shadow-sm transition-all duration-300 flex items-center justify-center hover:scale-110",
                    isInWishlist(p.id) ? "text-red-500 border-red-50" : "text-gray-300 hover:text-red-500"
                  )}
                >
                  <Heart size={18} fill={isInWishlist(p.id) ? "currentColor" : "none"} strokeWidth={2} />
                </button>

                <Link to={`/product/${p.slug}`} className="flex-1 flex flex-col pt-4">
                  <div className="relative h-[200px] mb-6 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50" />
                    <img 
                      src={getImagePath(p.images)} alt={p.name}
                      className="relative z-10 max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=Not+Found"; }}
                    />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{p.brand_name || 'Authentic'}</span>
                    <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#007185] transition-colors line-clamp-2 leading-snug min-h-[40px]">
                      {p.name}
                    </h3>
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-start">
                         <span className="text-[14px] mt-1 font-bold text-gray-900">$</span>
                         <span className="text-[26px] font-black text-gray-900 leading-none tracking-tighter">{Math.floor(p.price)}</span>
                         <span className="text-[14px] mt-1 font-bold text-gray-900">{(p.price % 1).toFixed(2).split('.')[1]}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="mt-6 pt-4 border-t border-gray-50">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(p); }}
                    disabled={addedItems[p.id]}
                    className={cn(
                      "w-full h-11 rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] transition-all transform active:scale-95 border",
                      addedItems[p.id] 
                        ? "bg-green-600 text-white border-green-600" 
                        : "bg-white text-gray-900 border-gray-200 hover:bg-[#007185] hover:text-white hover:border-[#007185] shadow-sm hover:shadow-lg hover:shadow-[#007185]/20"
                    )}
                  >
                    {addedItems[p.id] ? <Check size={18} /> : <ShoppingBag size={18} />}
                    {addedItems[p.id] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
