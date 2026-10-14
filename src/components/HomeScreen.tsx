import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { FLASH_PRODUCTS, RECOMMENDED_PRODUCTS } from '../data/mockData';

interface HomeScreenProps {
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onNavigateToCart: () => void;
  cartCount: number;
  cartTotal: number;
  onShowToast: (msg: string) => void;
  searchFilter: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onAddToCart,
  onOpenProduct,
  onNavigateToCart,
  cartCount,
  cartTotal,
  onShowToast,
  searchFilter,
}) => {
  // Flash sale countdown timer state
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 45 * 60 + 15);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<string>('ยอดนิยม');
  const [claimedVouchers, setClaimedVouchers] = useState<Record<string, boolean>>({});
  const [animatingCartBtnId, setAnimatingCartBtnId] = useState<string | null>(null);

  // Live countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 24 * 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  // Hero carousel slides data
  const heroSlides = [
    {
      badge: 'Shopee Mega Day 9.9',
      title: 'ลดสนั่นกลางเดือน!',
      subtitle: 'แจกคูปองลดเพิ่ม ฿500 + โค้ดส่งฟรีทุกออเดอร์',
      tag1: 'ส่งฟรี ฿0',
      tag2: 'คืนคอยน์ 25%',
      gradient: 'from-[#b22204] via-[#d63c1e] to-[#ff5722]',
    },
    {
      badge: 'Shopee Mall Day',
      title: 'แบรนด์แท้ลด 70%',
      subtitle: 'การันตีของแท้ 100% คืนเงิน 2 เท่าถ้าปลอม',
      tag1: 'โค้ดลด ฿1,000',
      tag2: 'ผ่อน 0% 10 เดือน',
      gradient: 'from-[#8d1600] via-[#b22204] to-[#ff5722]',
    },
    {
      badge: 'Super Fashion Week',
      title: 'เสื้อผ้าแฟชั่นลดด่วน!',
      subtitle: 'สตรีทแวร์ มินิมอล ส่งฟรีไม่มีขั้นต่ำ',
      tag1: 'ส่งฟรี ฿0',
      tag2: 'ลดเพิ่ม 20%',
      gradient: 'from-[#b02f00] via-[#d63c1e] to-[#e65100]',
    },
  ];

  const handleClaimVoucher = (name: string) => {
    if (claimedVouchers[name]) {
      onShowToast(`คุณเก็บโค้ด "${name}" ไปแล้ว`);
    } else {
      setClaimedVouchers((prev) => ({ ...prev, [name]: true }));
      onShowToast(`🎉 เก็บโค้ด "${name}" สำเร็จ!`);
    }
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimatingCartBtnId(product.id);
    onAddToCart(product);
    onShowToast(`🛒 เพิ่ม "${product.name.slice(0, 20)}..." ลงตะกร้าแล้ว`);
    setTimeout(() => setAnimatingCartBtnId(null), 600);
  };

  // Filter recommendations based on chip & search
  const filteredRecommended = RECOMMENDED_PRODUCTS.filter((prod) => {
    if (searchFilter.trim()) {
      return (
        prod.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
        prod.shopName.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }
    if (selectedFilter === 'Mall เท่านั้น') return prod.shopType === 'Mall';
    if (selectedFilter === 'ส่งฟรี 0 บาท') return prod.tags.includes('ส่งฟรี');
    if (selectedFilter === 'ลดราคาพิเศษ') return prod.discountPercent >= 40;
    return true; // 'ยอดนิยม'
  });

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Dynamic Ticker Bar */}
      <div className="w-full bg-[#ff5722] text-white py-1.5 px-3 flex items-center justify-between overflow-hidden shadow-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="material-symbols-outlined text-[16px] text-[#ffdea8] animate-pulse">
            local_fire_department
          </span>
          <p className="text-[12px] font-semibold truncate">
            Flash Sale ลดสูงสุด 80% • โค้ดส่งฟรี ขั้นต่ำ 0.-
          </p>
        </div>
        <button
          onClick={() => handleClaimVoucher('Flash Sale 80%')}
          className="text-[10px] font-bold bg-[#b22204] hover:bg-[#8d1600] active:scale-95 transition-all text-white px-2 py-0.5 rounded-full shrink-0 shadow-xs"
        >
          {claimedVouchers['Flash Sale 80%'] ? 'เก็บแล้ว' : 'เก็บโค้ดเลย'}
        </button>
      </div>

      {/* Promotional Hero Banner Slider */}
      <div className="px-3 mt-3">
        <div
          className={`relative w-full rounded-2xl overflow-hidden shadow-md bg-gradient-to-r ${heroSlides[activeHeroSlide].gradient} p-3.5 text-white transition-all duration-300`}
        >
          <div className="flex flex-col gap-1 z-10 relative">
            <div className="flex items-center justify-between">
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea8] animate-ping"></span>
                {heroSlides[activeHeroSlide].badge}
              </span>

              {/* Countdown Timer */}
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-lg text-white">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                <span className="text-[10px] font-bold tracking-tight">
                  {hrs}:{mins}:{secs}
                </span>
              </div>
            </div>

            <div className="mt-1">
              <h2 className="text-[22px] font-extrabold leading-tight drop-shadow-sm">
                {heroSlides[activeHeroSlide].title}
              </h2>
              <p className="text-[12px] opacity-90 mt-0.5">
                {heroSlides[activeHeroSlide].subtitle}
              </p>
            </div>

            {/* Voucher Ribbons Container */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleClaimVoucher(heroSlides[activeHeroSlide].tag1)}
                className="bg-white/95 text-[#b22204] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[15px]">local_shipping</span>
                <span className="text-[12px] font-bold">
                  {heroSlides[activeHeroSlide].tag1}
                </span>
              </button>
              <button
                onClick={() => handleClaimVoucher(heroSlides[activeHeroSlide].tag2)}
                className="bg-[#ffdea8] text-[#271900] px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[15px]">percent</span>
                <span className="text-[12px] font-bold">
                  {heroSlides[activeHeroSlide].tag2}
                </span>
              </button>
            </div>
          </div>

          {/* Hero Ambient Visual Accent */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
          <div className="absolute right-2 bottom-2 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[100px] leading-none">
              shopping_bag
            </span>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHeroSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                activeHeroSlide === idx ? 'w-4 bg-[#b22204]' : 'w-1.5 bg-[#e5e2e1]'
              }`}
              aria-label={`สไลด์ที่ ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Action Category Circles */}
      <div className="mt-3 px-3">
        <div className="grid grid-cols-6 gap-1 text-center">
          {[
            { label: 'ดีลลดด่วน', icon: 'flash_on', color: 'text-[#b22204] bg-[#ff5722]/15' },
            { label: 'ส่งฟรี ฿0', icon: 'local_shipping', color: 'text-[#b22204] bg-[#eae7e7]' },
            { label: 'แฟชั่น', icon: 'styler', color: 'text-[#b02f00] bg-[#eae7e7]' },
            { label: 'ไอทีลดแรง', icon: 'devices', color: 'text-[#986d00] bg-[#eae7e7]' },
            { label: 'ความงาม', icon: 'face', color: 'text-[#d63c1e] bg-[#eae7e7]' },
            { label: 'ของใช้บ้าน', icon: 'home', color: 'text-[#5b403b] bg-[#eae7e7]' },
          ].map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedFilter(cat.label === 'ส่งฟรี ฿0' ? 'ส่งฟรี 0 บาท' : 'ยอดนิยม');
                onShowToast(`หมวดหมู่: ${cat.label}`);
              }}
              className="flex flex-col items-center group active:scale-95 transition-transform"
            >
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs ${cat.color} group-hover:scale-105 transition-transform`}
              >
                <span className="material-symbols-outlined text-[22px]">{cat.icon}</span>
              </div>
              <span className="text-[10px] font-medium text-[#1b1c1c] mt-1 truncate w-full">
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Flash Sale Horizontal Scroll Section */}
      <div className="mt-4 bg-white py-3 shadow-xs">
        <div className="px-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[#b22204] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <h3 className="text-[16px] text-[#b22204] font-black uppercase tracking-wider">
              FLASH SALE
            </h3>
            <span className="bg-[#1b1c1c] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
              {hrs}
            </span>
            <span className="text-[#1b1c1c] font-bold text-[10px]">:</span>
            <span className="bg-[#1b1c1c] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
              {mins}
            </span>
            <span className="text-[#1b1c1c] font-bold text-[10px]">:</span>
            <span className="bg-[#1b1c1c] text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
              {secs}
            </span>
          </div>

          <button
            onClick={() => onShowToast('กำลังแสดงดีล Flash Sale ทั้งหมด')}
            className="text-[12px] font-semibold text-[#b22204] flex items-center hover:opacity-80"
          >
            ดูทั้งหมด
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal Product Feed */}
        <div className="flex gap-2 overflow-x-auto px-3 mt-2 pb-1 no-scrollbar">
          {FLASH_PRODUCTS.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenProduct(item)}
              className="w-32 shrink-0 flex flex-col bg-[#f6f3f2] rounded-xl p-1.5 shadow-xs relative group cursor-pointer active:scale-98 transition-all"
            >
              <div className="w-full aspect-square rounded-lg overflow-hidden relative bg-[#f0eded]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />
                <div className="absolute top-1 right-1 bg-[#ffdea8] text-[#b22204] px-1 rounded text-[10px] font-extrabold shadow-xs">
                  -{item.discountPercent}%
                </div>
              </div>
              <div className="mt-1.5 flex flex-col">
                <span className="text-[15px] font-bold text-[#b22204] leading-none">
                  ฿{item.price}
                </span>
                <span className="text-[10px] text-[#8f7069] line-through leading-tight mt-0.5">
                  ฿{item.originalPrice}
                </span>

                {/* Sale Progress Bar */}
                <div className="mt-1.5 w-full bg-[#e5e2e1] h-3 rounded-full overflow-hidden relative flex items-center">
                  <div
                    className="bg-[#ff5722] h-full rounded-full transition-all"
                    style={{ width: `${item.soldProgressPercent || 50}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white uppercase drop-shadow-xs">
                    {item.soldStatusText}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Products Feed Header & Filter Chips */}
      <div className="mt-4 px-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-4 rounded-full bg-[#b22204]"></div>
            <h3 className="text-[16px] font-bold text-[#1b1c1c]">ปักตะกร้าสำหรับคุณ</h3>
          </div>
          <span className="text-[12px] text-[#b22204] font-bold">คัดสรรพิเศษ</span>
        </div>

        {/* Filter Rail Chips */}
        <div className="flex gap-1.5 overflow-x-auto mt-2 pb-1 no-scrollbar">
          {['ยอดนิยม', 'ลดราคาพิเศษ', 'ส่งฟรี 0 บาท', 'Mall เท่านั้น'].map((chip) => {
            const isChipActive = selectedFilter === chip;
            return (
              <button
                key={chip}
                onClick={() => setSelectedFilter(chip)}
                className={`px-3 py-1 rounded-full text-[12px] font-semibold shrink-0 transition-all ${
                  isChipActive
                    ? 'bg-[#ffdad3] text-[#3e0500] shadow-xs'
                    : 'bg-[#eae7e7] text-[#1b1c1c] hover:bg-[#e5e2e1]'
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Product Grid */}
      <div className="mt-2.5 px-3 grid grid-cols-2 gap-2">
        {filteredRecommended.map((product) => {
          const isButtonAnimating = animatingCartBtnId === product.id;
          return (
            <div
              key={product.id}
              onClick={() => onOpenProduct(product)}
              className="bg-white rounded-xl overflow-hidden shadow-xs flex flex-col justify-between group relative cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="w-full aspect-square relative bg-[#f0eded] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />

                {/* Badge top-left */}
                <span
                  className={`absolute top-1.5 left-1.5 font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs text-white ${
                    product.shopType === 'Mall'
                      ? 'bg-[#b22204]'
                      : product.shopType === 'ร้านแนะนำ'
                      ? 'bg-[#ff5722]'
                      : 'bg-[#e65100]'
                  }`}
                >
                  {product.shopType}
                </span>

                {/* Discount top-right */}
                <span className="absolute top-1.5 right-1.5 bg-[#ffdea8] text-[#b22204] text-[10px] px-1 rounded font-extrabold shadow-xs">
                  -{product.discountPercent}%
                </span>
              </div>

              <div className="p-2 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-[12px] text-[#1b1c1c] line-clamp-2 font-medium leading-snug">
                    {product.name}
                  </h4>

                  {/* Micro badges */}
                  <div className="flex items-center gap-1 mt-1 flex-wrap">
                    {product.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-[#eae7e7] text-[#b22204] px-1 rounded text-[9px] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#b22204] leading-none">
                      ฿{product.price}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <span
                        className="material-symbols-outlined text-[13px] text-[#ffba20]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-[10px] text-[#5b403b] font-bold">
                        {product.rating}
                      </span>
                      <span className="text-[9px] text-[#8f7069]">
                        | ขายแล้ว {product.soldCount}
                      </span>
                    </div>
                  </div>

                  {/* Quick Add to Cart Button */}
                  <button
                    onClick={(e) => handleQuickAdd(product, e)}
                    aria-label="เพิ่มลงตะกร้า"
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-all ${
                      isButtonAnimating
                        ? 'bg-[#b22204] text-white scale-110'
                        : 'bg-[#ffdad3] text-[#b22204] hover:bg-[#ffb4a4] active:scale-90'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[19px]">
                      {isButtonAnimating ? 'check' : 'shopping_cart_checkout'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Quick Cart Pill CTA Button */}
      {cartCount > 0 && (
        <div className="fixed bottom-20 right-3 z-40">
          <button
            onClick={onNavigateToCart}
            id="floating-cart-pill"
            className="h-11 px-3.5 rounded-full bg-[#b22204] hover:bg-[#d63c1e] text-white flex items-center gap-2 shadow-xl active:scale-95 transition-all"
          >
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span
                id="floating-cart-badge"
                className="absolute -top-1.5 -right-2 min-w-[15px] h-3.5 px-0.5 rounded-full bg-[#ffdea8] text-[#b22204] text-[9px] font-black flex items-center justify-center leading-none"
              >
                {cartCount}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[13px] font-semibold">
              <span id="floating-cart-text">{cartCount} ชิ้น</span>
              <span className="opacity-60">|</span>
              <span className="font-extrabold" id="floating-cart-price">
                ฿{cartTotal}
              </span>
            </div>

            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
};
