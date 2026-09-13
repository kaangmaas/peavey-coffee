import React, { useState } from 'react';
import { Phone, Mail, Instagram, MapPin, Clock, Send, MessageCircle, CheckCircle2, Coffee } from 'lucide-react';
import { BRAND_INFO } from '../data/reviewsAndExperience';

export const ContactUsSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Konsultasi Biji Kopi Nusantara');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    // Open WhatsApp directly with the filled message
    const waText = encodeURIComponent(
      `Halo Peavey Coffee Dago!\n\nNama: ${name}\nEmail: ${email}\nTopik: ${subject}\nPesan: ${message}`
    );
    window.open(`https://wa.me/6285155292232?text=${waText}`, '_blank');

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#faf6f0] border-b border-[#e5d8c8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#faeedf] text-[#8e421e] text-xs font-bold uppercase tracking-wider mb-2">
            <Coffee className="w-3.5 h-3.5" />
            <span>Hubungi Roastery Kami</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b170e]">
            Kontak & Roastery Peavey Coffee
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6b4c3b] leading-relaxed">
            Punya pertanyaan mengenai profil rasa kopi nusantara, konsultasi kebutuhan supply kedai cafe, 
            atau ingin berkunjung ke workshop kami di Dago? Kami siap melayani dengan hangat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#2a170f] text-[#f7ede3] rounded-3xl p-6 sm:p-8 border border-[#4d2b1b] shadow-lg space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Kantor & Roastery Dago
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-white">
                  Peavey Coffee Roastery
                </h3>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#3f2418] text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-200">Alamat Fisik</h4>
                  <p className="text-xs sm:text-sm text-[#dec2af] leading-relaxed mt-0.5">
                    {BRAND_INFO.address}
                  </p>
                  <span className="text-[11px] text-amber-400/80 mt-1 block">
                    (Kawasan Sejuk Dago Atas, Bandung)
                  </span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-200">Nomor WhatsApp Resmi</h4>
                  <a
                    href={BRAND_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono font-bold text-white hover:text-emerald-400 transition-colors block mt-0.5"
                  >
                    {BRAND_INFO.phone}
                  </a>
                  <p className="text-[11px] text-[#dec2af]">Respon cepat pemesanan & konsultasi</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#3f2418] text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-200">Email Korespondensi</h4>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="text-sm font-mono font-bold text-white hover:text-amber-300 transition-colors block mt-0.5"
                  >
                    {BRAND_INFO.email}
                  </a>
                  <p className="text-[11px] text-[#dec2af]">Kerjasama b2b & pertanyaan umum</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-900/50 text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-200">Instagram Resmi</h4>
                  <a
                    href={BRAND_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono font-bold text-white hover:text-rose-300 transition-colors block mt-0.5"
                  >
                    {BRAND_INFO.instagram}
                  </a>
                  <p className="text-[11px] text-[#dec2af]">Update jadwal roasting & promo</p>
                </div>
              </div>

              {/* Hours */}
              <div className="pt-4 border-t border-[#462719] flex items-center gap-3 text-xs text-[#d6b7a2]">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Jam Operasional Kedai & Pengiriman: <strong>{BRAND_INFO.hours}</strong></span>
              </div>
            </div>

            {/* Direct WhatsApp Instant Action */}
            <a
              href={BRAND_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat Langsung via WhatsApp ({BRAND_INFO.phone})</span>
            </a>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#ded0bf] shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#963f17] uppercase tracking-wider block">
                Formulir Pesan Cepat
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-[#2b170e] mt-1">
                Kirim Pesan ke Barista Kami
              </h3>
              <p className="text-xs text-[#735341] mt-1">
                Pesan akan langsung terhubung ke layanan pelanggan WhatsApp Peavey Coffee Dago.
              </p>
            </div>

            {isSent ? (
              <div className="p-8 text-center space-y-3 bg-[#faf5ed] rounded-2xl border border-[#ebdcd0]">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif-display font-bold text-lg text-[#2a170e]">
                  Pesan Berhasil Disiapkan!
                </h4>
                <p className="text-xs text-[#6e503f]">
                  Jendela WhatsApp Anda sedang terbuka untuk melanjutkan percakapan bersama tim Peavey Coffee.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#3a2216] mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Anda..."
                      className="w-full p-3 rounded-xl border border-[#d6c4b0] bg-[#fcfaf7] text-[#28160e] focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#3a2216] mb-1">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alamat@email.com..."
                      className="w-full p-3 rounded-xl border border-[#d6c4b0] bg-[#fcfaf7] text-[#28160e] focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#3a2216] mb-1">Keperluan / Subjek</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#d6c4b0] bg-[#fcfaf7] text-[#28160e] focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                  >
                    <option value="Konsultasi Biji Kopi Nusantara">Konsultasi Biji Kopi Nusantara (Rekomendasi Seduh)</option>
                    <option value="Pemesanan Kopi Skala Kedai / Kafe (B2B)">Pemesanan Kopi Skala Kedai / Kafe (B2B)</option>
                    <option value="Pertanyaan Pengiriman & Ekspedisi">Pertanyaan Pengiriman & Ekspedisi</option>
                    <option value="Kunjungan Roastery Dago">Reservasi Kunjungan Roastery Dago</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#3a2216] mb-1">Pesan Anda *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pertanyaan Anda secara detail, misalnya asal daerah kopi yang diminati..."
                    className="w-full p-3 rounded-xl border border-[#d6c4b0] bg-[#fcfaf7] text-[#28160e] focus:outline-none focus:ring-2 focus:ring-amber-700/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#963f17] hover:bg-[#7e3412] text-white font-bold text-xs sm:text-sm shadow transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan ke Tim Peavey Coffee</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
