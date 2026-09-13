import React, { useState } from 'react';
import { Truck, Search, CheckCircle2, Clock, Flame, Package, MapPin, Copy, Check, Sparkles, AlertCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { Order, OrderProgressStep, TrackingStep } from '../types';
import { BRAND_INFO } from '../data/reviewsAndExperience';

interface OrderTrackingSectionProps {
  initialOrders?: Order[];
  activeOrderId?: string | null;
}

const DEFAULT_DEMO_ORDER: Order = {
  orderId: 'PVC-2026-8821',
  createdAt: 'Hari ini, 09:15 WIB',
  customerName: 'Rizki',
  customerPhone: '081234567890',
  customerEmail: 'rizki.coffee@gmail.com',
  shippingAddress: 'Jl. Dago Atas No. 45, Kecamatan Coblong',
  city: 'Kota Bandung, Jawa Barat',
  postalCode: '40135',
  courier: 'JNE Express - REG (Roastery Dago Pick-Up)',
  trackingNumber: 'JNE-BDO-88910298',
  items: [],
  subtotal: 300000,
  shippingFee: 0,
  discount: 45000,
  total: 255000,
  paymentMethod: 'qris',
  paymentStatus: 'paid',
  orderStatus: 'shipping',
  estimatedDelivery: 'Hari ini (Estimasi 14.00 - 17.00 WIB)',
  timeline: [
    {
      status: 'confirmed',
      title: 'Pembayaran Terverifikasi',
      desc: 'Pesanan diterima & diverifikasi sistem otomatis QRIS.',
      location: 'Roastery Peavey Dago, Bandung',
      timestamp: '09:15 WIB',
      completed: true,
      current: false
    },
    {
      status: 'roasting',
      title: 'Fresh Roasting & Profiling',
      desc: 'Biji kopi disangrai batch segar sesuai kurva roast profile.',
      location: 'Dago Roasting Workshop, Bandung',
      timestamp: '10:30 WIB',
      completed: true,
      current: false
    },
    {
      status: 'packing',
      title: 'Nitrogen-Flush Sealing',
      desc: 'Pengemasan kantong valve kedap udara dengan gas nitrogen untuk menjaga aroma.',
      location: 'Fulfillment Dago, Bandung',
      timestamp: '11:45 WIB',
      completed: true,
      current: false
    },
    {
      status: 'shipping',
      title: 'Diserahkan ke Kurir Ekspedisi',
      desc: 'Paket dalam perjalanan transit menuju alamat penerima.',
      location: 'Hub Kurir Dago, Bandung',
      timestamp: '12:30 WIB',
      completed: true,
      current: true
    },
    {
      status: 'delivered',
      title: 'Pesanan Diterima di Lokasi',
      desc: 'Paket kopi nusantara selamat sampai di tangan penikmat kopi.',
      location: 'Alamat Tujuan Pembeli',
      timestamp: 'Estimasi 16:00 WIB',
      completed: false,
      current: false
    }
  ]
};

export const OrderTrackingSection: React.FC<OrderTrackingSectionProps> = ({
  initialOrders = [],
  activeOrderId
}) => {
  // Combine default demo order with any recently created order
  const [currentOrder, setCurrentOrder] = useState<Order>(() => {
    if (activeOrderId) {
      const found = initialOrders.find(o => o.orderId === activeOrderId);
      if (found) return found;
    }
    return initialOrders.length > 0 ? initialOrders[0] : DEFAULT_DEMO_ORDER;
  });

  const [searchInput, setSearchInput] = useState('');
  const [copiedResi, setCopiedResi] = useState(false);
  const [simulationNotice, setSimulationNotice] = useState<string | null>(null);

  // Quick order list
  const availableOrders = initialOrders.length > 0 ? initialOrders : [DEFAULT_DEMO_ORDER];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (!query) return;

    const matched = availableOrders.find(
      o => o.orderId.toUpperCase() === query || o.trackingNumber.toUpperCase() === query
    );

    if (matched) {
      setCurrentOrder(matched);
      setSimulationNotice(null);
    } else {
      setSimulationNotice(`Pesanan dengan nomor "${query}" tidak ditemukan. Silakan coba: PVC-2026-8821`);
    }
  };

  const handleCopyResi = () => {
    navigator.clipboard.writeText(currentOrder.trackingNumber);
    setCopiedResi(true);
    setTimeout(() => setCopiedResi(false), 2000);
  };

  // Real-time status simulation: advances order progress step
  const handleSimulateNextStep = () => {
    const steps: OrderProgressStep[] = ['confirmed', 'roasting', 'packing', 'shipping', 'delivered'];
    const currentIndex = steps.indexOf(currentOrder.orderStatus);

    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

      const updatedTimeline = currentOrder.timeline.map((item, idx) => {
        if (idx < currentIndex + 1) {
          return { ...item, completed: true, current: false };
        } else if (idx === currentIndex + 1) {
          return { ...item, completed: true, current: true, timestamp: timeStr };
        } else {
          return { ...item, completed: false, current: false };
        }
      });

      setCurrentOrder({
        ...currentOrder,
        orderStatus: nextStep,
        timeline: updatedTimeline
      });
      setSimulationNotice(`Status berhasil diperbarui secara real-time ke tahap: ${updatedTimeline[currentIndex + 1].title}`);
    } else {
      setSimulationNotice('Pesanan sudah berada di status akhir: Telah Sampai di Tujuan!');
    }
  };

  const formatRupiah = (val: number) => {
    return 'Rp' + val.toLocaleString('id-ID');
  };

  return (
    <section id="tracking" className="py-16 sm:py-24 bg-[#f8f3eb] border-b border-[#e5d9ca]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#faeedf] text-[#8e421e] text-xs font-bold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Real-Time Logistics Tracker</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b170e]">
            Pelacakan Pesanan Real-Time
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6b4c3b] leading-relaxed">
            Pantau setiap detik perjalanan biji kopi Anda dari proses sangrai di Dago hingga kurir mengetuk pintu rumah Anda.
          </p>
        </div>

        {/* Tracker Search Bar & Quick Buttons */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8a6854] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Masukkan Nomor Pesanan (Contoh: PVC-2026-8821 atau No. Resi)..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-xs sm:text-sm text-[#2b170f] placeholder-[#9c7d6b] border border-[#d6c4b0] shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-700/50"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-[#963f17] hover:bg-[#7e3412] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors shrink-0"
            >
              Lacak Sekarang
            </button>
          </form>

          {/* Quick Order Suggestions */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-[#705241]">
            <span className="font-semibold">Coba Lacak Contoh:</span>
            {availableOrders.map((ord) => (
              <button
                key={ord.orderId}
                type="button"
                onClick={() => {
                  setCurrentOrder(ord);
                  setSearchInput(ord.orderId);
                  setSimulationNotice(null);
                }}
                className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] transition-colors ${
                  currentOrder.orderId === ord.orderId
                    ? 'bg-[#3b2014] text-amber-200 border-[#3b2014]'
                    : 'bg-white text-[#523728] border-[#d8c7b4] hover:bg-[#faede1]'
                }`}
              >
                {ord.orderId} ({ord.customerName})
              </button>
            ))}
          </div>

          {simulationNotice && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs flex items-center justify-between">
              <span>{simulationNotice}</span>
              <button onClick={() => setSimulationNotice(null)} className="font-bold underline ml-2">
                Tutup
              </button>
            </div>
          )}
        </div>

        {/* Real-Time Order Status Dashboard */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#ded1c0] shadow-md space-y-8">
          {/* Order Header Card */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#ebdcd0]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#8c421e] bg-[#f8ecdf] px-2.5 py-1 rounded-md">
                  ID: {currentOrder.orderId}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Pembayaran Terverifikasi
                </span>
              </div>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2b170e] mt-2">
                Pesanan untuk {currentOrder.customerName}
              </h3>
              <p className="text-xs text-[#705241] mt-0.5">
                Dibuat pada {currentOrder.createdAt} • Tujuan: {currentOrder.city}
              </p>
            </div>

            {/* Courier & Tracking Resi Badge */}
            <div className="bg-[#faf6f0] p-3.5 rounded-2xl border border-[#ded0be] text-xs space-y-1 sm:text-right">
              <span className="text-[11px] text-[#7a5b48] block">Kurir Pengiriman:</span>
              <span className="font-bold text-[#2e1910] block">{currentOrder.courier}</span>
              <div className="flex items-center sm:justify-end gap-1.5 pt-1">
                <span className="font-mono text-[11px] text-[#8c4623]">{currentOrder.trackingNumber}</span>
                <button
                  type="button"
                  onClick={handleCopyResi}
                  className="p-1 rounded hover:bg-[#ece0d2] text-[#4d3223]"
                  title="Salin nomor resi"
                >
                  {copiedResi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Stepper Progress Timeline */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#2b170e] flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Tahapan Pemrosesan & Pengiriman Real-Time</span>
              </h4>

              {/* Simulation button */}
              <button
                type="button"
                onClick={handleSimulateNextStep}
                className="px-3 py-1.5 rounded-lg bg-[#3b2014] hover:bg-[#2c170e] text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                title="Klik untuk memajukan status pengiriman ke tahap berikutnya secara instan"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulasikan Status Selanjutnya</span>
              </button>
            </div>

            {/* Vertical timeline steps */}
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#ded1c0]">
              {currentOrder.timeline.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Step Bullet */}
                  <div
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                      step.current
                        ? 'bg-amber-600 text-white ring-4 ring-amber-200 scale-110'
                        : step.completed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#e5d8ca] text-[#7e6252]'
                    }`}
                  >
                    {step.completed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>

                  <div className={`p-4 rounded-xl border transition-all ${
                    step.current
                      ? 'bg-[#faede1] border-amber-600 shadow-sm'
                      : step.completed
                      ? 'bg-[#fcfaf7] border-[#ded0be]'
                      : 'bg-white border-[#ece2d6] opacity-60'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <h5 className={`text-sm font-bold ${step.current ? 'text-[#8c3d19]' : 'text-[#2b170e]'}`}>
                          {step.title}
                        </h5>
                        {step.current && (
                          <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-amber-500 text-[#211209] animate-pulse">
                            Sedang Berjalan
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-medium text-[#7a5c49]">
                        {step.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-[#5c3e2e] mt-1">
                      {step.desc}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-[#8a6855] mt-2">
                      <MapPin className="w-3 h-3 text-amber-700" />
                      <span>{step.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipment Summary Box */}
          <div className="bg-[#faf6f0] rounded-2xl p-5 border border-[#ded0be] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-[#2e1910] block mb-1">Alamat Pengiriman:</span>
              <p className="text-[#694c3b]">
                {currentOrder.shippingAddress}, {currentOrder.city} {currentOrder.postalCode}
              </p>
              <p className="text-[#8c654f] mt-1">Kontak: {currentOrder.customerPhone}</p>
            </div>
            <div>
              <span className="font-bold text-[#2e1910] block mb-1">Estimasi Tiba:</span>
              <p className="text-emerald-800 font-bold">{currentOrder.estimatedDelivery}</p>
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`${BRAND_INFO.whatsappUrl}%20Pertanyaan%20Pesanan%20${currentOrder.orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#963f17] hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Bantuan Kurir via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
