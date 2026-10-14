import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onSuccess: () => void;
  onShowToast: (msg: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  items,
  totalPrice,
  onClose,
  onSuccess,
  onShowToast,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'shopeepay' | 'promptpay' | 'card' | 'cod'>('shopeepay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onShowToast('🎉 สั่งซื้อสินค้าสำเร็จแล้ว!');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 text-center max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-[#ffdad3] text-[#b22204] flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>
          <h3 className="text-[18px] font-black text-[#1b1c1c]">ชำระเงินสำเร็จแล้ว!</h3>
          <p className="text-[12px] text-[#5b403b] mt-1">
            หมายเลขคำสั่งซื้อ: #TH26099901
            <br />
            ระบบกำลังเตรียมจัดส่งสินค้าถึงบ้านคุณ
          </p>
          <div className="mt-4 p-3 bg-[#f6f3f2] rounded-xl text-left text-[12px] space-y-1">
            <div className="flex justify-between">
              <span className="text-[#8f7069]">ยอดชำระสุทธิ:</span>
              <span className="font-bold text-[#b22204]">฿{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8f7069]">ช่องทางชำระ:</span>
              <span className="font-semibold text-[#1b1c1c]">
                {paymentMethod === 'shopeepay'
                  ? 'ShopeePay'
                  : paymentMethod === 'promptpay'
                  ? 'QR พร้อมเพย์'
                  : paymentMethod === 'card'
                  ? 'บัตรเครดิต'
                  : 'เก็บเงินปลายทาง'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col relative animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white px-4 py-3 border-b border-[#f0eded] flex items-center justify-between z-10">
          <h3 className="text-[16px] font-bold text-[#1b1c1c]">ทำการสั่งซื้อ</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8f7069] hover:bg-[#f0eded]"
            aria-label="ปิด"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Shipping Address */}
          <div className="bg-[#f6f3f2] rounded-xl p-3">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#eae7e7]">
              <div className="flex items-center gap-1.5 text-[#b22204] font-bold text-[13px]">
                <span className="material-symbols-outlined text-[18px]">location_on</span>
                ที่อยู่จัดส่ง
              </div>
              <button
                onClick={() => onShowToast('เปลี่ยนที่อยู่จัดส่ง')}
                className="text-[11px] text-[#b22204] font-semibold"
              >
                เปลี่ยน
              </button>
            </div>
            <div className="mt-2 text-[12px] text-[#1b1c1c]">
              <p className="font-bold">สมชาย สายช้อป (+66 81-234-5678)</p>
              <p className="text-[#5b403b] mt-0.5">
                88/9 อาคารเอ็กเชน ทาวเวอร์ ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110
              </p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-2">
            <h4 className="text-[13px] font-bold text-[#1b1c1c]">
              รายการสินค้า ({items.length} ชิ้น)
            </h4>
            <div className="divide-y divide-[#f0eded]">
              {items.map((item) => (
                <div key={item.id} className="py-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-md object-cover bg-[#f0eded] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-[#1b1c1c] truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#8f7069]">จำนวน: x{item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-[#1b1c1c] shrink-0">
                    ฿{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <h4 className="text-[13px] font-bold text-[#1b1c1c]">ช่องทางชำระเงิน</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'shopeepay', label: 'ShopeePay', icon: 'payments', badge: 'แนะนำ' },
                { id: 'promptpay', label: 'QR พร้อมเพย์', icon: 'qr_code' },
                { id: 'card', label: 'บัตรเครดิต', icon: 'credit_card' },
                { id: 'cod', label: 'เก็บเงินปลายทาง', icon: 'local_atm' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                    paymentMethod === m.id
                      ? 'border-[#b22204] bg-[#ffdad3]/20 ring-1 ring-[#b22204]'
                      : 'border-[#eae7e7] hover:bg-[#f6f3f2]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-[#b22204]">
                    {m.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[12px] font-bold text-[#1b1c1c] truncate block">
                      {m.label}
                    </span>
                    {m.badge && (
                      <span className="text-[9px] bg-[#ff5722] text-white px-1 rounded font-bold">
                        {m.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-[#f6f3f2] rounded-xl p-3 space-y-1.5 text-[12px]">
            <div className="flex justify-between text-[#5b403b]">
              <span>ยอดรวมค่าสินค้า</span>
              <span>฿{totalPrice + 50}</span>
            </div>
            <div className="flex justify-between text-[#5b403b]">
              <span>ค่าจัดส่ง</span>
              <span>฿40</span>
            </div>
            <div className="flex justify-between text-[#b22204] font-medium">
              <span>โค้ดส่งฟรี</span>
              <span>-฿40</span>
            </div>
            <div className="flex justify-between text-[#b22204] font-medium">
              <span>ส่วนลด Shopee Coins</span>
              <span>-฿50</span>
            </div>
            <div className="pt-2 border-t border-[#eae7e7] flex justify-between font-bold text-[14px] text-[#1b1c1c]">
              <span>ยอดชำระเงินทั้งหมด</span>
              <span className="text-[#b22204] text-[18px]">฿{totalPrice}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="w-full h-12 rounded-full bg-[#b22204] hover:bg-[#d63c1e] text-white font-bold text-[14px] shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>กำลังดำเนินการ...</span>
            ) : (
              <>
                <span>ชำระเงินและสั่งซื้อ</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
