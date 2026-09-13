import { CustomerReview, CustomerGalleryItem } from '../types';

export const BRAND_INFO = {
  name: 'Peavey Coffee',
  tagline: 'Harmoni Cita Rasa Kopi Nusantara di Setiap Seduhan',
  subTagline: 'Biji Kopi Pilihan dari Sabang sampai Merauke • Fresh Roasted di Dago, Bandung',
  establishedYear: '2021',
  phone: '085155292232',
  whatsappUrl: 'https://wa.me/6285155292232?text=Halo%20Peavey%20Coffee,%20saya%20tertarik%20dengan%20produk%20kopi%20Indonesia%20pilihan%20Anda',
  email: 'info@nandapeavey.web.id',
  instagram: '@peaveycoffee',
  instagramUrl: 'https://instagram.com/peaveycoffee',
  address: 'Jl. Ir. H. Juanda (Dago), Kecamatan Coblong, Kota Bandung, Jawa Barat 40135',
  hours: 'Senin - Minggu: 08.00 - 22.00 WIB',
  originCount: 19,
  happyCustomersCount: '12.800+'
};

export const ABOUT_US = {
  nameMeaning: {
    title: 'Harmoni Nada & Presisi Roasting',
    content: 'Nama "Peavey" terinspirasi dari harmoni nada musik dan ketelitian seni akustik. Seperti halnya menyelaraskan frekuensi suara agar tercipta alunan simfoni yang merdu, kami di Peavey Coffee memperlakukan setiap varietas biji kopi Indonesia dengan ketelitian kurva sangrai (roast profile) yang presisi. Kami percaya bahwa setiap butir kopi memiliki karakter nada rasa unik yang menunggu untuk dibunyikan.'
  },
  logoMeaning: {
    title: 'Biji Kopi, Gelombang Aroma & Lingkaran Gotong Royong',
    content: 'Logo Peavey Coffee memadukan siluet biji kopi nusantara dengan tiga garis gelombang kehangatan uap seduhan yang melingkar dinamis tanpa ujung. Ini menyimbolkan tiga pilar utama kami: Petani Kopi Lokal, Roaster Berdedikasi di Dago Bandung, dan Sahabat Penikmat Kopi di seluruh penjuru Indonesia yang terhubung dalam satu lingkaran kekeluargaan yang hangat.'
  },
  vision: 'Menjadi representasi kebanggaan kopi nusantara terdepan yang mengangkat derajat biji kopi lokal Indonesia ke pentas dunia melalui transparansi asal-usul (traceability) dan kualitas roasting kelas kompetisi.',
  missions: [
    'Menghubungkan langsung penikmat kopi dengan kelompok tani kopi lestari dari Sabang hingga Merauke tanpa perantara panjang.',
    'Menerapkan standar batch fresh-roasting mingguan di Roastery Dago dengan teknologi kemasan one-way valve nitrogen flush.',
    'Memberikan edukasi seduh rumahan yang inklusif dan ramah untuk mengapresiasi kekayaan ragam cita rasa kopi asli Indonesia.'
  ],
  stats: [
    { value: '19', label: 'Single Origin Nusantara' },
    { value: '100%', label: 'Biji Kopi Murni Asli' },
    { value: '48 Jam', label: 'Maksimal Usia Fresh Roast' },
    { value: '4.9 / 5', label: 'Kepuasan Ribuan Pelanggan' }
  ]
};

