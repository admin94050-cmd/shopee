import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface LiveScreenProps {
  onAddToCart: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

export const LiveScreen: React.FC<LiveScreenProps> = ({ onAddToCart, onShowToast }) => {
  const [likes, setLikes] = useState(14820);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);
  const [comments, setComments] = useState<Array<{ user: string; text: string }>>([
    { user: 'NongPloy', text: 'รุ่นนี้เสียงเบสดีมากค่ะ คอนเฟิร์ม!' },
    { user: 'Krit_BKK', text: 'กดโค้ดลดทันไหมครับ' },
    { user: 'Minty_Shop', text: 'ปักหมุดสีขาวให้ดูหน่อยค่ะ' },
  ]);
  const [newComment, setNewComment] = useState('');

  // Sample pinned live deal
  const liveProduct: Product = {
    id: 'live-pinned-1',
    name: 'หูฟังไร้สาย TWS ANC Bass Boost (โปรโมชั่นพิเศษเฉพาะในไลฟ์)',
    price: 399,
    originalPrice: 890,
    discountPercent: 55,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp_CWzM0H1q-bqYqCrIr4r55To-NkZ-k0KQi3BpgRCdSffI8EpfrQJLE3gcrmyWP5e536rd02ZU4piNXjSjN50tQxHCHwd-bjiC8n-qFL7SxgvMRCiNdxwzLLWx0Y2czMxykRR8eVIxcc93Pw62mx9Q7vIrJr6-V_iRH2X35jx4uyC2508jcudAFcZC-D0vs2lI60Bwk-nBnzvH0YrowGDKnViztb9XvivHOKl8yhRf43ZX6w02_nC2w',
    rating: 4.9,
    soldCount: '2.1k',
    shopName: 'Shopee Official Live',
    shopType: 'Mall',
    tags: ['ส่งฟรี', 'ดีลไลฟ์สด'],
    category: 'ไอทีลดแรง',
  };

  const addHeart = () => {
    setLikes((prev) => prev + 1);
    const newHeart = { id: Date.now() + Math.random(), left: 40 + Math.random() * 40 };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  };

  // Periodic simulated live chat
  useEffect(() => {
    const chatSamples = [
      { user: 'Aom_2026', text: 'สั่งแล้วค่า รอของส่งเลย' },
      { user: 'Pond_CNX', text: 'มีเก็บเงินปลายทางไหมคะ' },
      { user: 'Tonkla', text: 'โค้ดส่งฟรีลดคุ้มมากกก' },
      { user: 'Bellie', text: 'เสียงชัดจริง ลองแล้ว' },
    ];
    const interval = setInterval(() => {
      const randomChat = chatSamples[Math.floor(Math.random() * chatSamples.length)];
      setComments((prev) => [...prev.slice(-6), randomChat]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments((prev) => [...prev, { user: 'ฉัน', text: newComment.trim() }]);
    setNewComment('');
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] min-h-[580px] bg-slate-900 overflow-hidden flex flex-col justify-between text-white pb-16">
      {/* Background Live video simulation */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
          alt="Live Stream Host"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />
      </div>

      {/* Floating Animated Hearts */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-24 text-red-500 text-[26px] pointer-events-none animate-bounce"
          style={{
            left: `${heart.left}%`,
            transition: 'transform 1.5s ease-out, opacity 1.5s',
          }}
        >
          ❤️
        </div>
      ))}

      {/* Top Stream Bar */}
      <div className="relative z-10 p-3 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full pl-1.5 pr-3 py-1">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Streamer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[12px] font-bold">Shopee Live Official</span>
            <span className="text-[10px] text-white/70">ผู้ติดตาม 452K</span>
          </div>
          <button
            onClick={() => onShowToast('กดติดตามร้านแล้ว')}
            className="ml-1 bg-[#b22204] text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
          >
            ติดตาม
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#b22204] px-2 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            LIVE
          </div>
          <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">visibility</span>
            3.4k
          </span>
        </div>
      </div>

      {/* Center / Bottom Zone: Comments & Pinned Product */}
      <div className="relative z-10 p-3 flex flex-col gap-2">
        {/* Live Chat Comments Scroller */}
        <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto no-scrollbar pr-10">
          {comments.map((c, i) => (
            <div
              key={i}
              className="bg-black/45 backdrop-blur-md rounded-xl px-2.5 py-1 text-[12px] inline-block self-start max-w-[85%]"
            >
              <span className="text-[#ffdea8] font-bold mr-1">{c.user}:</span>
              <span className="text-white/95">{c.text}</span>
            </div>
          ))}
        </div>

        {/* Pinned Product Card in Live Stream */}
        <div className="bg-white/95 text-[#1b1c1c] rounded-xl p-2.5 shadow-xl backdrop-blur-md flex items-center justify-between gap-2.5">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#f0eded]">
            <img
              src={liveProduct.image}
              alt={liveProduct.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-0 left-0 bg-[#b22204] text-white text-[8px] font-bold px-1 rounded-br">
              ดีลไลฟ์
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-[12px] font-bold truncate">{liveProduct.name}</h4>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-[15px] font-extrabold text-[#b22204]">
                ฿{liveProduct.price}
              </span>
              <span className="text-[10px] text-[#8f7069] line-through">
                ฿{liveProduct.originalPrice}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(liveProduct);
              onShowToast('🛒 เพิ่มสินค้าจากไลฟ์สดลงตะกร้าแล้ว!');
            }}
            className="bg-[#b22204] hover:bg-[#d63c1e] text-white text-[12px] font-bold px-3 py-2 rounded-lg shrink-0 shadow-md active:scale-95 transition-all flex items-center gap-1"
          >
            <span>ซื้อเลย</span>
          </button>
        </div>

        {/* Bottom Interactive Bar: Chat Input + Hearts Trigger */}
        <div className="flex items-center gap-2 pt-1">
          <form onSubmit={handleSendComment} className="flex-1 flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="ส่งข้อความพูดคุยในไลฟ์..."
              className="w-full h-10 px-3 bg-black/50 backdrop-blur-md rounded-full text-[13px] text-white placeholder:text-white/60 outline-none border border-white/20 focus:border-[#ff5722]"
            />
          </form>

          {/* Share */}
          <button
            onClick={() => onShowToast('คัดลอกลิงก์แชร์ไลฟ์สดสำเร็จ')}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white active:scale-90"
            aria-label="แชร์ไลฟ์"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>

          {/* Like Heart Button */}
          <button
            onClick={addHeart}
            className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#b22204] to-[#ff5722] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
            aria-label="ส่งหัวใจ"
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
            <span className="absolute -bottom-1 -right-1 bg-black/60 px-1 rounded-full text-[8px] font-mono">
              {likes}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
