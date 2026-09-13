import React, { useState } from 'react';
import { Star, MessageSquarePlus, ThumbsUp, Heart, CheckCircle2, Coffee, Camera, Sparkles, Filter, X } from 'lucide-react';
import { CustomerReview, CustomerGalleryItem } from '../types';
import { INITIAL_REVIEWS, CUSTOMER_GALLERY } from '../data/reviewsAndExperience';
import { COFFEE_PRODUCTS } from '../data/coffeeProducts';

export const CustomerExperienceSection: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [galleryItems, setGalleryItems] = useState<CustomerGalleryItem[]>(CUSTOMER_GALLERY);
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'reviews' | 'gallery'>('reviews');

  // Modal State for New Review
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [role, setRole] = useState('Pecinta Kopi Rumahan');
  const [city, setCity] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(COFFEE_PRODUCTS[0].name);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Gallery like handler
  const handleLikeGallery = (id: string) => {
    setGalleryItems(prev =>
      prev.map(item => item.id === id ? { ...item, likes: item.likes + 1 } : item)
    );
  };

  // Review like handler
  const handleLikeReview = (id: string) => {
    setReviews(prev =>
      prev.map(rev => rev.id === id ? { ...rev, likesCount: rev.likesCount + 1 } : rev)
    );
  };

  // Submit new review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      role: role.trim() || 'Penikmat Kopi Nusantara',
      city: city.trim() || 'Indonesia',
      rating,
      productName: selectedProduct,
      comment: comment.trim(),
      date: 'Baru saja',
      verifiedPurchase: true,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      likesCount: 1
    };

    setReviews([newRev, ...reviews]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsReviewModalOpen(false);
      setAuthorName('');
      setComment('');
      setCity('');
    }, 1200);
  };

  const filteredReviews = ratingFilter === 'all'
    ? reviews
    : reviews.filter(r => r.rating === ratingFilter);

  return (
    <section id="experience" className="py-16 sm:py-24 bg-[#faf5ed] border-b border-[#e5d8c7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f0dfcc] text-[#8c401c] text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 fill-amber-700" />
            <span>Kepercayaan & Kebersamaan</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b170e]">
            Customer Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6b4c3b] leading-relaxed">
            Cerita tulus dari ribuan penikmat kopi yang telah merasakan kehangatan dan kesegaran 
            roasting Peavey Coffee dari Dago ke seluruh pelosok tanah air.
          </p>
        </div>

        {/* Featured Review Spotlight: Rizki (highlighted as specifically requested) */}
        <div className="bg-gradient-to-br from-[#2f1910] to-[#1e0f09] text-white rounded-3xl p-6 sm:p-10 border border-[#4d2c1c] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg border border-[#52301f]">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
                  alt="Seduhan Manual Brew V60 Rizki"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] text-amber-200">
                  📍 Dago Atas, Bandung
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold ml-1 text-white">5.0 / 5.0 (Verified Buyer)</span>
                </div>
                <span className="text-xs text-[#bfa18d] bg-[#3a1f14] px-2.5 py-1 rounded-full border border-[#4f2c1c]">
                  Testimoni Pelanggan Setia
                </span>
              </div>

              <blockquote className="font-serif-display text-lg sm:text-xl text-[#f7eade] italic leading-relaxed">
                "Udah repeat order 4 kali di Peavey Coffee! Biji Kopi Gayo Arabika dan Java Preanger-nya selalu fresh roast. Karakter fruity dan floral-nya clean banget pas diseduh V60, gak ada rasa gosong sama sekali. Fitur pelacakan pesanannya juga responsif dan kemasannya super kedap udara!"
              </blockquote>

              <div className="flex items-center justify-between pt-2 border-t border-[#462719]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-base shadow">
                    R
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Rizki</h4>
                    <p className="text-xs text-amber-300">Pecinta Manual Brew & Pelanggan Setia Dago, Bandung</p>
                  </div>
                </div>

                <button
                  onClick={() => handleLikeReview('rev-1')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3d2215] hover:bg-[#4f2d1c] text-xs text-amber-200 border border-[#54311e] transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Bermanfaat ({reviews[0]?.likesCount || 38})</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selector & Write Review Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#ded0bf] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('reviews')}
              id="tab-reviews-btn"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'reviews'
                  ? 'bg-[#3b2014] text-amber-200 shadow-sm'
                  : 'bg-white text-[#523526] hover:bg-[#ede0d0] border border-[#d6c5b2]'
              }`}
            >
              <Coffee className="w-4 h-4" />
              <span>Ulasan Pembeli ({reviews.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              id="tab-gallery-btn"
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#3b2014] text-amber-200 shadow-sm'
                  : 'bg-white text-[#523526] hover:bg-[#ede0d0] border border-[#d6c5b2]'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Galeri Foto Pengguna ({galleryItems.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            id="open-write-review-btn"
            className="px-4 py-2.5 rounded-xl bg-[#963f17] hover:bg-[#7e3412] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Tulis Pengalaman Ngopi Kamu</span>
          </button>
        </div>

        {/* View 1: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Filter by star rating */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[#694b39] font-bold shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter Rating:
              </span>
              <button
                onClick={() => setRatingFilter('all')}
                className={`px-3 py-1 rounded-full font-semibold shrink-0 ${
                  ratingFilter === 'all'
                    ? 'bg-[#963f17] text-white'
                    : 'bg-white text-[#5c3e2e] border border-[#d6c5b2]'
                }`}
              >
                Semua Bintang
              </button>
              {[5, 4, 3].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingFilter(star)}
                  className={`px-3 py-1 rounded-full font-semibold flex items-center gap-1 shrink-0 ${
                    ratingFilter === star
                      ? 'bg-[#963f17] text-white'
                      : 'bg-white text-[#5c3e2e] border border-[#d6c5b2]'
                  }`}
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{star} Bintang</span>
                </button>
              ))}
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-[#ded0bf] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={rev.avatarUrl}
                          alt={rev.author}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-[#d4c1ad]"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-sm text-[#2b170e]">{rev.author}</h4>
                            {rev.verifiedPurchase && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                          </div>
                          <p className="text-[11px] text-[#785947]">
                            {rev.role} • {rev.city}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#faf5ed] px-2.5 py-1 rounded text-[11px] text-[#8c4723] font-semibold inline-block">
                      {rev.productName}
                    </div>

                    <p className="text-xs text-[#523829] leading-relaxed">
                      "{rev.comment}"
                    </p>

                    {rev.photoUrl && (
                      <div className="h-32 rounded-xl overflow-hidden mt-2">
                        <img
                          src={rev.photoUrl}
                          alt="Foto seduhan ulasan"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#ede2d5] mt-4 flex items-center justify-between text-[11px] text-[#856552]">
                    <span>{rev.date}</span>
                    <button
                      onClick={() => handleLikeReview(rev.id)}
                      className="flex items-center gap-1 text-[#6b4733] hover:text-[#963f17]"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{rev.likesCount} Orang Terbantu</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View 2: Customer Photo Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-[#70503e]">
              <p>Momen seduh kopi Indonesia dari para penikmat Peavey Coffee.</p>
              <span className="font-semibold text-[#8c4623]">Tag kami di Instagram @peaveycoffee</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#ded0bf] shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative h-60 overflow-hidden bg-[#24130b]">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] text-amber-300 uppercase font-bold block">
                        {item.location}
                      </span>
                      <h4 className="font-serif-display text-sm font-bold line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#dec2ae] mt-0.5">
                        Metode: {item.brewingMethod}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between text-xs border-t border-[#f0e4d7]">
                    <div>
                      <span className="font-bold text-[#2e190f] block">{item.author}</span>
                      <span className="text-[11px] text-[#8a6854]">{item.coffeeName}</span>
                    </div>

                    <button
                      onClick={() => handleLikeGallery(item.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#faf4ec] hover:bg-[#f2e6d6] text-[#823a19] font-bold border border-[#e0cfbe] transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      <span>{item.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Write Review */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-[#faf7f2] rounded-2xl max-w-lg w-full p-6 border border-[#ded1c0] shadow-2xl relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#ede0ce] text-[#422618] hover:bg-[#dfcfbc] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-4">
              <span className="text-xs font-bold text-[#963f17] uppercase tracking-wider">
                Pengalaman Kamu Berharga
              </span>
              <h3 className="font-serif-display text-xl font-bold text-[#29160d]">
                Tulis Ulasan Kopi Peavey
              </h3>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif-display font-bold text-lg text-[#25150d]">
                  Terima Kasih Banyak!
                </h4>
                <p className="text-xs text-[#6e503f]">
                  Ulasan kamu telah berhasil dipublikasikan di galeri customer experience.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-[#3d2417] mb-1">Nama Lengkap / Panggilan *</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Contoh: Rizki / Budi"
                    className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f] focus:ring-1 focus:ring-amber-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#3d2417] mb-1">Peran / Julukan</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Pecinta V60"
                      className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#3d2417] mb-1">Kota Asal</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bandung"
                      className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#3d2417] mb-1">Kopi yang Diseduh</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f]"
                  >
                    {COFFEE_PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.name}>
                        {prod.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#3d2417] mb-1">Rating Kepuasan</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <button
                        type="button"
                        key={st}
                        onClick={() => setRating(st)}
                        className="p-1 text-amber-500 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            st <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-bold text-[#2e1910] ml-2">{rating} dari 5 Bintang</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#3d2417] mb-1">Cerita & Rasa Kopi *</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Bagikan kesan aroma, rasa seduhan, atau kecepatan pengiriman..."
                    className="w-full p-2.5 rounded-lg border border-[#d6c4b0] bg-white text-[#2a170f]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#963f17] hover:bg-[#7e3412] text-white font-bold text-xs shadow transition-colors"
                >
                  Kirim Ulasan Sekarang
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
