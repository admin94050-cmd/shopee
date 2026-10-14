import React from 'react';

interface BottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  cartCount: number;
  hasUnreadNotifs: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  hasUnreadNotifs,
}) => {
  const tabs = [
    { id: 'home', label: 'หน้าแรก', icon: 'storefront' },
    { id: 'feed', label: 'ไลฟ์/ฟีด', icon: 'live_tv' },
    { id: 'cart', label: 'ตะกร้า', icon: 'shopping_bag', badge: cartCount },
    { id: 'notifications', label: 'การแจ้งเตือน', icon: 'notifications', dot: hasUnreadNotifs },
    { id: 'profile', label: 'ฉัน', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#fcf9f8]/95 backdrop-blur-xl border-t border-black/5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[52px] min-h-[44px] py-1 transition-colors select-none ${
                isActive ? 'text-[#b22204] font-bold' : 'text-[#5b403b] hover:text-[#b22204]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>

                {/* Number Badge for Cart */}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 min-w-[15px] h-3.5 px-0.5 rounded-full bg-[#b22204] text-white text-[9px] font-bold flex items-center justify-center leading-none shadow-xs">
                    {tab.badge}
                  </span>
                )}

                {/* Dot Badge for Notifications */}
                {tab.dot && (
                  <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-[#b22204] ring-2 ring-white"></span>
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
