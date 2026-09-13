export type CoffeeVariety = 'Arabika' | 'Robusta' | 'Luwak';

export type GrindOption = 
  | 'Biji Utuh' 
  | 'Giling Kasar (Cold Brew / French Press)' 
  | 'Giling Medium (V60 / Aeropress / Filter)' 
  | 'Giling Halus (Espresso / Moka Pot / Tubruk)';

export type PackageWeight = 250 | 500 | 1000;

export interface Product {
  id: string;
  name: string;
  region: string;
  island: 'Sumatera' | 'Jawa' | 'Bali' | 'NTT' | 'Sulawesi' | 'Papua' | 'Nasional';
  variety: CoffeeVariety;
  pricePerKg: number;
  description: string;
  flavorNotes: string[];
  altitude: string;
  process: string;
  roastLevel: 'Light Medium' | 'Medium' | 'Medium Dark' | 'Dark';
  acidity: number; // 1 to 5
  body: number; // 1 to 5
  sweetness: number; // 1 to 5
  aroma: number; // 1 to 5
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isBestSeller?: boolean;
  isSpecialty?: boolean;
  stockStatus: 'Ready Stock' | 'Fresh Roasted Today';
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  grindSize: GrindOption;
  weightGram: PackageWeight;
  quantity: number;
  unitPrice: number;
}

export type PaymentMethod = 
  | 'qris' 
  | 'bca_va' 
  | 'mandiri_va' 
  | 'bri_va' 
  | 'gopay' 
  | 'ovo' 
  | 'credit_card';

export type OrderProgressStep = 
  | 'confirmed' 
  | 'roasting' 
  | 'packing' 
  | 'shipping' 
  | 'delivered';

export interface TrackingStep {
  status: OrderProgressStep;
  title: string;
  desc: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  courier: string;
  trackingNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'expired';
  orderStatus: OrderProgressStep;
  timeline: TrackingStep[];
  estimatedDelivery: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  city: string;
  rating: number;
  productName: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  avatarUrl: string;
  photoUrl?: string;
  likesCount: number;
}

export interface CustomerGalleryItem {
  id: string;
  title: string;
  author: string;
  location: string;
  imageUrl: string;
  coffeeName: string;
  brewingMethod: string;
  likes: number;
}
