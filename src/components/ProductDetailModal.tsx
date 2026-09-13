import React, { useState } from 'react';
import { X, Star, ShoppingBag, Flame, Mountain, Award, Check, Info, Sparkles } from 'lucide-react';
import { Product, GrindOption, PackageWeight } from '../types';
import { GRIND_OPTIONS, WEIGHT_OPTIONS } from '../data/coffeeProducts';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, grind: GrindOption, weight: PackageWeight, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>('Biji Utuh');
  const [selectedWeight, setSelectedWeight] = useState<PackageWeight>(250);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen || !product) return null;

  // Calculate price based on weight multiplier
  const currentWeightObj = WEIGHT_OPTIONS.find(w => w.grams === selectedWeight) || WEIGHT_OPTIONS[0];
  const unitPrice = Math.round(product.pricePerKg * currentWeightObj.multiplier);
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, selectedGrind, selectedWeight, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  const formatRupiah = (val: number) => {
    return 'Rp' + val.toLocaleString('id-ID');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-[#faf7f2] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#ded1c0] my-8 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-product-modal-btn"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#3b2014]/80 text-[#edd5c0] hover:bg-[#2e180e] hover:text-white flex items-center justify-center transition-colors"
          aria-label="Tutup dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Quick Attributes */}
          <div className="md:col-span-5 bg-[#25140c] text-white p-5 flex flex-col justify-between relative">
            <div>
              <div className="relative h-64 rounded-xl overflow-hidden shadow-md mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#963f17] text-white shadow">
                    {product.variety}
                  </span>
                  {product.isBestSeller && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-[#1e0f09] flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3" /> Best Seller
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating} / 5.0</span>
                  <span className="text-[#a88a75]">({product.reviewCount} ulasan)</span>
                </div>

                <div className="text-xs space-y-1.5 text-[#d9c0af]">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Elevasi: {product.altitude}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Proses: {product.process}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Tingkat Sangrai: {product.roastLevel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="pt-4 border-t border-[#46281b] mt-4">
              <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold block mb-1.5">
                Karakteristik Rasa (Tasting Notes)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.flavorNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#381f13] text-[#faeadb] border border-[#522f1d]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Customizer & Checkout */}
          <div className="md:col-span-7 p-6 space-y-5 bg-[#faf7f2]">
            <div>
              <span className="text-xs font-bold text-[#963f17] uppercase tracking-wider">
                {product.region}
              </span>
              <h2 className="font-serif-display text-2xl font-bold text-[#2e1910] mt-0.5">
                {product.name}
              </h2>
              <p className="text-xs text-[#6e5040] leading-relaxed mt-2">
                {product.description}
              </p>
            </div>

            {/* Flavor Radar Bars */}
            <div className="bg-[#f2e9de] p-3.5 rounded-xl space-y-2 border border-[#ded0bf]">
              <span className="text-xs font-bold text-[#452b1d] block">
                Profil Sensoris Seduhan:
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#523829]">
                <div>
                  <div className="flex justify-between mb-0.5 text-[11px] font-medium">
                    <span>Acidity (Keasaman)</span>
                    <span className="font-bold">{product.acidity}/5</span>
                  </div>
                  <div className="w-full bg-[#decbb9] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-600 h-full rounded-full" 
                      style={{ width: `${(product.acidity / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-0.5 text-[11px] font-medium">
                    <span>Body (Kekentalan)</span>
                    <span className="font-bold">{product.body}/5</span>
                  </div>
                  <div className="w-full bg-[#decbb9] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-600 h-full rounded-full" 
                      style={{ width: `${(product.body / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-0.5 text-[11px] font-medium">
                    <span>Sweetness (Kemanisan)</span>
                    <span className="font-bold">{product.sweetness}/5</span>
                  </div>
                  <div className="w-full bg-[#decbb9] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-600 h-full rounded-full" 
                      style={{ width: `${(product.sweetness / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-0.5 text-[11px] font-medium">
                    <span>Aroma (Keharuman)</span>
                    <span className="font-bold">{product.aroma}/5</span>
                  </div>
                  <div className="w-full bg-[#decbb9] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-600 h-full rounded-full" 
                      style={{ width: `${(product.aroma / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Selection: Weight */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#3d2417] flex justify-between">
                <span>Pilih Ukuran Kemasan:</span>
                <span className="text-[#963f17] font-semibold">
                  {formatRupiah(unitPrice)}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {WEIGHT_OPTIONS.map((opt) => (
                  <button
                    key={opt.grams}
                    type="button"
                    onClick={() => setSelectedWeight(opt.grams)}
                    className={`px-2.5 py-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                      selectedWeight === opt.grams
                        ? 'bg-[#3b2014] text-amber-200 border-[#3b2014] shadow'
                        : 'bg-white text-[#523628] border-[#ded0be] hover:border-amber-700'
                    }`}
                  >
                    <span className="block font-bold">{opt.grams}g</span>
                    <span className="text-[10px] opacity-80 block">
                      {opt.grams === 1000 ? '1 Kilogram' : 'Pouch Bag'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selection: Grind Size */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#3d2417] block">
                Pilih Profil Gilingan (Grind Size):
              </label>
              <div className="space-y-1.5">
                {GRIND_OPTIONS.map((grind) => (
                  <label
                    key={grind}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      selectedGrind === grind
                        ? 'bg-[#f0e4d4] border-amber-700 text-[#2c170f] font-semibold'
                        : 'bg-white border-[#ded0be] text-[#5c3e2f] hover:bg-[#fcf9f5]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="grindOption"
                        checked={selectedGrind === grind}
                        onChange={() => setSelectedGrind(grind)}
                        className="text-amber-700 focus:ring-amber-500"
                      />
                      <span>{grind}</span>
                    </div>
                    {grind === 'Biji Utuh' && (
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        Paling Tahan Lama
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart Footer */}
            <div className="pt-3 border-t border-[#ded1c0] flex items-center gap-3">
              <div className="flex items-center border border-[#d6c4b2] rounded-lg bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm font-bold text-[#452b1e] hover:bg-[#f2e6d8]"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold min-w-[36px] text-center text-[#2e1910]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-sm font-bold text-[#452b1e] hover:bg-[#f2e6d8]"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                id="modal-add-to-cart-btn"
                disabled={addedSuccess}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                  addedSuccess
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#963f17] hover:bg-[#7e3412] text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Ditambahkan ke Keranjang!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-amber-200" />
                    <span>Tambah ke Keranjang • {formatRupiah(totalPrice)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
