import { useState } from 'react';
import { Product, CartItem, UserProfile } from './types';
import { INITIAL_CART_ITEMS, DEFAULT_USER } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CartScreen } from './components/CartScreen';
import { AuthScreen } from './components/AuthScreen';
import { LiveScreen } from './components/LiveScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CameraSearchModal } from './components/CameraSearchModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTimer, setToastTimer] = useState<any>(null);
  const [deviceFrame, setDeviceFrame] = useState<'mobile' | 'responsive'>('mobile');

  // Trigger temporary toast notification
  const showToast = (msg: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    setToastTimer(timer);
  };

  // Cart total calculations
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const selectedCartItems = cartItems.filter((item) => item.selected);
  const totalCartPrice = selectedCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Add product to cart
  const handleAddToCart = (product: Product, variant?: string, quantity: number = 1) => {
    const chosenVariant = variant || product.variants?.[0] || 'มาตรฐาน';
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.variant === chosenVariant
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity, selected: true }
            : item
        );
      }
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        shopName: product.shopName,
        shopType: product.shopType === 'Mall' ? 'Mall' : 'Preferred+',
        variant: chosenVariant,
        variantsList: product.variants,
        quantity,
        selected: true,
      };
      return [...prev, newItem];
    });
  };

  // Direct Buy Now
  const handleBuyNow = (product: Product, variant?: string, quantity: number = 1) => {
    handleAddToCart(product, variant, quantity);
    setIsCheckoutModalOpen(true);
  };

  // Cart item controls
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleToggleItem = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item))
    );
  };

  const handleToggleSelectAll = () => {
    const areAllSelected = cartItems.every((item) => item.selected);
    setCartItems((prev) => prev.map((item) => ({ ...item, selected: !areAllSelected })));
  };

  const handleDeleteItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('ลบรายการสินค้าออกจากตะกร้าแล้ว');
  };

  const handleCheckoutSuccess = () => {
    // Remove checked items
    setCartItems((prev) => prev.filter((item) => !item.selected));
    setIsCheckoutModalOpen(false);
    setCurrentTab('profile');
    showToast('ชำระเงินสำเร็จ! ตรวจสอบสถานะการจัดส่งได้ที่เมนู "ฉัน"');
  };

  const handleLoginSuccess = (userData: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...userData, isLoggedIn: true }));
  };

  const handleLogout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
  };

  return (
    <div className="min-h-screen bg-[#ede8e6] text-[#1b1c1c] flex flex-col items-center justify-start antialiased selection:bg-[#ffdad3]">
      {/* Top Desktop Helper Bar */}
      <div className="w-full bg-[#303030] text-white py-2 px-3 text-xs flex items-center justify-between gap-3 shadow-md z-50">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-bold text-[#ffdea8] flex items-center gap-1 shrink-0">
            <span className="material-symbols-outlined text-[16px]">devices</span>
            สลับหน้าจอตามภาพต้นแบบ:
          </span>
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-2.5 py-1 rounded-full font-medium shrink-0 transition-all ${
              currentTab === 'home'
                ? 'bg-[#b22204] text-white font-bold'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
          >
            1. หน้าแรก (Home)
          </button>
          <button
            onClick={() => setCurrentTab('cart')}
            className={`px-2.5 py-1 rounded-full font-medium shrink-0 transition-all ${
              currentTab === 'cart'
                ? 'bg-[#b22204] text-white font-bold'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
          >
            2. ตะกร้าสินค้า (Cart {totalCartCount > 0 ? `• ${totalCartCount}` : ''})
          </button>
          <button
            onClick={() => {
              setCurrentTab('profile');
              if (user.isLoggedIn) {
                setUser((prev) => ({ ...prev, isLoggedIn: false }));
              }
            }}
            className={`px-2.5 py-1 rounded-full font-medium shrink-0 transition-all ${
              currentTab === 'profile' && !user.isLoggedIn
                ? 'bg-[#b22204] text-white font-bold'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
          >
            3. เข้าสู่ระบบ/ลงทะเบียน (Auth)
          </button>
          <button
            onClick={() => {
              setCurrentTab('profile');
              if (!user.isLoggedIn) {
                setUser((prev) => ({ ...prev, isLoggedIn: true }));
              }
            }}
            className={`px-2.5 py-1 rounded-full font-medium shrink-0 transition-all ${
              currentTab === 'profile' && user.isLoggedIn
                ? 'bg-[#b22204] text-white font-bold'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
          >
            4. โปรไฟล์ผู้ใช้ (Profile)
          </button>
          <button
            onClick={() => setCurrentTab('feed')}
            className={`px-2.5 py-1 rounded-full font-medium shrink-0 transition-all ${
              currentTab === 'feed'
                ? 'bg-[#b22204] text-white font-bold'
                : 'bg-white/10 hover:bg-white/20 text-white/90'
            }`}
          >
            5. ไลฟ์สด (Live)
          </button>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 shrink-0 hidden md:flex">
          <button
            onClick={() => setDeviceFrame('mobile')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
              deviceFrame === 'mobile'
                ? 'bg-white text-[#1b1c1c]'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            กรอบมือถือ (Mobile Frame)
          </button>
          <button
            onClick={() => setDeviceFrame('responsive')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
              deviceFrame === 'responsive'
                ? 'bg-white text-[#1b1c1c]'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            ขยายเต็มจอ (Wide)
          </button>
        </div>
      </div>

      {/* Main Container / Mobile Device Mockup */}
      <div
        className={`w-full min-h-screen transition-all flex flex-col justify-between ${
          deviceFrame === 'mobile'
            ? 'max-w-[430px] my-0 md:my-4 md:rounded-[40px] md:shadow-[0_20px_60px_rgba(0,0,0,0.3)] md:border-[10px] md:border-[#222] overflow-hidden bg-[#fcf9f8]'
            : 'max-w-2xl bg-[#fcf9f8] shadow-lg'
        }`}
      >
        {/* Mobile Device Notch Bar in Mobile Frame mode */}
        {deviceFrame === 'mobile' && (
          <div className="hidden md:flex h-6 bg-black text-white px-6 items-center justify-between text-[11px] font-medium shrink-0 select-none">
            <span>09:41</span>
            <div className="w-20 h-4 bg-black rounded-b-xl -mt-1 mx-auto flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700"></div>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">signal_cellular_4_bar</span>
              <span className="material-symbols-outlined text-[13px]">wifi</span>
              <span className="material-symbols-outlined text-[14px]">battery_full</span>
            </div>
          </div>
        )}

        {/* Global App Header (Hidden only on full Auth screen if user requested clean auth) */}
        <Header
          currentTab={currentTab}
          onNavigate={(tab) => setCurrentTab(tab)}
          cartCount={totalCartCount}
          hasUnreadNotifs={hasUnreadNotifs}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCameraClick={() => setIsCameraModalOpen(true)}
        />

        {/* Active Tab Screen Content */}
        <main className="flex-1 flex flex-col relative w-full bg-[#fcf9f8]">
          {currentTab === 'home' && (
            <HomeScreen
              onAddToCart={handleAddToCart}
              onOpenProduct={(prod) => setActiveProductModal(prod)}
              onNavigateToCart={() => setCurrentTab('cart')}
              cartCount={totalCartCount}
              cartTotal={totalCartPrice}
              onShowToast={showToast}
              searchFilter={searchQuery}
            />
          )}

          {currentTab === 'cart' && (
            <CartScreen
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onToggleItem={handleToggleItem}
              onToggleSelectAll={handleToggleSelectAll}
              onDeleteItem={handleDeleteItem}
              onProceedToCheckout={() => setIsCheckoutModalOpen(true)}
              onShowToast={showToast}
              userCoins={user.coins}
            />
          )}

          {currentTab === 'profile' && (
            <AuthScreen
              user={user}
              onLoginSuccess={handleLoginSuccess}
              onLogout={handleLogout}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'feed' && (
            <LiveScreen
              onAddToCart={handleAddToCart}
              onShowToast={showToast}
            />
          )}

          {currentTab === 'notifications' && (
            <NotificationsScreen
              onShowToast={showToast}
              onClearDot={() => setHasUnreadNotifs(false)}
            />
          )}
        </main>

        {/* Global Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          onNavigate={(tab) => setCurrentTab(tab)}
          cartCount={totalCartCount}
          hasUnreadNotifs={hasUnreadNotifs}
        />
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1b1c1c]/90 text-white px-4 py-2 rounded-full text-[13px] font-medium shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 flex items-center gap-2 max-w-[90%]">
          <span className="material-symbols-outlined text-[16px] text-[#ffdea8]">info</span>
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Product Detail Modal */}
      {activeProductModal && (
        <ProductDetailModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
          onAddToCart={(prod, variant, qty) => {
            handleAddToCart(prod, variant, qty);
            showToast(`เพิ่ม "${prod.name.slice(0, 20)}..." ลงตะกร้าแล้ว`);
          }}
          onBuyNow={(prod, variant, qty) => handleBuyNow(prod, variant, qty)}
          onShowToast={showToast}
        />
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <CheckoutModal
          items={selectedCartItems.length > 0 ? selectedCartItems : cartItems}
          totalPrice={Math.max(1, totalCartPrice)}
          onClose={() => setIsCheckoutModalOpen(false)}
          onSuccess={handleCheckoutSuccess}
          onShowToast={showToast}
        />
      )}

      {/* Camera / Photo Search Modal */}
      {isCameraModalOpen && (
        <CameraSearchModal
          onClose={() => setIsCameraModalOpen(false)}
          onSelectProduct={(prod) => {
            setActiveProductModal(prod);
          }}
          onShowToast={showToast}
        />
      )}
    </div>
  );
}
