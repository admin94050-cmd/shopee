import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onToggleItem: (id: string) => void;
  onToggleSelectAll: () => void;
  onDeleteItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onShowToast: (msg: string) => void;
  userCoins: number;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onToggleItem,
  onToggleSelectAll,
  onDeleteItem,
  onProceedToCheckout,
  onShowToast,
  userCoins,
}) => {
  const [useCoins, setUseCoins] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showVoucherModal, setShowVoucherModal] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState('v-ship');
  const [showShippingTerms, setShowShippingTerms] = useState(false);

  // Group items by shop
  const shops = Array.from(new Set(cartItems.map((item) => item.shopName)));

  // Calculations
  const selectedItems = cartItems.filter((item) => item.selected);
  const selectedCount = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.selected);

  // Raw subtotal
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Original total for savings calculation
  const originalSubtotal = selectedItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );

  // Coins discount (50 Baht if toggle is on and items selected)
  const coinsDiscount = useCoins && selectedItems.length > 0 ? Math.min(50, userCoins) : 0;

  // Voucher discount
  const voucherDiscount = selectedVoucherId === 'v-mega' ? 150 : selectedVoucherId === 'v-ship' ? 40 : 0;

  // Final grand total
  const grandTotal = Math.max(0, subtotal - coinsDiscount - (selectedVoucherId === 'v-mega' ? 150 : 0));
  const totalSaved = originalSubtotal - grandTotal;

  // Toggle all items in a single shop
  const handleToggleShop = (shopName: string) => {
    const shopItems = cartItems.filter((i) => i.shopName === shopName);
    const areAllShopItemsSelected = shopItems.every((i) => i.selected);
    shopItems.forEach((i) => {
      if (areAllShopItemsSelected === i.selected) {
        onToggleItem(i.id);
      }
    });
  };

  return (
    <div className="flex flex-col w-full pb-36">
      {/* Free shipping banner */}
      <div className="bg-[#ffdad3]/60 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[#3e0500]">
          <span
            className="material-symbols-outlined text-[18px] text-[#b22204]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_shipping
          </span>
          <span className="text-[12px] font-semibold text-[#b22204]">
            ส่งฟรีทั่วไทยเมื่อช้อปครบ ฿150
          </span>
        </div>
        <button
          onClick={() => setShowShippingTerms(true)}
          className="text-[11px] font-medium text-[#b22204] underline hover:opacity-80"
        >
          ดูเงื่อนไข
        </button>
      </div>

      {/* Sticky header select-all row */}
      <div className="bg-white px-3 py-2.5 flex items-center justify-between shadow-xs sticky top-16 z-30">
        <div
          onClick={onToggleSelectAll}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div
            className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
              allSelected
                ? 'bg-[#b22204] text-white'
                : 'border border-[#8f7069]/40 bg-[#f6f3f2] text-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] font-bold">check</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[14px] font-bold text-[#1b1c1c]">ตะกร้าสินค้า</span>
            <span className="text-[12px] text-[#8f7069]">({cartItems.length} รายการ)</span>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-[12px] font-medium text-[#8f7069] hover:text-[#b22204] transition-colors py-1 px-2 rounded-lg active:bg-[#f0eded]"
        >
          {isEditing ? 'เสร็จสิ้น' : 'แก้ไข'}
        </button>
      </div>

      {/* Empty State */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <div className="w-20 h-20 rounded-full bg-[#f0eded] flex items-center justify-center text-[#8f7069] mb-3">
            <span className="material-symbols-outlined text-[40px]">shopping_basket</span>
          </div>
          <h3 className="text-[16px] font-bold text-[#1b1c1c]">ยังไม่มีสินค้าในตะกร้า</h3>
          <p className="text-[13px] text-[#8f7069] mt-1 max-w-xs">
            ค้นหาดีลลดกระหน่ำในหน้าแรก และเริ่มช้อปเลย!
          </p>
        </div>
      ) : (
        /* Cart List Grouped by Shops */
        <div className="flex flex-col gap-3 p-3">
          {shops.map((shopName) => {
            const itemsInShop = cartItems.filter((i) => i.shopName === shopName);
            const shopType = itemsInShop[0]?.shopType || 'Mall';
            const allShopSelected = itemsInShop.every((i) => i.selected);

            return (
              <div
                key={shopName}
                className="bg-white rounded-xl p-3 shadow-xs flex flex-col gap-2.5 transition-all"
              >
                {/* Shop header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-[#f0eded]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleShop(shopName)}
                      className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                        allShopSelected
                          ? 'bg-[#b22204] text-white'
                          : 'border border-[#8f7069]/40 bg-[#f6f3f2] text-transparent'
                      }`}
                      aria-label="เลือกสินค้าทั้งหมดในร้านนี้"
                    >
                      <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                    </button>

                    <div className="flex items-center gap-1.5 cursor-pointer">
                      <span
                        className={`font-bold text-[9px] px-1.5 py-0.5 rounded text-white ${
                          shopType === 'Mall'
                            ? 'bg-[#b22204]'
                            : 'bg-[#ff5722]'
                        }`}
                      >
                        {shopType}
                      </span>
                      <span className="text-[13px] text-[#1b1c1c] font-semibold truncate max-w-[180px]">
                        {shopName}
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-[#8f7069]">
                        chevron_right
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onShowToast(`เปิดแชทกับร้าน: ${shopName}`)}
                    aria-label="แชทกับร้านค้า"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#5b403b] hover:text-[#b22204] hover:bg-[#f6f3f2] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      chat_bubble_outline
                    </span>
                  </button>
                </div>

                {/* Items in this shop */}
                {itemsInShop.map((item) => (
                  <div key={item.id} className="flex gap-2.5 pt-1.5">
                    <button
                      onClick={() => onToggleItem(item.id)}
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-6 transition-colors ${
                        item.selected
                          ? 'bg-[#b22204] text-white'
                          : 'border border-[#8f7069]/40 bg-[#f6f3f2] text-transparent'
                      }`}
                      aria-label="เลือกสินค้านี้"
                    >
                      <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                    </button>

                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#f0eded]">
                      <img
                        className="w-full h-full object-cover"
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                      />
                      {item.originalPrice > item.price && (
                        <span className="absolute top-0 right-0 bg-[#ffdea8] text-[#271900] text-[9px] font-bold px-1 py-0.5 rounded-bl">
                          ลด {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-[13px] text-[#1b1c1c] font-medium truncate">
                          {item.name}
                        </h3>

                        {/* Variant Dropdown / Selector */}
                        <div
                          onClick={() => {
                            if (item.variantsList && item.variantsList.length > 1) {
                              const nextIdx =
                                (item.variantsList.indexOf(item.variant) + 1) %
                                item.variantsList.length;
                              item.variant = item.variantsList[nextIdx];
                              onShowToast(`เปลี่ยนตัวเลือกเป็น: ${item.variant}`);
                            }
                          }}
                          className="mt-1 inline-flex items-center gap-1 bg-[#f6f3f2] hover:bg-[#eae7e7] px-2 py-0.5 rounded-full text-[#5b403b] cursor-pointer transition-colors max-w-full"
                          title="คลิกเพื่อสลับตัวเลือกสินค้า"
                        >
                          <span className="text-[10px] truncate max-w-[150px]">{item.variant}</span>
                          <span className="material-symbols-outlined text-[13px]">expand_more</span>
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-1">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#8f7069] line-through">
                            ฿{item.originalPrice}
                          </span>
                          <span className="text-[16px] text-[#b22204] font-bold">
                            ฿{item.price}
                          </span>
                        </div>

                        {/* Stepper & Delete */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-[#f0eded] rounded-lg p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              aria-label="ลดจำนวน"
                              className="w-7 h-7 flex items-center justify-center text-[#1b1c1c] rounded hover:bg-[#eae7e7] active:scale-90 transition-all"
                            >
                              <span className="material-symbols-outlined text-[14px]">remove</span>
                            </button>
                            <span className="text-[13px] font-bold text-[#1b1c1c] px-2 min-w-[24px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              aria-label="เพิ่มจำนวน"
                              className="w-7 h-7 flex items-center justify-center text-[#1b1c1c] rounded hover:bg-[#eae7e7] active:scale-90 transition-all"
                            >
                              <span className="material-symbols-outlined text-[14px]">add</span>
                            </button>
                          </div>

                          <button
                            onClick={() => onDeleteItem(item.id)}
                            aria-label="ลบรายการ"
                            className="w-7 h-7 flex items-center justify-center text-[#8f7069] hover:text-[#ba1a1a] active:scale-90 transition-all"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete_outline
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Shop Voucher Banner */}
                {itemsInShop[0]?.shopVoucherText && (
                  <div className="mt-1 pt-1 bg-[#f6f3f2] rounded-lg p-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#b02f00]">
                      <span className="material-symbols-outlined text-[16px]">local_activity</span>
                      <span className="text-[11px] font-semibold">
                        {itemsInShop[0].shopVoucherText}
                      </span>
                    </div>
                    <button
                      onClick={() => onShowToast('เก็บโค้ดร้านค้านี้แล้ว')}
                      className="text-[11px] font-bold text-[#b22204] hover:underline"
                    >
                      เก็บโค้ดแล้ว
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Shopee Voucher Card */}
          <div className="bg-white rounded-xl p-3 shadow-xs flex flex-col gap-2">
            <div
              onClick={() => setShowVoucherModal(true)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ffdbd1] flex items-center justify-center text-[#3b0900]">
                  <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-[#1b1c1c]">
                    โค้ดส่วนลดของ Shopee
                  </span>
                  <span className="text-[11px] text-[#b22204] font-medium">
                    {selectedVoucherId === 'v-mega'
                      ? 'ใช้โค้ด Mega Day ลด ฿150'
                      : 'ใช้โค้ดส่งฟรี เพื่อประหยัด ฿40'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#b22204] text-[12px] font-bold">
                <span>ใช้โค้ดแล้ว</span>
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            <div className="h-[1px] bg-[#f0eded] my-0.5"></div>

            {/* Shopee Coins Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ffdea8] flex items-center justify-center text-[#271900]">
                  <span className="material-symbols-outlined text-[18px]">monetization_on</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-[#1b1c1c]">
                    ใช้ 50 Shopee Coins
                  </span>
                  <span className="text-[11px] text-[#8f7069]">
                    เหรียญของคุณ: {userCoins} Coins (ลด ฿50)
                  </span>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={useCoins}
                  onChange={(e) => {
                    setUseCoins(e.target.checked);
                    onShowToast(
                      e.target.checked
                        ? 'หักส่วนลด 50 Shopee Coins (-฿50)'
                        : 'ยกเลิกการใช้ Shopee Coins'
                    );
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#e5e2e1] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#b22204]"></div>
              </label>
            </div>
          </div>

          {/* Trust Guarantee Card */}
          <div className="bg-[#f6f3f2] rounded-xl p-3 flex items-center gap-2 text-[#5b403b] shadow-xs">
            <span
              className="material-symbols-outlined text-[20px] text-[#b22204] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <p className="text-[11px] leading-tight">
              แจ้งเตือนสถานะออเดอร์ทันทีผ่าน SMS & แอพเมื่อชำระเงินสำเร็จ การันตีสินค้าตรงปก คืนเงินได้ใน 7 วัน
            </p>
          </div>
        </div>
      )}

      {/* Fixed Bottom Checkout Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-3 py-2.5 flex items-center justify-between max-w-2xl mx-auto">
        <div
          onClick={onToggleSelectAll}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div
            className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
              allSelected
                ? 'bg-[#b22204] text-white'
                : 'border border-[#8f7069]/40 bg-[#f6f3f2] text-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] font-bold">check</span>
          </div>
          <span className="text-[13px] text-[#1b1c1c] font-bold">เลือกทั้งหมด</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <div className="flex items-baseline gap-1">
              <span className="text-[11px] text-[#8f7069]">รวมทั้งหมด:</span>
              <span className="text-[18px] text-[#b22204] font-black">฿{grandTotal}</span>
            </div>
            <span className="text-[10px] text-[#b02f00] font-medium">
              ประหยัดไปแล้ว ฿{totalSaved > 0 ? totalSaved : 90}
            </span>
          </div>

          <button
            onClick={() => {
              if (selectedCount === 0) {
                onShowToast('กรุณาเลือกสินค้าอย่างน้อย 1 รายการเพื่อสั่งซื้อ');
              } else {
                onProceedToCheckout();
              }
            }}
            className="bg-[#b22204] hover:bg-[#d63c1e] active:scale-95 text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-1"
          >
            <span>สั่งซื้อสินค้า</span>
            <span>({selectedCount})</span>
          </button>
        </div>
      </div>

      {/* Shopee Voucher Picker Drawer / Modal */}
      {showVoucherModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md p-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0eded]">
              <h3 className="text-[16px] font-bold text-[#1b1c1c]">เลือกโค้ดส่วนลด Shopee</h3>
              <button
                onClick={() => setShowVoucherModal(false)}
                className="text-[#8f7069] p-1"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-2 mt-3">
              {[
                {
                  id: 'v-ship',
                  title: 'โค้ดส่งฟรี ขั้นต่ำ ฿0',
                  desc: 'ลดค่าจัดส่ง ฿40 ทั่วไทย',
                  badge: 'ส่งฟรี',
                },
                {
                  id: 'v-mega',
                  title: 'โค้ด Mega Day ลดเพิ่ม ฿150',
                  desc: 'เมื่อช้อปครบ ฿800 ขึ้นไป',
                  badge: 'ลดพิเศษ',
                },
                {
                  id: 'v-coin',
                  title: 'คืนคอยน์ 25% Coins',
                  desc: 'รับคืนสูงสุด 200 Shopee Coins',
                  badge: 'คืนคอยน์',
                },
              ].map((v) => (
                <div
                  key={v.id}
                  onClick={() => {
                    setSelectedVoucherId(v.id);
                    setShowVoucherModal(false);
                    onShowToast(`เลือกใช้ ${v.title}`);
                  }}
                  className={`border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all ${
                    selectedVoucherId === v.id
                      ? 'border-[#b22204] bg-[#ffdad3]/20 ring-1 ring-[#b22204]'
                      : 'border-[#eae7e7] hover:border-[#b22204]/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#b22204] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {v.badge}
                    </span>
                    <div>
                      <p className="text-[13px] font-bold text-[#1b1c1c]">{v.title}</p>
                      <p className="text-[11px] text-[#8f7069]">{v.desc}</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedVoucherId === v.id
                        ? 'border-[#b22204] bg-[#b22204] text-white'
                        : 'border-[#8f7069]/40'
                    }`}
                  >
                    {selectedVoucherId === v.id && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shipping terms modal */}
      {showShippingTerms && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl">
            <h3 className="text-[15px] font-bold text-[#1b1c1c] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#b22204]">local_shipping</span>
              เงื่อนไขโค้ดส่งฟรีทั่วไทย
            </h3>
            <ul className="text-[12px] text-[#5b403b] space-y-1.5 list-disc pl-4">
              <li>ใช้ได้เมื่อมียอดสั่งซื้อขั้นต่ำ ฿150 ขึ้นไป</li>
              <li>สนับสนุนค่าจัดส่งสูงสุดไม่เกิน ฿40 ต่อออเดอร์</li>
              <li>ใช้ได้กับขนส่งมาตรฐาน SPX Express, Flash, Kerry ทั่วไทย</li>
            </ul>
            <button
              onClick={() => setShowShippingTerms(false)}
              className="mt-4 w-full py-2 bg-[#b22204] text-white rounded-xl font-bold text-[13px]"
            >
              รับทราบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
