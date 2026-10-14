import React, { useState } from 'react';
import { NOTIFICATIONS_DATA } from '../data/mockData';
import { NotificationItem } from '../types';

interface NotificationsScreenProps {
  onShowToast: (msg: string) => void;
  onClearDot: () => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onShowToast,
  onClearDot,
}) => {
  const [notifs, setNotifs] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const [filter, setFilter] = useState<'all' | 'order' | 'promo' | 'activity'>('all');

  const filtered = notifs.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    onClearDot();
    onShowToast('อ่านการแจ้งเตือนทั้งหมดแล้ว');
  };

  const handleReadItem = (id: string) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header bar */}
      <div className="bg-white px-3 py-3 border-b border-[#f0eded] flex items-center justify-between sticky top-16 z-30">
        <h2 className="text-[16px] font-bold text-[#1b1c1c]">การแจ้งเตือน</h2>
        <button
          onClick={handleMarkAllRead}
          className="text-[12px] text-[#b22204] font-medium hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">done_all</span>
          อ่านทั้งหมด
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 px-3 py-2 bg-white border-b border-[#f0eded] overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'ทั้งหมด' },
          { id: 'order', label: 'คำสั่งซื้อ' },
          { id: 'promo', label: 'โปรโมชั่น' },
          { id: 'activity', label: 'ข่าวสาร' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold shrink-0 transition-all ${
              filter === tab.id
                ? 'bg-[#ffdad3] text-[#3e0500]'
                : 'bg-[#f6f3f2] text-[#5b403b] hover:bg-[#eae7e7]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="divide-y divide-[#f0eded] bg-white">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              handleReadItem(item.id);
              onShowToast(item.title);
            }}
            className={`p-3 flex gap-3 cursor-pointer transition-colors ${
              !item.read ? 'bg-[#ffdad3]/15' : 'hover:bg-[#fcf9f8]'
            }`}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#ffdbd1] text-[#b22204]">
              <span className="material-symbols-outlined text-[20px]">
                {item.type === 'order'
                  ? 'local_shipping'
                  : item.type === 'promo'
                  ? 'campaign'
                  : 'notifications'}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className={`text-[13px] ${!item.read ? 'font-bold text-[#1b1c1c]' : 'font-medium text-[#1b1c1c]'}`}>
                  {item.title}
                </h4>
                <span className="text-[10px] text-[#8f7069] shrink-0 ml-1">
                  {item.time}
                </span>
              </div>
              <p className="text-[12px] text-[#5b403b] mt-0.5 line-clamp-2">
                {item.description}
              </p>
            </div>

            {!item.read && (
              <div className="w-2 h-2 rounded-full bg-[#b22204] self-center shrink-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
