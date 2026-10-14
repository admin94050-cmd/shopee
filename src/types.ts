export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  rating: number;
  soldCount: string;
  soldProgressPercent?: number;
  soldStatusText?: string;
  shopName: string;
  shopType: 'Mall' | 'ร้านแนะนำ' | 'ขายดี' | 'ทั่วไป';
  tags: string[];
  category: string;
  variants?: string[];
  description?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  shopName: string;
  shopType: 'Mall' | 'Preferred+' | 'ทั่วไป';
  variant: string;
  variantsList?: string[];
  quantity: number;
  selected: boolean;
  shopVoucherText?: string;
  shopVoucherClaimed?: boolean;
}

export interface Voucher {
  id: string;
  title: string;
  description: string;
  discountAmount: number;
  type: 'shipping' | 'cashback' | 'discount';
  minSpend: number;
  claimed: boolean;
}

export interface UserProfile {
  name: string;
  username: string;
  phone: string;
  email: string;
  avatar: string;
  memberTier: 'Gold' | 'Platinum' | 'Silver';
  coins: number;
  vouchersCount: number;
  followedShops: number;
  isLoggedIn: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'order' | 'promo' | 'activity';
  title: string;
  description: string;
  time: string;
  read: boolean;
  image?: string;
}
