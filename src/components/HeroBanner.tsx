import React from 'react';
import { Coffee, ShieldCheck, Sparkles, Flame, Truck, ArrowRight, Star, HeartHandshake } from 'lucide-react';
import { BRAND_INFO } from '../data/reviewsAndExperience';

interface HeroBannerProps {
  onExploreProducts: () => void;
  onOpenTracking: () => void;
  onExploreExperience: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreProducts,
  onOpenTracking,
  onExploreExperience
}) => {
  return (
    <section className="relative bg-[#27150c] text-[#f5ebe1] overflow-hidden">
      {/* Warm Ambient Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1920&q=80" 
          alt="Biji Kopi Indonesia Sangrai" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Warm Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1c0d07] via-[#2a160d]/90 to-[#1f0f08]/85"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#422214] border border-[#6b3820] text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Roastery Khas Dago Bandung • 19 Varian Kopi Asli Indonesia</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fff7ee] leading-[1.15]">
                Harmoni Cita Rasa <span className="text-amber-400 italic">Kopi Nusantara</span> di Setiap Seduhan.
              </h1>
              <p className="text-[#dec0a9] text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                Dari tanah vulkanik Dataran Tinggi Gayo, sejuknya Parahyangan Jawa Barat, eksotisme Toraja, hingga Lembah Baliem Papua. 
                Disangrai presisi segar setiap minggu di workshop Dago untuk aroma maksimal dan keaslian rasa sejati.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreProducts}
                id="hero-explore-products-btn"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-[#b45422] hover:from-amber-500 hover:to-[#9f481c] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-amber-900/40 flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Coffee className="w-5 h-5 text-amber-200" />
                <span>Belanja 19 Kopi Nusantara</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenTracking}
                id="hero-track-order-btn"
                className="px-5 py-3.5 rounded-xl bg-[#3c2114] hover:bg-[#4d2b1a] text-[#f2dfcf] font-semibold text-sm sm:text-base border border-[#5a3320] flex items-center gap-2 transition-colors"
              >
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Lacak Pesanan Real-Time</span>
              </button>

              <button
                onClick={onExploreExperience}
                id="hero-experience-btn"
                className="px-4 py-3.5 text-xs sm:text-sm text-[#dec0a9] hover:text-amber-300 font-medium underline underline-offset-4 transition-colors"
              >
                Ulasan Konsumen & Komunitas →
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#462719]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3a1f13] flex items-center justify-center text-amber-400 shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#f7e8db]">Fresh Roasted</h4>
                  <p className="text-[11px] text-[#bda391]">Batch mingguan Dago</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3a1f13] flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#f7e8db]">100% Single Origin</h4>
                  <p className="text-[11px] text-[#bda391]">Biji pilihan petani lokal</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3a1f13] flex items-center justify-center text-amber-400 shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#f7e8db]">Kemasan Nitro-Valve</h4>
                  <p className="text-[11px] text-[#bda391]">Aroma segar terjaga</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#3a1f13] flex items-center justify-center text-amber-400 shrink-0">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#f7e8db]">Rating 4.9 / 5</h4>
                  <p className="text-[11px] text-[#bda391]">Dari 12.000+ pelanggan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative warm aura */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-amber-600 to-orange-800 rounded-3xl blur-lg opacity-40"></div>
              
              <div className="relative bg-[#21120a] rounded-2xl overflow-hidden border border-[#522f1d] shadow-2xl p-4">
                <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80" 
                    alt="Kedai dan Seduhan Kopi Peavey Coffee Dago" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b0e07] via-transparent to-transparent"></div>
                  
                  {/* Floating origin badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-[#1f1008]/85 backdrop-blur-md p-3 rounded-lg border border-[#4d2d1b]">
                    <div>
                      <span className="text-[10px] uppercase text-amber-400 font-bold block">Spesialisasi Roastery</span>
                      <span className="font-serif-display font-semibold text-white">Gayo, Java Preanger & Toraja</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#d4b5a0] block">Mulai dari</span>
                      <span className="font-bold text-amber-300">Rp100.000 / kg</span>
                    </div>
                  </div>
                </div>

                {/* Live Roastery Status Ticket */}
                <div className="mt-3 p-3 rounded-xl bg-[#2a170f] border border-[#442718] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div>
                      <p className="text-xs font-bold text-[#f7e6d7]">Batch Roasting Hari Ini</p>
                      <p className="text-[11px] text-[#ba9f8b]">Gayo Arabika & Flores Bajawa</p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2.5 py-1 rounded bg-[#3f2416] text-amber-300 font-mono font-medium">
                    Fresh Valve
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
