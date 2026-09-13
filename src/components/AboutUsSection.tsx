import React from 'react';
import { Coffee, Target, Compass, Sparkles, MapPin, Award, CheckCircle2, Heart } from 'lucide-react';
import { ABOUT_US, BRAND_INFO } from '../data/reviewsAndExperience';

export const AboutUsSection: React.FC = () => {
  const originRegions = [
    { name: 'Aceh (Gayo)', beans: 'Arabika & Robusta', desc: 'Aroma floral rempah vulkanik' },
    { name: 'Sumatera Utara', beans: 'Mandheling & Sidikalang', desc: 'Full body, earthy & dark cocoa' },
    { name: 'Lampung', beans: 'Robusta & Arabika Liwa', desc: 'Legenda espresso & kopi tubruk' },
    { name: 'Jawa Barat (Preanger)', beans: 'Arabika & Robusta Priangan', desc: 'Fresh roast Dago, sweet apple & tea' },
    { name: 'Bali (Kintamani)', beans: 'Arabika Citrus & Robusta', desc: 'Tumpang sari jeruk lereng Batur' },
    { name: 'Nusa Tenggara Timur', beans: 'Flores Bajawa Arabika & Robusta', desc: 'Aroma cokelat tembakau Inerie' },
    { name: 'Sulawesi Selatan', beans: 'Toraja Arabika & Robusta', desc: 'Karakter herbal velvet pegunungan' },
    { name: 'Papua (Wamena)', beans: 'Arabika Organik Lembah Baliem', desc: 'Tumbuh liar tanpa pestisida kimia' },
    { name: 'Nasional', beans: 'Kopi Luwak Liar', desc: 'Fermentasi alami enzimatis tertinggi' },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#f5ede2] border-b border-[#dfcfbd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ebd9c7] text-[#803816] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cerita di Balik Seduhan Kami</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b170e]">
            Tentang Peavey Coffee
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#694b3a] leading-relaxed">
            Berawal dari aroma sejuk Dago, Bandung, Peavey Coffee lahir dari kecintaan mendalam pada 
            keragaman hayati tanah nusantara yang kaya akan karakter biji kopi terbaik di dunia.
          </p>
        </div>

        {/* Section 1: Makna Nama & Logo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Makna Nama */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#ded0bf] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#422214] text-amber-300 flex items-center justify-center mb-4 shadow">
                <Coffee className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-[#963f17] uppercase tracking-wider block">
                Filosofi & Inspirasi
              </span>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2e1910] mt-1 mb-3">
                Makna Nama "Peavey"
              </h3>
              <p className="text-sm text-[#614535] leading-relaxed">
                {ABOUT_US.nameMeaning.content}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ede2d5] flex items-center gap-2 text-xs text-[#8c654f]">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>Presisi roasting kurva profil • Kepekaan cita rasa nusantara</span>
            </div>
          </div>

          {/* Makna Logo */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#ded0bf] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#963f17] text-white flex items-center justify-center mb-4 shadow">
                <Award className="w-6 h-6 text-amber-200" />
              </div>
              <span className="text-xs font-bold text-[#963f17] uppercase tracking-wider block">
                Simbol Identitas Visual
              </span>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2e1910] mt-1 mb-3">
                Makna Logo Peavey Coffee
              </h3>
              <p className="text-sm text-[#614535] leading-relaxed">
                {ABOUT_US.logoMeaning.content}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#ede2d5] flex items-center gap-2 text-xs text-[#8c654f]">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>Biji kopi • Lingkaran regenerasi gotong royong petani • Aroma hangat</span>
            </div>
          </div>
        </div>

        {/* Section 2: Visi & Misi */}
        <div className="bg-[#2a170f] text-[#f7ede3] rounded-3xl p-8 sm:p-12 border border-[#4d2b1b] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visi */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-[#472719] pb-8 lg:pb-0 lg:pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#402214] text-amber-300 text-xs font-bold tracking-wide">
                <Target className="w-3.5 h-3.5" />
                <span>Visi Peavey Coffee</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                Mengangkat Harkat Kopi Indonesia ke Pentas Internasional
              </h3>
              <p className="text-sm text-[#dec2ae] leading-relaxed font-light">
                "{ABOUT_US.vision}"
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-amber-300">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Berakar di Dago, Mengalir untuk Nusantara & Dunia</span>
              </div>
            </div>

            {/* Misi */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#402214] text-amber-300 text-xs font-bold tracking-wide">
                <Compass className="w-3.5 h-3.5" />
                <span>3 Misi Utama Kami</span>
              </div>
              <div className="space-y-3 pt-1">
                {ABOUT_US.missions.map((misi, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#351e13] border border-[#522f1c]">
                    <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-[#edd9cb] leading-relaxed">
                      {misi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Peta & Jelajah Daerah Asal 19 Kopi Kami */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#963f17]">
                Peta Asal Usul Kopi
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2a160d]">
                19 Biji Kopi dari 7 Pulau Bersejarah
              </h3>
            </div>
            <p className="text-xs text-[#705241] max-w-md">
              Setiap daerah memiliki ketinggian tanah, mineral abu vulkanik, dan cara olah pasca panen yang melahirkan profil rasa unik.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {originRegions.map((region, idx) => (
              <div 
                key={idx} 
                className="bg-white p-4 rounded-xl border border-[#ded0be] hover:border-amber-700 transition-colors shadow-sm flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#faede1] text-[#963f17] flex items-center justify-center font-bold text-xs shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#2c170f]">{region.name}</h4>
                  <span className="text-[11px] font-semibold text-[#8c4623] block">{region.beans}</span>
                  <p className="text-xs text-[#6e5040] mt-0.5">{region.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roastery Dago Feature Showcase */}
        <div className="bg-[#ede1d1] rounded-2xl p-6 sm:p-8 border border-[#ded0be] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="font-serif-display text-xl font-bold text-[#2d180f]">
              Berkunjung ke Workshop Roastery Kami di Dago, Bandung
            </h4>
            <p className="text-xs sm:text-sm text-[#634636] max-w-2xl">
              Nikmati aroma biji kopi yang baru keluar dari mesin sangrai, ikuti sesi manual cupping interaktif, 
              atau diskusikan profile gilingan ideal untuk seduhan favorit Anda bersama barista kami.
            </p>
          </div>
          <a
            href={BRAND_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-[#2e180f] text-amber-200 hover:bg-[#1f0f09] text-xs font-bold shrink-0 transition-colors flex items-center gap-2 shadow"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Kunjungi Kedai Dago</span>
          </a>
        </div>
      </div>
    </section>
  );
};
