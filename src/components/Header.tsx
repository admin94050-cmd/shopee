import React, { useState } from 'react';
import { APP_LOGO } from '../data/mockData';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  cartCount: number;
  hasUnreadNotifs: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCameraClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  cartCount,
  hasUnreadNotifs,
  searchQuery,
  onSearchChange,
  onCameraClick,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 pt-safe bg-[#fcf9f8]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      <div className="h-16 px-3 flex items-center justify-between gap-2 max-w-2xl mx-auto">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 shrink-0 active:scale-95 transition-transform"
          aria-label="ShopOrange Home"
        >
          <img
            alt="ShopOrange Logo"
            className="h-8 w-auto object-contain"
            src={APP_LOGO}
          />
        </button>

        {/* Search Input Bar */}
        <div
          className={`flex-1 flex items-center h-10 px-3 bg-[#f0eded] rounded-full transition-all ${
            isFocused ? 'ring-2 ring-[#b22204]/40 bg-white shadow-sm' : ''
          }`}
        >
          <span className="material-symbols-outlined text-[#8f7069] text-[18px] mr-1.5 shrink-0">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="ค้นหาสินค้า โค้ดส่วนลด ร้านค้า..."
            className="font-normal text-[13px] text-[#1b1c1c] placeholder:text-[#8f7069] bg-transparent outline-none w-full truncate"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="text-[#8f7069] hover:text-[#b22204] p-1"
              aria-label="ล้างคำค้นหา"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          ) : (
            <button
              onClick={onCameraClick}
              className="text-[#8f7069] hover:text-[#b22204] active:scale-90 transition-transform p-1 shrink-0"
              title="ค้นหาด้วยรูปภาพ"
              aria-label="ค้นหาด้วยรูปภาพ"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </button>
          )}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Notifications */}
          <button
            onClick={() => onNavigate('notifications')}
            aria-label="การแจ้งเตือน"
            className="w-10 h-10 relative flex items-center justify-center text-[#1b1c1c] hover:text-[#b22204] transition-colors rounded-full active:bg-[#f0eded]"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {hasUnreadNotifs && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#b22204] ring-2 ring-white"></span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => onNavigate('cart')}
            aria-label="ตะกร้าสินค้า"
            className="w-10 h-10 relative flex items-center justify-center text-[#1b1c1c] hover:text-[#b22204] transition-colors rounded-full active:bg-[#f0eded]"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#b22204] text-white text-[10px] font-bold flex items-center justify-center leading-none shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button
            onClick={() => onNavigate('profile')}
            aria-label="โปรไฟล์ของฉัน"
            className="w-8 h-8 ml-1 rounded-full bg-[#b22204] flex items-center justify-center shrink-0 text-white shadow-xs hover:opacity-90 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
