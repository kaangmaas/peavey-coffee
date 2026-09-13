import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Star, Sparkles, Coffee, ArrowUpRight, Flame } from 'lucide-react';
import { Product, GrindOption, PackageWeight } from '../types';
import { COFFEE_PRODUCTS, REGIONS, VARIETIES } from '../data/coffeeProducts';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductSectionProps {
  onAddToCart: (product: Product, grind: GrindOption, weight: PackageWeight, quantity: number) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ onAddToCart }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('Semua Wilayah');
  const [selectedVariety, setSelectedVariety] = useState<string>('Semua Kategori');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return COFFEE_PRODUCTS.filter((item) => {
      const matchRegion = selectedRegion === 'Semua Wilayah' || item.island === selectedRegion;
      const matchVariety = selectedVariety === 'Semua Kategori' || item.variety === selectedVariety;
      const matchSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.flavorNotes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchRegion && matchVariety && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerKg - b.pricePerKg;
      if (sortBy === 'price-desc') return b.pricePerKg - a.pricePerKg;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedRegion, selectedVariety, searchQuery, sortBy]);

  const formatRupiah = (val: number) => {
    return 'Rp' + val.toLocaleString('id-ID');
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#faf6f0] border-b border-[#e6dbc9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0e3d2] text-[#853c19] text-xs font-bold uppercase tracking-wider mb-2">
            <Coffee className="w-3.5 h-3.5" />
            <span>Koleksi Terlengkap Single Origin Nusantara</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#29170e]">
            Produk Kopi Indonesia Pilihan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6b4c3b] leading-relaxed">
            Temukan karakter unik biji kopi dari 7 pulau besar Indonesia. Tersedia dalam pilihan varietas 
            Arabika murni beraroma eksotis, Robusta mantap ber-crema tebal, hingga kemewahan Kopi Luwak Liar asli.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#f3ebe0] rounded-2xl p-4 sm:p-5 border border-[#e0d2c0] mb-8 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#8a6854] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kopi (Gayo, Toraja, Mandheling, Floral, dsb)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-xs sm:text-sm text-[#2b170f] placeholder-[#997967] border border-[#d6c4b0] focus:outline-none focus:ring-2 focus:ring-amber-700/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c6751] hover:text-[#2b170f]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Variety Selector */}
            <div className="md:col-span-4 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {VARIETIES.map((varName) => (
                <button
                  key={varName}
                  onClick={() => setSelectedVariety(varName)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors shrink-0 ${
                    selectedVariety === varName
                      ? 'bg-[#3b2014] text-amber-200 shadow-sm'
                      : 'bg-white text-[#523526] hover:bg-[#ebdccb] border border-[#d6c4b0]'
                  }`}
                >
                  {varName}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3 flex items-center justify-end gap-2">
              <span className="text-xs font-semibold text-[#664635] hidden sm:inline">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white border border-[#d6c4b0] text-xs font-semibold text-[#381f14] focus:outline-none"
              >
                <option value="popular">Terlaris & Unggulan</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
                <option value="rating">Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Region Tabs */}
          <div className="pt-2 border-t border-[#dfcfbd] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-xs font-bold text-[#634534] mr-2 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
              <span>Wilayah:</span>
            </span>
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                  selectedRegion === region
                    ? 'bg-[#963f17] text-white font-bold shadow-sm'
                    : 'bg-[#faf4ec] text-[#694836] hover:bg-[#e9d9c7] border border-[#d8c7b4]'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Product Count & Meta Info */}
        <div className="flex justify-between items-center mb-6 text-xs text-[#705241]">
          <p>
            Menampilkan <span className="font-bold text-[#2a170f]">{filteredProducts.length}</span> varian kopi Indonesia pilihan
          </p>
          <span className="text-amber-800 font-semibold hidden sm:inline">
            ✨ Setiap kemasan dilengkapi One-Way Valve & Zipper Kedap Udara
          </span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#dfcfbd] max-w-md mx-auto">
            <Coffee className="w-12 h-12 mx-auto text-[#a88874] mb-3" />
            <h3 className="font-serif-display text-lg font-bold text-[#2b170e]">Kopi Tidak Ditemukan</h3>
            <p className="text-xs text-[#6e503f] mt-1 mb-4">
              Coba gunakan kata kunci pencarian lain atau pilih filter "Semua Wilayah".
            </p>
            <button
              onClick={() => {
                setSelectedRegion('Semua Wilayah');
                setSelectedVariety('Semua Kategori');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#3a2014] text-amber-200 rounded-lg text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[#ded1c0] hover:border-[#b45d2d] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-52 overflow-hidden bg-[#24130b]">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Variety & Best Seller Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm ${
                        product.variety === 'Arabika'
                          ? 'bg-amber-100 text-amber-900'
                          : product.variety === 'Luwak'
                          ? 'bg-purple-100 text-purple-900 border border-purple-300'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {product.variety}
                      </span>
                      {product.isBestSeller && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#963f17] text-white flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-2.5 h-2.5 text-amber-300" /> Best Seller
                        </span>
                      )}
                    </div>

                    {/* Roast Level Badge */}
                    <div className="absolute bottom-2.5 left-3 text-[11px] text-[#f7e6d6] flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>{product.roastLevel}</span>
                    </div>

                    {/* Rating badge */}
                    <div className="absolute bottom-2.5 right-3 text-xs text-amber-300 font-bold flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-4 space-y-2.5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#963f17]">
                        {product.region}
                      </span>
                      <h3 className="font-serif-display text-base font-bold text-[#2e1910] line-clamp-1 group-hover:text-[#963f17] transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-xs text-[#6e5040] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Tasting notes chips */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {product.flavorNotes.slice(0, 3).map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#f3e9de] text-[#543727] font-medium"
                        >
                          {note}
                        </span>
                      ))}
                      {product.flavorNotes.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 text-[#8c6751]">
                          +{product.flavorNotes.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & Actions */}
                <div className="p-4 pt-2 border-t border-[#efe4d6] bg-[#fcfaf7]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-[#856552] block">Harga Resmi (1 kg)</span>
                      <span className="text-base font-bold text-[#963f17]">
                        {formatRupiah(product.pricePerKg)}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#6d4d3c] font-medium">
                      (Tersedia 250g & 500g)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalProduct(product)}
                      className="py-2 px-2.5 rounded-xl text-xs font-bold text-[#45291b] bg-[#ede0ce] hover:bg-[#dfcfbc] transition-colors text-center"
                    >
                      Detail & Rasa
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveModalProduct(product)}
                      className="py-2 px-2.5 rounded-xl text-xs font-bold text-white bg-[#963f17] hover:bg-[#7e3412] shadow-sm transition-all flex items-center justify-center gap-1"
                    >
                      <span>Pilih & Beli</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        isOpen={!!activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
