import React from 'react';
import { FLASH_PRODUCTS, RECOMMENDED_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface CameraSearchModalProps {
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

export const CameraSearchModal: React.FC<CameraSearchModalProps> = ({
  onClose,
  onSelectProduct,
  onShowToast,
}) => {
  const sampleSearches = [
    { title: 'หูฟังไร้สาย TWS', product: RECOMMENDED_PRODUCTS[0] },
    { title: 'ลำโพงบลูทูธ', product: FLASH_PRODUCTS[0] },
    { title: 'แก้วเก็บความเย็น', product: FLASH_PRODUCTS[1] },
    { title: 'เสื้อยืด Oversize', product: RECOMMENDED_PRODUCTS[1] },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f0eded] text-[#8f7069] flex items-center justify-center hover:bg-[#eae7e7]"
          aria-label="ปิด"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        <div className="text-center pt-2">
          <div className="w-14 h-14 rounded-2xl bg-[#ffdad3] text-[#b22204] flex items-center justify-center mx-auto mb-2">
            <span className="material-symbols-outlined text-[32px]">photo_camera</span>
          </div>
          <h3 className="text-[17px] font-extrabold text-[#1b1c1c]">ค้นหาด้วยรูปภาพ</h3>
          <p className="text-[12px] text-[#8f7069] mt-0.5">
            ถ่ายรูปหรือเลือกรูปภาพสินค้าที่คุณต้องการค้นหา
          </p>
        </div>

        {/* Scan Frame */}
        <div className="mt-4 border-2 border-dashed border-[#b22204]/40 rounded-2xl p-6 text-center bg-[#fcf9f8] flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[36px] text-[#b22204]/70 mb-1">
            add_a_photo
          </span>
          <span className="text-[12px] font-semibold text-[#1b1c1c]">
            แตะเพื่ออัปโหลดรูปภาพ
          </span>
          <span className="text-[10px] text-[#8f7069] mt-0.5">รองรับ JPG, PNG</span>
        </div>

        {/* Quick Sample Matches */}
        <div className="mt-4">
          <p className="text-[11px] font-bold text-[#5b403b] mb-2">หรือทดลองค้นหาจากตัวอย่าง:</p>
          <div className="grid grid-cols-2 gap-2">
            {sampleSearches.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectProduct(s.product);
                  onClose();
                  onShowToast(`🔍 ผลการค้นหาภาพ: "${s.title}"`);
                }}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-[#eae7e7] hover:border-[#b22204] hover:bg-[#ffdad3]/15 transition-all text-left"
              >
                <img
                  src={s.product.image}
                  alt={s.title}
                  className="w-8 h-8 rounded-lg object-cover bg-[#f0eded]"
                />
                <span className="text-[11px] font-medium text-[#1b1c1c] truncate">
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
