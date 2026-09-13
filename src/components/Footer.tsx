import React from 'react';
import { Coffee, MapPin, Phone, Mail, Instagram, ShieldCheck, Heart } from 'lucide-react';
import { BRAND_INFO } from '../data/reviewsAndExperience';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenTracking }) => {
  return (
    <footer className="bg-[#1b0d07] text-[#dfc9b8] border-t border-[#381c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand & Story */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#4a2617] text-amber-300 flex items-center justify-center font-bold">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif-display font-bold text-2xl text-white">
                  Peavey<span className="text-amber-500">.</span>Coffee
                </span>
                <p className="text-[11px] text-[#baa08e]">Roastery Khas Dago Bandung</p>
              </div>
            </div>

            <p className="text-xs text-[#b89c89] leading-relaxed font-light">
              "{BRAND_INFO.tagline}." 
              Dedikasi penuh menghadirkan kekayaan 19 varietas kopi terbaik nusantara dari petani lokal ke cangkir seduh Anda dengan standar kualitas roasting presisi.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#331a0e] text-amber-400 text-[11px] font-bold border border-[#4d2716]">
                🇮🇩 100% Kopi Asli Indonesia
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#331a0e] text-amber-200 text-[11px] font-medium border border-[#4d2716]">
                Fresh Nitrogen Sealing
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Navigasi Menu
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('beranda')} className="hover:text-amber-300 transition-colors">
                  Beranda Toko
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-amber-300 transition-colors">
                  Produk Kopi (19 Varian)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-300 transition-colors">
                  Tentang Kami (About Us)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('experience')} className="hover:text-amber-300 transition-colors">
                  Customer Experience
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-amber-300 text-amber-400 font-semibold transition-colors flex items-center gap-1">
                  <span>Lacak Pesanan Real-Time</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-amber-300 transition-colors">
                  Kontak & Lokasi
                </button>
              </li>
            </ul>
          </div>

          {/* Coffee Regions */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Asal Kopi Indonesia
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] text-[#bda290]">
              <span>• Aceh Gayo</span>
              <span>• Tana Toraja</span>
              <span>• Kintamani Bali</span>
              <span>• Mandheling</span>
              <span>• Flores Bajawa</span>
              <span>• Papua Wamena</span>
              <span>• Java Preanger</span>
              <span>• Sidikalang</span>
              <span>• Robusta Lampung</span>
              <span>• Kopi Luwak Liar</span>
            </div>
            <p className="text-[10px] text-[#8e7261] pt-1">
              Setiap batch disangrai dengan kurva profil khusus agar karakter origin tetap terjaga.
            </p>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Roastery & Workshop
            </h4>
            <div className="space-y-2 text-[#c7af9d]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{BRAND_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={BRAND_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white font-mono">
                  {BRAND_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-white font-mono">
                  {BRAND_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={BRAND_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {BRAND_INFO.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Gateways Bar */}
        <div className="pt-8 border-t border-[#2d150b] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-[#8e7362] font-semibold">Integrasi Pembayaran:</span>
            <span className="px-2 py-0.5 rounded bg-[#2a140a] border border-[#3e1f10] text-[#cfb7a5] font-mono text-[10px]">QRIS</span>
            <span className="px-2 py-0.5 rounded bg-[#2a140a] border border-[#3e1f10] text-[#cfb7a5] font-mono text-[10px]">BCA VA</span>
            <span className="px-2 py-0.5 rounded bg-[#2a140a] border border-[#3e1f10] text-[#cfb7a5] font-mono text-[10px]">Mandiri VA</span>
            <span className="px-2 py-0.5 rounded bg-[#2a140a] border border-[#3e1f10] text-[#cfb7a5] font-mono text-[10px]">GoPay</span>
            <span className="px-2 py-0.5 rounded bg-[#2a140a] border border-[#3e1f10] text-[#cfb7a5] font-mono text-[10px]">OVO / DANA</span>
          </div>

          <div className="text-[11px] text-[#8e7362] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Garansi Kesegaran Kopi 100% Penggantian Jika Kualitas Rusak</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-[#241108] text-center text-[11px] text-[#785f4e] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Peavey Coffee. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> untuk Pecinta Kopi Indonesia di Dago, Bandung.
          </p>
        </div>
      </div>
    </footer>
  );
};
