import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Sparkles, Coffee } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onCheckout: () => void;
  promoDiscount: number;
  onApplyPromo: (code: string) => { success: boolean; message: string };
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  promoDiscount,
  onApplyPromo
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const rawShipping = subtotal >= 200000 ? 0 : 15000;
  const shippingFee = promoDiscount === -1 ? 0 : rawShipping; // promo free ongkir
  const discountAmount = promoDiscount > 0 ? Math.round(subtotal * promoDiscount) : 0;
  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  const formatRupiah = (val: number) => {
    return 'Rp' + val.toLocaleString('id-ID');
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;

    const res = onApplyPromo(promoCodeInput.trim().toUpperCase());
    setPromoMessage({ text: res.message, isError: !res.success });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-md bg-[#faf7f2] h-full shadow-2xl flex flex-col justify-between border-l border-[#decbb7] animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="bg-[#2a170f] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#472719]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#963f17] text-amber-200 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-display text-base sm:text-lg font-bold">
                Keranjang Kopi Anda
              </h3>
              <p className="text-[11px] text-[#d6b7a2]">
                {items.length} varian biji kopi pilihan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#3d2215] text-[#edd5c0] hover:bg-[#4f2c1c] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#785b49]">
              <Coffee className="w-14 h-14 text-[#c2a48f] mb-3 stroke-[1.2]" />
              <h4 className="font-serif-display font-bold text-base text-[#2e1910]">
                Keranjang Masih Kosong
              </h4>
              <p className="text-xs mt-1 mb-4 text-[#8a6854]">
                Aroma kopi nusantara menanti. Pilih dari 19 koleksi single origin kami!
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#963f17] text-white text-xs font-bold"
              >
                Mulai Belanja Kopi
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3 border border-[#ded0bf] shadow-sm flex gap-3 items-start"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-lg object-cover bg-[#24140b] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h5 className="font-serif-display font-bold text-xs text-[#2b170e] truncate pr-2">
                      {item.product.name}
                    </h5>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#8c6753] hover:text-red-600 p-1"
                      title="Hapus dari keranjang"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-[10px] text-[#735543] space-y-0.5 mt-0.5">
                    <p className="font-medium text-[#8c3d19]">
                      {item.weightGram}g • {item.grindSize}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#f2e7db]">
                    <span className="font-bold text-xs text-[#963f17]">
                      {formatRupiah(item.unitPrice * item.quantity)}
                    </span>

                    <div className="flex items-center border border-[#d6c4b2] rounded-md bg-[#faf7f2] overflow-hidden text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 font-bold hover:bg-[#ebdcd0]"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-bold text-center min-w-[24px]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 font-bold hover:bg-[#ebdcd0]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer: Summary & Checkout */}
        {items.length > 0 && (
          <div className="bg-white p-4 border-t border-[#ded0bf] space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={handleApply} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8a6854] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Kode promo (PEAVEYDAGO / KOPIHANGAT)..."
                    className="w-full pl-8 pr-2 py-2 text-xs rounded-lg border border-[#d6c4b0] bg-[#faf6f0] uppercase font-mono placeholder:normal-case focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#3b2014] text-amber-200 text-xs font-bold rounded-lg hover:bg-[#2c170e]"
                >
                  Gunakan
                </button>
              </div>
              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.isError ? 'text-red-600' : 'text-emerald-700 font-semibold'}`}>
                  {promoMessage.text}
                </p>
              )}
            </form>

            {/* Calculations breakdown */}
            <div className="text-xs space-y-1.5 pt-1 text-[#5c3e2e]">
              <div className="flex justify-between">
                <span>Subtotal Kopi ({items.length} item)</span>
                <span className="font-semibold">{formatRupiah(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Ongkos Kirim (Roastery Dago)</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">GRATIS</span>
                  ) : (
                    formatRupiah(shippingFee)
                  )}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Diskon Promo</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-bold text-[#2a170f] pt-2 border-t border-[#ded0bf]">
                <span>Total Belanja</span>
                <span className="text-base text-[#963f17]">{formatRupiah(total)}</span>
              </div>
            </div>

            {/* Free Shipping Progress bar */}
            {subtotal < 200000 && (
              <div className="bg-[#faf5ed] p-2 rounded-lg text-[10px] text-[#735340] border border-[#e8dacb]">
                Tambah <strong>{formatRupiah(200000 - subtotal)}</strong> lagi untuk mendapatkan <strong>Gratis Ongkir</strong> ke seluruh Jawa!
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onCheckout();
              }}
              id="cart-checkout-btn"
              className="w-full py-3.5 px-4 rounded-xl bg-[#963f17] hover:bg-[#7e3412] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>Lanjut ke Pembayaran Gateway</span>
              <ArrowRight className="w-4 h-4 text-amber-200" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8a6854] pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dukungan QRIS, Virtual Account BCA/Mandiri, dan E-Wallet</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
