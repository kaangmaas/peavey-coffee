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
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { Footer } from './components/Footer';
import { Product, GrindOption, PackageWeight, CartItem, Order } from './types';
import { WEIGHT_OPTIONS } from './data/coffeeProducts';
import { Check, Coffee, ShoppingBag, Truck } from 'lucide-react';

const INITIAL_CART_KEY = 'peavey_cart_items';
const INITIAL_ORDERS_KEY = 'peavey_orders';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('beranda');
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
    } catch (e) {
      // Fallback
    }
    return [];
  });

  // Orders State with LocalStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(INITIAL_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return [];
  });

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
    setActiveSection('tracking');

    // Smooth scroll to tracking section
    setTimeout(() => {
      const trackingEl = document.getElementById('tracking');
      if (trackingEl) {
        trackingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);

    showToast(`🎉 Pembayaran Berhasil! Pesanan ${newOrder.orderId} sedang diproses.`);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTracking = () => {
    setActiveSection('tracking');
    const el = document.getElementById('tracking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* Main Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTracking={handleOpenTracking}
        savedFavoritesCount={0}
      />

      <main className="flex-1">
        {/* 1. Hero Banner */}
        <HeroBanner
          onExploreProducts={() => handleNavigate('products')}
          onOpenTracking={handleOpenTracking}
          onExploreExperience={() => handleNavigate('experience')}
        />

        {/* 2. Menu: Product / Jasa (19 Indonesian Coffees) */}
        <ProductSection onAddToCart={handleAddToCart} />

        {/* 3. Menu: About Us (Makna Nama & Logo, Visi Misi, Peta Kopi) */}
        <AboutUsSection />

        {/* 4. Menu: Customer Experience (Rizki Review, User Photo Gallery, Review System) */}
        <CustomerExperienceSection />

        {/* 5. Real-Time Order Tracking (Interactive Stepper & Simulation) */}
        <OrderTrackingSection
          initialOrders={orders}
          activeOrderId={activeOrderId}
        />

        {/* 6. Menu: Contact Us (Dago Bandung, WhatsApp, Email, Instagram) */}
        <ContactUsSection />
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
