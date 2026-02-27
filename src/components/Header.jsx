import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import API_BASE_URL from '../config';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  ChevronDown,  X,
  Menu,
  MapPin,
  LayoutGrid,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
  Package,
  Printer,
  Box,
  Home,
  Mail,
  HelpCircle,
  Activity,
  ShoppingBasket,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [hoveredParent, setHoveredParent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const saveSearch = (query) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const pRes = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}&limit=6`);
          const pData = await pRes.json();
          
          const filteredProds = (pData.status === 'success' ? pData.data : []).filter(p => 
            !p.name.toLowerCase().includes('laptop') && 
            !p.name.toLowerCase().includes('chromebook')
          );

          const matchedCats = categories.flatMap(parent => [parent, ...(parent.children || [])])
            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 4);

          setSuggestions({
            products: filteredProds,
            categories: matchedCats
          });
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions({ products: [], categories: [] });
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, categories]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      saveSearch(searchQuery.trim());
      const categoryParam = selectedCategory !== 'All' ? `&category=${selectedCategory}` : '';
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}${categoryParam}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          const filtered = data.data.filter(cat => 
            !cat.name.toLowerCase().includes('laptop') && 
            !cat.slug.toLowerCase().includes('laptop') &&
            !cat.name.toLowerCase().includes('chromebook')
          );
          setCategories(filtered);
          if (filtered.length > 0) setHoveredParent(filtered[0].id);
        }
      });

    const allowedBrands = ["brother", "canon", "epson", "hp", "lexmark", "xerox"];
    fetch(`${API_BASE_URL}/brands`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          setBrands(data.data.filter(b => allowedBrands.includes(b.name.trim().toLowerCase())));
        }
      });

    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUser(parsedUser && parsedUser.role !== 'admin' ? parsedUser : null);
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const activeParent = categories.find(c => String(c.id) === String(hoveredParent));
  const subCategoriesToDisplay = activeParent?.children || [];

  return (
    <>
    <header className="fixed top-0 left-0 w-full z-[100] font-sans border-b border-gray-100">
      
      {/* --- TOP ROW: CLEAN WHITE BRAND STYLE --- */}
      <div className="bg-white text-gray-900 py-1 px-4 md:px-6">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between h-14 gap-4">
          
          <div className="flex items-center gap-2">
            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 border border-transparent hover:border-gray-200 transition-all rounded-sm text-gray-700"
            >
              <Menu size={24} />
            </button>

            {/* Logo & Subsidiary Tagline */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center p-2 border border-transparent hover:border-gray-100 transition-all rounded-sm shrink-0">
                <img src="/logo/mr-logo.png" alt="MrPrinterPro" className="h-10 md:h-12 w-auto object-contain" />
              </Link>
              <div className="h-10 w-px bg-gray-200 hidden sm:block" />
              <div className="hidden sm:flex flex-col justify-center leading-tight">
                <span className="text-[8px] font-medium text-gray-400 uppercase tracking-[0.2em]">A Subsidiary of</span>
                <span className="text-[12px] font-bold text-gray-900 tracking-wide">PrimeFix Solutions</span>
              </div>
            </div>
          </div>

          {/* Search Bar - Centered & Narrower */}
          <div className="flex-1 max-w-xl hidden md:block relative group" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#007185]/20 transition-all bg-gray-50 border border-gray-200">
              <div className="flex items-center px-3 border-r border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors relative">
                <select 
                  className="bg-transparent text-[12px] text-gray-700 appearance-none outline-none pr-5 cursor-pointer h-full font-medium"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2 pointer-events-none text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search MrPrinterPro..."
                className="flex-1 px-4 text-[14px] text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-[#007185] hover:bg-[#005a6a] text-white px-5 transition-colors flex items-center justify-center">
                <Search size={20} strokeWidth={3} />
              </button>
            </form>

            <AnimatePresence>
              {searchQuery.trim() && suggestions.products.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 0 }}
                  className="absolute top-full left-0 w-full bg-white mt-1 shadow-2xl border border-gray-200 z-[110] max-h-[400px] overflow-y-auto rounded-sm"
                >
                  {suggestions.products.map((p) => (
                    <Link 
                      key={p.id} to={`/product/${p.slug}`} onClick={() => setSearchQuery('')}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                    >
                      <div className="h-10 w-10 shrink-0 p-1 bg-white border border-gray-100">
                        <img src={p.images ? (typeof p.images === 'string' ? JSON.parse(p.images)[0] : p.images[0]) : ''} className="w-full h-full object-contain" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[13px] text-gray-900 font-medium truncate block">{p.name}</span>
                        <span className="text-[12px] text-[#007185] font-bold block">${p.price}</span>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Icons Only */}
          <div className="flex items-center gap-2">
            
            {/* Account Icon */}
            <div className="relative group/account">
              <Link to={user ? "/profile" : "/login"} className="p-2 border border-transparent hover:border-gray-100 transition-all rounded-sm block">
                <div className="flex items-center gap-1">
                  <User size={24} className="text-gray-700" />
                  <ChevronDown size={14} className="text-gray-400 mt-1 hidden sm:block" />
                </div>
              </Link>
              
              <div className="absolute top-full right-0 pt-2 hidden group-hover/account:block w-48 z-[110]">
                <div className="bg-white border border-gray-200 shadow-xl text-black rounded-sm overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-[12px] font-bold text-gray-500 uppercase">Account</p>
                    {user && <p className="text-[13px] font-bold truncate mt-1">{user.name}</p>}
                  </div>
                  <div className="p-2 flex flex-col gap-1">
                    <Link to="/profile" className="block px-3 py-1.5 text-[13px] hover:bg-gray-50 text-gray-700 font-medium">Your Profile</Link>
                    <Link to="/orders" className="block px-3 py-1.5 text-[13px] hover:bg-gray-50 text-gray-700 font-medium">Your Orders</Link>
                    <Link to="/wishlist" className="block px-3 py-1.5 text-[13px] hover:bg-gray-50 text-gray-700 font-medium">Wishlist</Link>
                    {user ? (
                      <button onClick={handleLogout} className="w-full text-left px-3 py-1.5 text-[13px] border-t border-gray-100 mt-1 text-red-600 font-bold">Sign Out</button>
                    ) : (
                      <Link to="/login" className="block px-3 py-1.5 font-bold text-[#007185]">Sign In</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Icon */}
            <button onClick={openCartDrawer} className="p-2 border border-transparent hover:border-gray-100 transition-all rounded-sm relative group">
              <div className="relative">
                <span className="absolute -top-1 -right-1 bg-[#007185] text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
                <ShoppingCart size={24} className="text-gray-700" />
              </div>
            </button>

            {/* Search Icon (Mobile Only) */}
            <button className="md:hidden p-2 text-gray-700">
              <Search size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM ROW: CLEAN WHITE NAV STYLE --- */}
      <div className="bg-[#fcfcfc] text-gray-700 h-10 flex items-center px-4 md:px-6 shadow-sm">
        <div className="max-w-[1920px] mx-auto w-full flex items-center gap-1 md:gap-4 overflow-x-auto no-scrollbar">
          
          {/* All Menu Button */}
          <button 
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsSidebarOpen(true);
              }
            }}
            onMouseEnter={() => {
              if (window.innerWidth >= 1024) {
                setActiveDropdown('categories');
              }
            }}
            className="flex items-center gap-1 px-2 py-1.5 border border-transparent hover:bg-gray-100 rounded-sm shrink-0 font-extrabold text-[14px] transition-all text-gray-900"
          >
            <Menu size={22} />
            <span>All</span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 md:gap-1 text-[14px]">
            {[
              { name: 'Home', path: '/' },
              { name: 'Store', path: '/shop' },
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' },
              { name: 'FAQ', path: '/faq' }
            ].map((link) => (
              <Link 
                key={link.name} to={link.path} 
                className={cn(
                  "px-3 py-1.5 border border-transparent hover:bg-gray-100 rounded-sm transition-all whitespace-nowrap",
                  location.pathname === link.path ? "font-extrabold text-[#007185]" : "font-semibold text-gray-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* HP Partner Badge */}
          <div className="hidden md:flex items-center px-4 py-1.5 bg-white border border-gray-200 rounded-full transition-all shrink-0 ml-auto shadow-sm">
             <img src="/brands/hp.png" alt="HP" className="h-5 w-auto object-contain mr-2" />
             <span className="text-[11px] font-black text-[#007185] tracking-tight uppercase">Authorized HP Partner</span>
          </div>

        </div>
      </div>

      {/* --- MEGA MENU --- */}
      <AnimatePresence>
        {activeDropdown === 'categories' && (
          <motion.div 
            ref={dropdownRef}
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            onMouseLeave={() => setActiveDropdown(null)}
            className="absolute top-full left-0 w-full bg-white border-t border-gray-200 z-[90] shadow-2xl text-black"
          >
            <div className="max-w-[1920px] mx-auto flex min-h-[400px]">
              
              <div className="w-[280px] bg-[#f3f3f3] py-6 border-r border-gray-200">
                <p className="text-[12px] font-bold text-gray-500 uppercase px-8 mb-4">Shop by Category</p>
                <div className="space-y-0.5">
                  {categories.map(parent => (
                    <div 
                      key={parent.id} onMouseEnter={() => setHoveredParent(parent.id)}
                      className={cn(
                        "group flex items-center justify-between px-8 py-3 cursor-pointer transition-all",
                        String(hoveredParent) === String(parent.id) ? "bg-white text-[#007185]" : "text-gray-700 hover:bg-white"
                      )}
                    >
                      <span className="text-[14px] font-medium">{parent.name}</span>
                      <ChevronRight size={16} className={cn("text-gray-400", String(hoveredParent) === String(parent.id) ? "text-[#007185]" : "")} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 p-10 bg-white">
                <div className="mb-8 border-b border-gray-100 pb-4 flex justify-between items-center">
                   <h4 className="text-2xl font-bold text-gray-800">{activeParent?.name || 'Category'}</h4>
                   <Link to={`/shop?category=${activeParent?.slug}`} onClick={() => setActiveDropdown(null)} className="text-[14px] text-[#007185] hover:text-[#005a6a] hover:underline">See all {activeParent?.name}</Link>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {subCategoriesToDisplay.map((sub) => (
                    <Link 
                      key={sub.id} to={`/shop?category=${sub.slug}`} onClick={() => setActiveDropdown(null)}
                      className="group flex flex-col gap-1"
                    >
                      <span className="text-[14px] text-gray-700 hover:text-[#007185] hover:underline font-medium">{sub.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="w-[320px] p-8 border-l border-gray-100 bg-gray-50">
                 <p className="text-[12px] font-bold text-gray-500 uppercase mb-6">Popular Brands</p>
                 <div className="grid grid-cols-2 gap-3">
                    {brands.map(brand => (
                      <Link 
                        key={brand.id} to={`/shop?brand=${encodeURIComponent(brand.name)}`} onClick={() => setActiveDropdown(null)}
                        className="px-3 py-2 bg-white border border-gray-200 rounded-sm text-[13px] text-center hover:border-[#007185] transition-all"
                      >
                        {brand.name}
                      </Link>
                    ))}
                 </div>
                 
                 <div className="mt-10 p-6 bg-[#131921] rounded-md text-white">
                    <p className="text-[11px] text-[#007185] font-bold uppercase mb-1">MrPrinterPro Premium</p>
                    <h5 className="text-[18px] font-bold mb-4">Fast delivery on premium printers</h5>
                    <Link to="/shop" onClick={() => setActiveDropdown(null)} className="inline-block bg-[#007185] text-white px-4 py-2 rounded-sm text-[13px] font-bold hover:bg-[#005a6a]">Explore Shop</Link>
                 </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* --- MOBILE SIDEBAR --- */}
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[200] bg-black/60 xl:hidden" />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 left-0 h-full w-[280px] md:w-[350px] bg-white z-[210] xl:hidden flex flex-col font-sans">
            <div className="bg-[#131921] text-white p-4 flex items-center gap-3">
              <User size={24} className="bg-white text-[#131921] rounded-full p-1" />
              <span className="text-[18px] font-bold">Hello, {user ? user.name.split(' ')[0] : 'Sign In'}</span>
              <button onClick={() => setIsSidebarOpen(false)} className="ml-auto text-white"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="py-4 border-b border-gray-200">
                <p className="px-6 py-2 text-[18px] font-bold text-gray-900">Trending</p>
                <Link to="/shop" onClick={() => setIsSidebarOpen(false)} className="block px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Best Sellers</Link>
                <Link to="/shop" onClick={() => setIsSidebarOpen(false)} className="block px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-100">New Releases</Link>
                <Link to="/shop" onClick={() => setIsSidebarOpen(false)} className="block px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Movers & Shakers</Link>
              </div>

              <div className="py-4 border-b border-gray-200">
                <p className="px-6 py-2 text-[18px] font-bold text-gray-900">Shop By Category</p>
                {categories.map(cat => (
                  <Link key={cat.id} to={`/shop?category=${cat.slug}`} onClick={() => setIsSidebarOpen(false)} className="flex items-center justify-between px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-100">
                    {cat.name}
                    <ChevronRight size={18} className="text-gray-400" />
                  </Link>
                ))}
              </div>

              <div className="py-4">
                <p className="px-6 py-2 text-[18px] font-bold text-gray-900">Help & Settings</p>
                <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="block px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Your Account</Link>
                <Link to="/faq" onClick={() => setIsSidebarOpen(false)} className="block px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Customer Service</Link>
                {user ? (
                  <button onClick={handleLogout} className="w-full text-left px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-100 font-bold">Sign Out</button>
                ) : (
                  <Link to="/login" onClick={() => setIsSidebarOpen(false)} className="block px-6 py-3 text-[14px] text-gray-700 hover:bg-gray-100">Sign In</Link>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
