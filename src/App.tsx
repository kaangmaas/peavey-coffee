/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductSection } from './components/ProductSection';
import { AboutUsSection } from './components/AboutUsSection';
import { CustomerExperienceSection } from './components/CustomerExperienceSection';
import { OrderTrackingSection } from './components/OrderTrackingSection';
import { ContactUsSection } from './components/ContactUsSection';
import { PageHeader } from './components/PageHeader';
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { Footer } from './components/Footer';
import { Product, GrindOption, PackageWeight, CartItem, Order } from './types';
import { WEIGHT_OPTIONS } from './data/coffeeProducts';
import { Check, Coffee, ShoppingBag, Truck, Star, Users, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const INITIAL_CART_KEY = 'peavey_cart_items';
const INITIAL_ORDERS_KEY = 'peavey_orders';

export default function App() {
  // Page Routing State: 'beranda' | 'about' | 'experience' | 'tracking' | 'contact'
  const [activeSection, setActiveSection] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['about', 'experience', 'tracking', 'contact'].includes(hash)) {
      return hash;
    }
    return 'beranda';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  // Cart State with LocalStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(INITIAL_CART_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Orders State with LocalStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(INITIAL_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Keep hash in sync with activeSection
  useEffect(() => {
    if (activeSection === 'beranda') {
      history.replaceState(null, '', window.location.pathname);
      document.title = 'Peavey Coffee - Harmoni Kopi Nusantara Dago Bandung';
    } else if (activeSection === 'about') {
      window.location.hash = 'about';
      document.title = 'Tentang Kami | Peavey Coffee Roastery Dago';
    } else if (activeSection === 'experience') {
      window.location.hash = 'experience';
      document.title = 'Customer Experience & Testimoni | Peavey Coffee';
    } else if (activeSection === 'tracking') {
      window.location.hash = 'tracking';
      document.title = 'Pelacakan Pesanan Real-Time | Peavey Coffee';
    } else if (activeSection === 'contact') {
      window.location.hash = 'contact';
      document.title = 'Kontak & Roastery Dago | Peavey Coffee';
    }
  }, [activeSection]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['about', 'experience', 'tracking', 'contact'].includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection('beranda');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(INITIAL_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  // Save Orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(INITIAL_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (
    product: Product,
    grindSize: GrindOption,
    weightGram: PackageWeight,
    quantity: number
  ) => {
    const weightConfig = WEIGHT_OPTIONS.find((w) => w.grams === weightGram) || WEIGHT_OPTIONS[0];
    const unitPrice = Math.round(product.pricePerKg * weightConfig.multiplier);
    const cartItemId = `${product.id}-${grindSize}-${weightGram}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          product,
          grindSize,
          weightGram,
          quantity,
          unitPrice
        };
        return [...prev, newItem];
      }
    });

    showToast(`✓ ${product.name} (${weightGram}g) berhasil masuk keranjang!`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item berhasil dihapus dari keranjang.');
  };

  const handleApplyPromo = (code: string) => {
    const upper = code.trim().toUpperCase();
    if (upper === 'PEAVEYDAGO') {
      setPromoDiscount(0.15);
      return { success: true, message: '🎉 Kupon PEAVEYDAGO aktif! Diskon 15% diterapkan.' };
    } else if (upper === 'KOPIHANGAT') {
      setPromoDiscount(-1); // -1 flag for free shipping
      return { success: true, message: '🚚 Kupon KOPIHANGAT aktif! Gratis Ongkir ke seluruh Indonesia.' };
    } else if (upper === 'ROASTERY') {
      setPromoDiscount(0.1);
      return { success: true, message: '✨ Kupon ROASTERY aktif! Diskon 10% berhasil.' };
    }
    return { success: false, message: 'Kode kupon tidak valid atau telah kadaluarsa.' };
  };

  const handleCheckout = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsPaymentOpen(false);
    setActiveOrderId(newOrder.orderId);
    
    // Switch to dedicated tracking page
    setActiveSection('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    showToast(`🎉 Pembayaran Berhasil! Mengalihkan ke Halaman Pelacakan Pesanan.`);
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'products') {
      // If products is selected, switch to beranda and scroll to products section
      setActiveSection('beranda');
      setTimeout(() => {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 50);
      return;
    }

    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTracking = () => {
    setActiveSection('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Cart financial calculations for payment modal
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const rawShipping = subtotal >= 200000 ? 0 : 15000;
  const shippingFee = promoDiscount === -1 ? 0 : rawShipping;
  const discountAmount = promoDiscount > 0 ? Math.round(subtotal * promoDiscount) : 0;
  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#241611] flex flex-col selection:bg-amber-800 selection:text-white">
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#29170f] text-[#fcefe3] p-3.5 rounded-2xl shadow-2xl border border-[#4a281a] flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <p className="text-xs font-medium leading-tight">{toastMessage}</p>
        </div>
      )}

      {/* Main Navbar with Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTracking={handleOpenTracking}
        savedFavoritesCount={0}
      />

      {/* Main Content: Rendered based on Active Page */}
      <main className="flex-1">
        {/* ========================================================
            PAGE 1: HOME PAGE (Beranda Toko & Galeri 19 Kopi Nusantara)
            Clean, fast, and not overly long!
           ======================================================== */}
        {activeSection === 'beranda' && (
          <div className="animate-fadeIn">
            {/* 1. Hero Banner */}
            <HeroBanner
              onExploreProducts={() => {
                const el = document.getElementById('products');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenTracking={handleOpenTracking}
              onExploreExperience={() => handleNavigate('experience')}
            />

            {/* 2. Menu: Product / Jasa (19 Indonesian Coffees with filter, search & modal) */}
            <ProductSection onAddToCart={handleAddToCart} />

            {/* 3. Compact Navigation Cards (Quick links to dedicated pages) */}
            <section className="py-12 sm:py-16 bg-[#f3eae0] border-t border-[#ded0bf]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-bold text-[#8e421e] uppercase tracking-wider block mb-1">
                    Jelajahi Lebih Lanjut
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2b170e]">
                    Pengalaman Lengkap Peavey Coffee
                  </h3>
                  <p className="text-xs sm:text-sm text-[#705241] mt-1">
                    Buka halaman khusus untuk mengenal cerita roastery kami, ulasan pelanggan, serta melacak paket kopi Anda.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Card 1: Tentang Kami */}
                  <div className="bg-white rounded-2xl p-6 border border-[#ded0be] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#faeee2] text-[#8e421e] flex items-center justify-center font-bold mb-4">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif-display font-bold text-lg text-[#2b170e]">
                        Tentang Kami (About Us)
                      </h4>
                      <p className="text-xs text-[#6e503f] mt-2 leading-relaxed">
                        Pelajari makna nama Peavey, filosofi logo, visi & misi, serta peta 7 asal-usul varietas kopi nusantara kami.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('about')}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#963f17] hover:text-[#6e2c0e] group"
                    >
                      <span>Buka Halaman Tentang Kami</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Card 2: Customer Experience */}
                  <div className="bg-white rounded-2xl p-6 border border-[#ded0be] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold mb-4">
                        <Star className="w-5 h-5 text-amber-700" />
                      </div>
                      <h4 className="font-serif-display font-bold text-lg text-[#2b170e]">
                        Customer Experience
                      </h4>
                      <p className="text-xs text-[#6e503f] mt-2 leading-relaxed">
                        Baca testimoni dari Rizki & penikmat manual brew lainnya, jelajahi galeri foto komunitas, atau tulis ulasan Anda.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('experience')}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#963f17] hover:text-[#6e2c0e] group"
                    >
                      <span>Buka Customer Experience</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Card 3: Lacak Pesanan Real-Time */}
                  <div className="bg-white rounded-2xl p-6 border border-[#ded0be] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-4">
                        <Truck className="w-5 h-5 text-emerald-700" />
                      </div>
                      <h4 className="font-serif-display font-bold text-lg text-[#2b170e]">
                        Lacak Pesanan Real-Time
                      </h4>
                      <p className="text-xs text-[#6e503f] mt-2 leading-relaxed">
                        Pantau status paket kopi Anda dari proses sangrai di Dago hingga diserahkan kurir ke pintu rumah Anda.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNavigate('tracking')}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#963f17] hover:text-[#6e2c0e] group"
                    >
                      <span>Buka Pelacakan Pesanan</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 2: DEDICATED ABOUT US PAGE
           ======================================================== */}
        {activeSection === 'about' && (
          <div className="animate-fadeIn">
            <PageHeader
              title="Tentang Peavey Coffee"
              subtitle="Makna nama Peavey, filosofi logo kami, visi dan misi jangka panjang, serta eksplorasi 7 wilayah penghasil biji kopi terbaik di Nusantara."
              badge="Cerita Roastery Dago"
              onBackToHome={() => handleNavigate('beranda')}
            />
            <AboutUsSection />
          </div>
        )}

        {/* ========================================================
            PAGE 3: DEDICATED CUSTOMER EXPERIENCE PAGE
           ======================================================== */}
        {activeSection === 'experience' && (
          <div className="animate-fadeIn">
            <PageHeader
              title="Customer Experience & Testimoni"
              subtitle="Cerita otentik para pecinta kopi, ulasan seduhan dari pembeli terverifikasi (termasuk pengalaman Rizki di Bandung), dan galeri foto pengguna."
              badge="Kepercayaan Pelanggan"
              onBackToHome={() => handleNavigate('beranda')}
            />
            <CustomerExperienceSection />
          </div>
        )}

        {/* ========================================================
            PAGE 4: DEDICATED ORDER TRACKING PAGE
           ======================================================== */}
        {activeSection === 'tracking' && (
          <div className="animate-fadeIn">
            <PageHeader
              title="Pelacakan Pesanan Real-Time"
              subtitle="Transparansi tanpa jeda: pantau status pemrosesan biji kopi Anda mulai dari verifikasi pembayaran, sangrai profil khusus di Dago, nitrogen packaging, hingga kurir tiba di tujuan."
              badge="Live Logistics Tracker"
              onBackToHome={() => handleNavigate('beranda')}
            />
            <OrderTrackingSection
              initialOrders={orders}
              activeOrderId={activeOrderId}
            />
          </div>
        )}

        {/* ========================================================
            PAGE 5: DEDICATED CONTACT US PAGE
           ======================================================== */}
        {activeSection === 'contact' && (
          <div className="animate-fadeIn">
            <PageHeader
              title="Kontak & Roastery Peavey Coffee"
              subtitle="Kunjungi workshop sangrai kami di Dago Bandung, konsultasikan kebutuhan biji kopi kafe Anda, atau hubungi barista kami langsung via WhatsApp dan Email."
              badge="Layanan Pelanggan & Lokasi"
              onBackToHome={() => handleNavigate('beranda')}
            />
            <ContactUsSection />
          </div>
        )}
      </main>

      {/* Shopping Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        promoDiscount={promoDiscount}
        onApplyPromo={handleApplyPromo}
      />

      {/* Payment Gateway Modal (QRIS, VA, E-Wallet) */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        shippingFee={shippingFee}
        discount={discountAmount}
        total={total}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTracking={handleOpenTracking}
      />

      {/* Sticky Mobile Cart Bar when items present */}
      {cartItems.length > 0 && !isCartOpen && (
        <div className="sm:hidden fixed bottom-4 left-4 right-4 z-30 bg-[#29170f] text-white p-3.5 rounded-2xl shadow-2xl border border-[#4d2c1c] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-[#211109] flex items-center justify-center font-bold text-xs">
              {totalCartCount}
            </div>
            <div>
              <span className="text-xs font-bold block">Keranjang Kopi</span>
              <span className="text-[11px] text-amber-300 font-medium">
                Total: Rp{total.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-600 to-[#963f17] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Lihat Keranjang</span>
          </button>
        </div>
      )}
    </div>
  );
}
