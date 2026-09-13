import React, { useState, useEffect } from 'react';
import { Coffee, ShoppingBag, Truck, Menu, X, Search, Phone, MapPin, Heart } from 'lucide-react';
import { BRAND_INFO } from '../data/reviewsAndExperience';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenTracking: () => void;
  savedFavoritesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  onOpenTracking,
  savedFavoritesCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'products', label: 'Produk Kopi' },
    { id: 'about', label: 'Tentang Kami' },
    { id: 'experience', label: 'Customer Experience' },
    { id: 'tracking', label: 'Lacak Pesanan' },
    { id: 'contact', label: 'Kontak Kami' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'tracking') {
      onOpenTracking();
    } else {
      onNavigate(id);
    }
  };

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="bg-[#24150e] text-[#e8d5c4] text-xs py-2 px-4 border-b border-[#3d251a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Roastery Dago Bandung: Fresh Roasting Setiap Hari • Free Ongkir Bandung Area</span>
          </div>
          <div className="flex items-center gap-4 text-[#cfb29b]">
            <a 
              href={BRAND_INFO.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WA: {BRAND_INFO.phone}</span>
            </a>
            <span className="hidden md:inline text-amber-500/40">|</span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Dago, Bandung</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav 
        className={`px-4 lg:px-8 py-3.5 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#faf6f0]/95 backdrop-blur-md shadow-md border-b border-[#e8dccc]' 
            : 'bg-[#faf6f0] border-b border-[#ede2d2]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <button 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4a2818] to-[#1f0f09] text-amber-200 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-amber-900/30">
              <Coffee className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-display font-bold text-2xl tracking-tight text-[#2c1810]">
                  Peavey<span className="text-[#a85025]">.</span>Coffee
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest bg-[#ede0cf] text-[#6d3e23] px-2 py-0.5 rounded-full">
                  Nusantara
                </span>
              </div>
              <p className="text-[11px] text-[#7a5843] font-medium tracking-tight">
                Authentic Indonesian Roastery • Dago
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  id={`nav-link-${link.id}`}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 relative ${
                    isActive
                      ? 'text-[#963f17] bg-[#f0e3d3]'
                      : 'text-[#523526] hover:text-[#963f17] hover:bg-[#f5ecdf]'
                  }`}
                >
                  {link.label}
                  {link.id === 'tracking' && (
                    <span className="inline-block ml-1.5 w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#963f17] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Real-time Tracking Quick Button */}
            <button
              onClick={onOpenTracking}
              id="header-tracking-btn"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#f0e4d4] text-[#5e3825] hover:bg-[#e6d5c2] border border-[#e2d0bd] transition-colors"
              title="Lacak status pengiriman pesanan kamu"
            >
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              <span>Lacak Resi</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              id="header-cart-btn"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#381e13] text-[#faede1] hover:bg-[#2a150c] shadow-sm hover:shadow transition-all duration-200"
              aria-label="Buka Keranjang Belanja"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline text-xs font-bold tracking-wide">Keranjang</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[11px] font-bold rounded-full bg-amber-500 text-[#24130b]">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="lg:hidden p-2 rounded-lg text-[#3d2317] hover:bg-[#ede0d0] transition-colors"
              aria-label="Toggle menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#e8dccc] pb-2 space-y-1 animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-[#ebdcd0] text-[#963f17]'
                    : 'text-[#4d2f20] hover:bg-[#f3e7da]'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'tracking' && (
                  <span className="text-[11px] px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
                    Live Tracking
                  </span>
                )}
              </button>
            ))}
            <div className="pt-2 border-t border-[#ede2d2] px-3 flex flex-col gap-2">
              <a
                href={BRAND_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2 px-3 rounded-lg bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                Chat WhatsApp ({BRAND_INFO.phone})
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