export const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Rizki',
    role: 'Pecinta Manual Brew & Pelanggan Setia Dago',
    city: 'Bandung',
    rating: 5,
    productName: 'Kopi Gayo (Aceh) Arabika & Java Preanger',
    comment: 'Udah repeat order 4 kali di Peavey Coffee! Biji Kopi Gayo Arabika dan Java Preanger-nya selalu fresh roast. Karakter fruity dan floral-nya clean banget pas diseduh V60, gak ada rasa gosong sama sekali. Fitur pelacakan pesanannya juga responsif dan kemasannya super kedap udara!',
    date: '3 hari yang lalu',
    verifiedPurchase: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    likesCount: 38
  },
  {
    id: 'rev-2',
    author: 'Dimas Wicaksono',
    role: 'Owner Kedai Kopi Sudut',
    city: 'Jakarta Selatan',
    rating: 5,
    productName: 'Kopi Robusta Lampung Robusta',
    comment: 'Beli paket 5kg untuk base es kopi susu di cafe saya. Robusta Lampung-nya juara! Crema-nya tebal keemasan, bitterness-nya dark chocolate lembut dan berpadu pas dengan gula aren. Harga 100rb/kg sangat masuk akal untuk kualitas seistimewa ini.',
    date: '1 minggu yang lalu',
    verifiedPurchase: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    photoUrl: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=600&q=80',
    likesCount: 24
  },
  {
    id: 'rev-3',
    author: 'Anindya Putri',
    role: 'Home Brewer',
    city: 'Surabaya',
    rating: 5,
    productName: 'Kopi Kintamani (Bali) Arabika',
    comment: 'Notes orange peel dan citrus-nya luar biasa segar! Diseduh Japanese Iced Drip di cuaca panas Surabaya langsung bikin segar. Pengiriman dari Bandung ke Surabaya cuma 1 hari via Paxel. Puas banget belanja di Peavey!',
    date: '2 minggu yang lalu',
    verifiedPurchase: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    likesCount: 19
  },
  {
    id: 'rev-4',
    author: 'Bambang Sudibyo',
    role: 'Kolektor Kopi Specialty',
    city: 'Yogyakarta',
    rating: 5,
    productName: 'Kopi Luwak (Berbagai Daerah) Arabika',
    comment: 'Awalnya ragu beli Luwak online, tapi sertifikat origin dan tasting profile dari Peavey Coffee benar-benar membuktikan kelasnya. Tekstur velvet, aftertaste madu liar dan aroma bunganya sangat halus tanpa rasa asam berlebih.',
    date: '3 minggu yang lalu',
    verifiedPurchase: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    likesCount: 31
  }
];

export const CUSTOMER_GALLERY: CustomerGalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Morning V60 Ritual with Gayo Arabika',
    author: 'Rizki',
    location: 'Dago Atas, Bandung',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    coffeeName: 'Kopi Gayo Arabika',
    brewingMethod: 'Hario V60 (92°C, Ratio 1:15)',
    likes: 124
  },
  {
    id: 'gal-2',
    title: 'Weekend Cupping & Sharing Session',
    author: 'Peavey Community',
    location: 'Kedai Peavey Dago Bandung',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    coffeeName: 'Kopi Toraja & Wamena',
    brewingMethod: 'Blind Cupping Table',
    likes: 98
  },
  {
    id: 'gal-3',
    title: 'Japanese Iced Coffee with Bali Kintamani',
    author: 'Anindya P.',
    location: 'Surabaya Timur',
    imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
    coffeeName: 'Kopi Kintamani Arabika',
    brewingMethod: 'Flash Brew over Rock Ice',
    likes: 85
  },
  {
    id: 'gal-4',
    title: 'Golden Espresso Extraction',
    author: 'Dimas W.',
    location: 'Tebet, Jakarta',
    imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    coffeeName: 'Java Preanger Robusta Blend',
    brewingMethod: 'Commercial Espresso (9 Bar)',
    likes: 142
  },
  {
    id: 'gal-5',
    title: 'Unboxing Fresh Beans Valve Bag',
    author: 'Farhan Maulana',
    location: 'Semarang',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    coffeeName: 'Flores Bajawa & Sidikalang',
    brewingMethod: 'Whole Bean Stash',
    likes: 67
  },
  {
    id: 'gal-6',
    title: 'Aeropress Inverted Method on Rainy Day',
    author: 'Tania Citra',
    location: 'Ciumbuleuit, Bandung',
    imageUrl: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80',
    coffeeName: 'Kopi Wamena Arabika',
    brewingMethod: 'Inverted Aeropress',
    likes: 115
  }
];

export const INITIAL_TRACKING_ORDERS = [
  {
    orderId: 'PVC-2026-8821',
    customerName: 'Rizki',
    customerCity: 'Bandung (Dago)',
    itemsSummary: 'Kopi Gayo Arabika (500g, Giling Medium)',
    courier: 'JNE Express - REG',
    trackingNumber: 'JNE-BDO-8891029',
    currentStatus: 'shipping' as const,
    updatedAgo: '15 menit yang lalu'
  },
  {
    orderId: 'PVC-2026-7492',
    customerName: 'Sarah Amalia',
    customerCity: 'Jakarta Selatan',
    itemsSummary: 'Kopi Java Preanger Arabika (1kg, Biji Utuh)',
    courier: 'SiCepat BEST',
    trackingNumber: 'SCP-BDO-9920194',
    currentStatus: 'packing' as const,
    updatedAgo: '1 jam yang lalu'
  }
];
