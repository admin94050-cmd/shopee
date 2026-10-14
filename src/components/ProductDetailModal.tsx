import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant?: string, quantity?: number) => void;
  onBuyNow: (product: Product, variant?: string, quantity?: number) => void;
  onShowToast: (msg: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onShowToast,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || 'มาตรฐาน'
  );
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col relative animate-in fade-in slide-in-from-bottom duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          aria-label="ปิด"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Product Image */}
        <div className="relative w-full aspect-square max-h-72 bg-[#f0eded] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <span
              className={`font-bold text-[10px] px-2 py-0.5 rounded shadow text-white ${
                product.shopType === 'Mall'
                  ? 'bg-[#b22204]'
                  : product.shopType === 'ร้านแนะนำ'
                  ? 'bg-[#ff5722]'
                  : 'bg-[#e65100]'
              }`}
            >
              {product.shopType}
            </span>
            <span className="bg-[#ffdea8] text-[#b22204] text-[10px] font-black px-1.5 py-0.5 rounded shadow">
              ลด {product.discountPercent}%
            </span>
          </div>
        </div>

        {/* Details Body */}
        <div className="p-4 flex flex-col space-y-3">
          {/* Price & Rating */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[24px] font-black text-[#b22204]">฿{product.price}</span>
              <span className="text-[14px] text-[#8f7069] line-through">
                ฿{product.originalPrice}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[15px] text-[#ffba20]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span className="text-[12px] font-bold text-[#5b403b]">{product.rating}</span>
              <span className="text-[11px] text-[#8f7069]">| ขายแล้ว {product.soldCount}</span>
            </div>
          </div>

          <h2 className="text-[15px] font-semibold text-[#1b1c1c] leading-snug">
            {product.name}
          </h2>

          {product.description && (
            <p className="text-[12px] text-[#5b403b] leading-relaxed bg-[#f6f3f2] p-2.5 rounded-xl">
              {product.description}
            </p>
          )}

          {/* Shop Row */}
          <div className="flex items-center justify-between p-2.5 bg-[#f6f3f2] rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#ffdad3] flex items-center justify-center text-[#b22204] font-bold text-[14px]">
                {product.shopName.slice(0, 1)}
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#1b1c1c]">{product.shopName}</p>
                <p className="text-[10px] text-[#8f7069]">ตอบกลับแชทภายในไม่กี่นาที</p>
              </div>
            </div>
            <button
              onClick={() => onShowToast(`ไปที่หน้าร้าน: ${product.shopName}`)}
              className="text-[11px] font-bold text-[#b22204] border border-[#b22204] px-2.5 py-1 rounded-full hover:bg-[#ffdad3]/30"
            >
              ดูร้านค้า
            </button>
          </div>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <label className="text-[12px] font-bold text-[#1b1c1c]">ตัวเลือกสินค้า:</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                      selectedVariant === v
                        ? 'border border-[#b22204] bg-[#ffdad3]/30 text-[#b22204] font-bold'
                        : 'border border-[#eae7e7] bg-white text-[#5b403b] hover:bg-[#f6f3f2]'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between pt-1 pb-2">
            <span className="text-[12px] font-bold text-[#1b1c1c]">จำนวน:</span>
            <div className="flex items-center bg-[#f0eded] rounded-lg p-0.5">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-[#1b1c1c] rounded hover:bg-[#eae7e7]"
                aria-label="ลดจำนวน"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="text-[14px] font-bold text-[#1b1c1c] px-3 min-w-[32px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center text-[#1b1c1c] rounded hover:bg-[#eae7e7]"
                aria-label="เพิ่มจำนวน"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f0eded]">
            <button
              onClick={() => {
                onAddToCart(product, selectedVariant, quantity);
                onClose();
              }}
              className="h-11 rounded-full border border-[#b22204] text-[#b22204] font-bold text-[13px] hover:bg-[#ffdad3]/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">
                shopping_cart_checkout
              </span>
              ใส่ตะกร้า
            </button>
            <button
              onClick={() => {
                onBuyNow(product, selectedVariant, quantity);
                onClose();
              }}
              className="h-11 rounded-full bg-[#b22204] text-white font-bold text-[13px] hover:bg-[#d63c1e] active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>ซื้อสินค้าเลย</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
