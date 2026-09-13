import React, { useState, useEffect } from 'react';
import { X, QrCode, CreditCard, Building2, Wallet, CheckCircle2, Copy, Check, Clock, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, PaymentMethod, Order, TrackingStep } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  onPaymentSuccess: (order: Order) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  shippingFee,
  discount,
  total,
  onPaymentSuccess
}) => {
  const [method, setMethod] = useState<PaymentMethod>('qris');
  const [name, setName] = useState('Rizki');
  const [phone, setPhone] = useState('085155292232');
  const [email, setEmail] = useState('info@nandapeavey.web.id');
  const [address, setAddress] = useState('Jl. Ir. H. Juanda No. 128, Dago');
  const [city, setCity] = useState('Bandung, Jawa Barat');
  const [postalCode, setPostalCode] = useState('40135');
  const [courier, setCourier] = useState('JNE Express - REG (Roastery Dago Pick-Up)');
  
  const [copiedVA, setCopiedVA] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(899); // 14:59

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatRupiah = (val: number) => {
    return 'Rp' + val.toLocaleString('id-ID');
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getVANumber = () => {
    switch (method) {
      case 'bca_va': return '8271 0851 5529 2232';
      case 'mandiri_va': return '8890 0851 5529 2232';
      case 'bri_va': return '1289 0851 5529 2232';
      default: return '8271 0851 5529 2232';
    }
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText(getVANumber().replace(/\s/g, ''));
    setCopiedVA(true);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  const handleConfirmPayment = () => {
    if (!name.trim() || !address.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }

      // Generate realistic order
      const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
      const newOrderId = `PVC-2026-${randomOrderNum}`;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

      const initialTimeline: TrackingStep[] = [
        {
          status: 'confirmed',
          title: 'Pembayaran Terverifikasi',
          desc: `Pembayaran ${formatRupiah(total)} sukses via ${method.toUpperCase()}. Pesanan resmi masuk antrean roastery.`,
          location: 'Roastery Peavey Dago, Bandung',
          timestamp: timeStr,
          completed: true,
          current: true
        },
        {
          status: 'roasting',
          title: 'Fresh Roasting & Profiling',
          desc: 'Tim roaster Dago menyiapkan biji kopi segar sesuai kurva sangrai.',
          location: 'Dago Roasting Workshop, Bandung',
          timestamp: 'Menunggu antrean',
          completed: false,
          current: false
        },
        {
          status: 'packing',
          title: 'Nitrogen-Flush Sealing',
          desc: 'Pengemasan kantong valve kedap udara dengan gas nitrogen.',
          location: 'Fulfillment Dago, Bandung',
          timestamp: 'Menunggu antrean',
          completed: false,
          current: false
        },
        {
          status: 'shipping',
          title: 'Diserahkan ke Kurir Ekspedisi',
          desc: `Paket diserahkan ke ${courier}.`,
          location: 'Hub Kurir Dago, Bandung',
          timestamp: 'Menunggu antrean',
          completed: false,
          current: false
        },
        {
          status: 'delivered',
          title: 'Pesanan Diterima di Lokasi',
          desc: 'Paket kopi nusantara tiba di tujuan.',
          location: address,
          timestamp: 'Estimasi 1-2 Hari',
          completed: false,
          current: false
        }
      ];

      const newOrder: Order = {
        orderId: newOrderId,
        createdAt: `Hari ini, ${timeStr}`,
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        shippingAddress: address,
        city: city,
        postalCode: postalCode,
        courier: courier,
        trackingNumber: `PEAVEY-${courier.split(' ')[0]}-${randomOrderNum}89`,
        items: [...cartItems],
        subtotal,
        shippingFee,
        discount,
        total,
        paymentMethod: method,
        paymentStatus: 'paid',
        orderStatus: 'confirmed',
        timeline: initialTimeline,
        estimatedDelivery: '1 - 2 Hari Kerja'
      };

      setTimeout(() => {
        onPaymentSuccess(newOrder);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-[#faf7f2] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#ded0bf] my-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#2a170f] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#472719]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#963f17] text-amber-200 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg sm:text-xl font-bold">
                Payment Gateway Peavey Coffee
              </h3>
              <p className="text-xs text-[#d6b7a2]">
                Transaksi Aman 256-Bit SSL • Terverifikasi Otomatis
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

        {paymentSuccess ? (
          <div className="p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-serif-display text-2xl font-bold text-[#2b170e]">
              Pembayaran Sukses Terverifikasi!
            </h4>
            <p className="text-xs sm:text-sm text-[#6b4b39] max-w-md mx-auto">
              Terima kasih, <strong>{name}</strong>! Pesanan Anda telah resmi diterima oleh Roastery Peavey Coffee Dago. 
              Mengalihkan ke halaman Pelacakan Pesanan Real-Time...
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-[#f3e7da] text-[#8c431f] px-3 py-1.5 rounded-lg">
              <Sparkles className="w-3.5 h-3.5" /> Menyiapkan Nomor Resi Pengiriman
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto space-y-6 text-xs">
            {/* Payment Timer Notice */}
            <div className="bg-[#f0e3d2] p-3 rounded-xl border border-[#ded0bf] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#4d2f1f] font-semibold">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Batas Waktu Pembayaran:</span>
              </div>
              <span className="font-mono text-sm font-bold text-[#8c3d19] bg-white px-2 py-0.5 rounded border border-[#dfcfbd]">
                {formatTimer(timeLeft)}
              </span>
            </div>

            {/* Total Payment Highlight */}
            <div className="bg-white p-4 rounded-2xl border border-[#ded0bf] flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[11px] text-[#785b49] block">Total Tagihan (Termasuk PPN & Ongkir)</span>
                <span className="text-xl font-bold text-[#8c3d19]">{formatRupiah(total)}</span>
              </div>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">
                {cartItems.length} Item Kopi
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="font-bold text-sm text-[#2e190f] block">
                Pilih Metode Pembayaran:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('qris')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    method === 'qris'
                      ? 'bg-[#3b2014] text-amber-200 border-[#3b2014] shadow'
                      : 'bg-white text-[#523829] border-[#ded0be] hover:bg-[#fbf7f2]'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                  <span className="font-bold block">QRIS</span>
                  <span className="text-[10px] opacity-75">BCA, GoPay, OVO</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('bca_va')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    method === 'bca_va'
                      ? 'bg-[#3b2014] text-amber-200 border-[#3b2014] shadow'
                      : 'bg-white text-[#523829] border-[#ded0be] hover:bg-[#fbf7f2]'
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                  <span className="font-bold block">BCA VA</span>
                  <span className="text-[10px] opacity-75">Virtual Account</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('mandiri_va')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    method === 'mandiri_va'
                      ? 'bg-[#3b2014] text-amber-200 border-[#3b2014] shadow'
                      : 'bg-white text-[#523829] border-[#ded0be] hover:bg-[#fbf7f2]'
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                  <span className="font-bold block">Mandiri VA</span>
                  <span className="text-[10px] opacity-75">Livin' by Mandiri</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMethod('gopay')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    method === 'gopay'
                      ? 'bg-[#3b2014] text-amber-200 border-[#3b2014] shadow'
                      : 'bg-white text-[#523829] border-[#ded0be] hover:bg-[#fbf7f2]'
                  }`}
                >
                  <Wallet className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                  <span className="font-bold block">E-Wallet</span>
                  <span className="text-[10px] opacity-75">GoPay / DANA</span>
                </button>
              </div>
            </div>

            {/* Active Payment Method Detail */}
            {method === 'qris' && (
              <div className="bg-white p-5 rounded-2xl border border-[#ded0bf] text-center space-y-3">
                <span className="text-xs font-bold text-[#8c3d19] bg-[#faeee2] px-3 py-1 rounded-full inline-block">
                  Scan QRIS Menggunakan BCA Mobile, GoPay, OVO, DANA, atau ShopeePay
                </span>
                <div className="w-44 h-44 mx-auto p-2 bg-white rounded-xl border-2 border-stone-800 shadow-md flex items-center justify-center">
                  {/* High visual QR Code simulation */}
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=00020101021226580016ID.CO.PEAVEYCOFFEE.WWW0118936009982710851555204581253033605802ID5913PEAVEYCOFFEE6007BANDUNG6304C4F1"
                    alt="QRIS Peavey Coffee"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[11px] text-[#705241]">
                  NMID: ID1020260913982 • Peavey Coffee Dago Bandung
                </p>
              </div>
            )}

            {(method === 'bca_va' || method === 'mandiri_va' || method === 'bri_va') && (
              <div className="bg-white p-5 rounded-2xl border border-[#ded0bf] space-y-3">
                <span className="text-xs font-bold text-[#8c3d19] block">
                  Nomor Virtual Account {method === 'bca_va' ? 'BCA' : 'Mandiri'}:
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf6f0] border border-[#d8c7b4]">
                  <span className="font-mono text-base font-bold text-[#2e190f]">
                    {getVANumber()}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyVA}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#3b2014] text-amber-200 text-xs font-bold"
                  >
                    {copiedVA ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedVA ? 'Tersalin' : 'Salin VA'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-[#705241]">
                  Bisa ditransfer dari m-Banking, ATM, maupun Internet Banking semua bank via transfer antar bank.
                </p>
              </div>
            )}

            {method === 'gopay' && (
              <div className="bg-white p-4 rounded-2xl border border-[#ded0bf] space-y-2">
                <span className="text-xs font-bold text-[#8c3d19] block">E-Wallet Instant Debit:</span>
                <p className="text-xs text-[#523829]">
                  Notifikasi pembayaran instan akan dikirimkan ke nomor terdaftar Anda: <strong>{phone}</strong>.
                </p>
              </div>
            )}

            {/* Shipping Information Form */}
            <div className="space-y-3 pt-2 border-t border-[#ded0bf]">
              <label className="font-bold text-sm text-[#2e190f] block">
                Data Penerima & Alamat Pengiriman:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#452a1b] mb-1">Nama Penerima *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap..."
                    className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#452a1b] mb-1">Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#452a1b] mb-1">Alamat Lengkap *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW..."
                  className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#452a1b] mb-1">Kota / Kabupaten</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Kota..."
                    className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#452a1b] mb-1">Pilihan Kurir</label>
                  <select
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f]"
                  >
                    <option value="JNE Express - REG (Roastery Dago Pick-Up)">JNE Express (Reguler)</option>
                    <option value="SiCepat BEST (Next Day)">SiCepat BEST (Next Day)</option>
                    <option value="Paxel Sameday (Jawa & Bali)">Paxel Sameday Fresh Cold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Pay Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-[#963f17] hover:bg-[#7e3412] text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Memverifikasi Pembayaran Otomatis...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-amber-200" />
                    <span>Konfirmasi & Selesaikan Pembayaran • {formatRupiah(total)}</span>
                  </>
                )}
              </button>
              <p className="text-center text-[10px] text-[#705241] mt-2">
                🔒 Simulasi payment gateway otomatis: Status pesanan dan nomor resi akan langsung aktif.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
