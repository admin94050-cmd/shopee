import { Product, CartItem, Voucher, UserProfile, NotificationItem } from '../types';

export const APP_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1VAKeP29D-B_YnekbJLyKvz7ZMsc3wELNB-JHuH72qwSfyqyHBYy7mKV3KWoCjidfuzk0diiEkIUXXqzW_ygnQowp8m7cfOHMuczoEnc99dguZ33zQSJVvdFeFgU_tlTdYtuYbXuFF3NKwm9peAbBqrDazEtxMiFxp5zAK5SSxOrt2yeMgCZ6b813OEc5hvqiRolbzPouwNuiSHzWRZLzVeYc9LzWkXDEMPxotuwuxZFQUffOYlFgBx67gJ';

export const FLASH_PRODUCTS: Product[] = [
  {
    id: 'flash-1',
    name: 'ลำโพงบลูทูธพกพา สีส้มซันเซ็ท แบตเตอรี่อึด 12 ชม. เสียงเบสแน่น กันน้ำ IPX7',
    price: 199,
    originalPrice: 590,
    discountPercent: 66,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZrG0fGY1_0kPi4thQz0TDQzZH0AUCMOKQSquQTYc62M8DsUITJ1NwAFYarJReKLN-b_Ov4LXvNX7gksh9AUiB9u8yOg7VTR77WsqDxVJvWgpMVke2QKyZNTQk0_cQTGVecmjNBCJbWoYD4YSgQWwz4AqtMdnt_FrpqczUdnBzFG-Z4NFqOUJintLG5JyIwERsZbF8yJaXvhc0MqnZyunTsfDHTbU0ysDC7yRRKHTO07UbvpwURMUFHQ',
    rating: 4.8,
    soldCount: '4.1k',
    soldProgressPercent: 85,
    soldStatusText: 'ขายแล้ว 85%',
    shopName: 'Aura Sound Official',
    shopType: 'Mall',
    tags: ['ส่งฟรี', 'Flash Sale'],
    category: 'ไอทีลดแรง',
    variants: ['สีส้ม Sunset', 'สีดำ Matte Black', 'สีขาว Minimal'],
    description: 'ลำโพงบลูทูธ 5.3 พกพาสะดวกด้วยสายคล้องคุณภาพสูง เสียงคมชัด เบสแน่นสะใจ ใช้งานได้ยาวนานถึง 12 ชั่วโมงเต็ม'
  },
  {
    id: 'flash-2',
    name: 'แก้วสแตนเลสสูญญากาศเก็บความเย็น/ร้อน มินิมอล พร้อมหลอดดูด',
    price: 149,
    originalPrice: 299,
    discountPercent: 50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANF1vuvsruoERF1IZv9VSn6nHaLcEe6GRdT9Hew4Cm3cO2pKU6P8_wxsgWFn2V1j3UZX3D71cs9sAjy2bJu3OCySFmEi_Evax2eOwleCVMMcv9Z7xDQXgxMBvzzKiSxbcz8csknvrMIWgF2APocKTjR2zpFmLec_81EuDWVGtwNwo9kh_-kE20WOcKcJA0m1QMlCKAT1U9FM-o5y8PyIk9hLMm0NrVc1S0Qbhum9Ii-oSKgVLOAoOBPQ',
    rating: 4.9,
    soldCount: '7.8k',
    soldProgressPercent: 62,
    soldStatusText: 'ขายแล้ว 62%',
    shopName: 'Echo Minimal Home',
    shopType: 'ร้านแนะนำ',
    tags: ['ส่งฟรี', 'ของแท้ 100%'],
    category: 'ของใช้บ้าน',
    variants: ['สีขาวด้าน 550ml', 'สีดำด้าน 550ml', 'สีเทาสโมค 750ml'],
    description: 'แก้วเก็บอุณหภูมิสแตนเลสฟู้ดเกรด 304 เก็บน้ำแข็งยาวนาน 18-24 ชั่วโมง ไม่ขึ้นหยดน้ำรอบแก้ว'
  },
  {
    id: 'flash-3',
    name: 'แท่นชาร์จไร้สาย Fast Wireless Charger ขอบเมทัลลิก ไฟ LED Halo',
    price: 89,
    originalPrice: 299,
    discountPercent: 70,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBJ9jfSq66cdF5mGQ-CpRQVd2hcm9aMT-K6iavsKo5lToGKgW9hm5MNKR6TR7NupyWUSPPhaoWSo9dFiNSNkFnhtOsn_onAtDNTxzXw5BrklqWYdDomVVtAym0ZDIfv7A3q8uFPQnnVMJTT9Kmy9eB4ML8RoI0tRzdI4xfvj1JKAiVZV8UE6L-nccbaDynmhp1yDIt7ll9056nIHwZimQ6va6AAacoI3ZNlsPkIMMpsSJogf4xdRS2IQ',
    rating: 4.7,
    soldCount: '12.4k',
    soldProgressPercent: 94,
    soldStatusText: 'ใกล้หมด',
    shopName: 'TechGadget Official Shop',
    shopType: 'Mall',
    tags: ['ส่งฟรี 0 บาท', 'ลดราคาพิเศษ'],
    category: 'ไอทีลดแรง',
    variants: ['Space Gray 15W', 'Midnight Black 20W'],
    description: 'แผ่นชาร์จไวมาตรฐาน Qi รองรับกำลังไฟสูงสุด 20W มีชิปป้องกันความร้อนและไฟกระชาก ปลอดภัยสูง'
  },
  {
    id: 'flash-4',
    name: 'เครื่องพ่นอโรมาเพิ่มความชื้น ไอน้ำนาโน พร้อมไฟนอนโทนอุ่น',
    price: 125,
    originalPrice: 230,
    discountPercent: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCC2ILdF4o4vyM-toATW_VgzK82EnbC4N5d2HD5xRA1wDBVeSS3JGQ5Z2dxJQ0dOyQNzPoBjxA0N4RqIzrALlXoPzVa9dVOz_SbEzjtAaf299K0ZiElACbS3a_WKbPdf0gCQD0yORClAaw2emcKWVVsbBFzObdZZeoq3fktNLPSHWp4TdEiDl7FBP99DiOEo39iFU5M6t1wMInEqKZvftAPJwl7swMjEgSpx46O1R0JvWmQLQ3LGwldog',
    rating: 4.8,
    soldCount: '3.3k',
    soldProgressPercent: 40,
    soldStatusText: 'ขายแล้ว 40%',
    shopName: 'HomeVibes Studio',
    shopType: 'ร้านแนะนำ',
    tags: ['ส่งฟรี'],
    category: 'ของใช้บ้าน',
    variants: ['สีขาว Minimal 300ml', 'สีชมพูพาสเทล 300ml'],
    description: 'เครื่องเพิ่มความชื้นในห้องแอร์ ลดอาการคอแห้ง ผิวแห้ง ทำงานเงียบสนิท พร้อมไฟ Warm Light สบายตา'
  }
];

export const RECOMMENDED_PRODUCTS: Product[] = [
  {
    id: 'rec-1',
    name: 'หูฟังบลูทูธไร้สาย TWS ระบบตัดเสียงรบกวน แบตอึด 36 ชม. เบสแน่น',
    price: 450,
    originalPrice: 820,
    discountPercent: 45,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp_CWzM0H1q-bqYqCrIr4r55To-NkZ-k0KQi3BpgRCdSffI8EpfrQJLE3gcrmyWP5e536rd02ZU4piNXjSjN50tQxHCHwd-bjiC8n-qFL7SxgvMRCiNdxwzLLWx0Y2czMxykRR8eVIxcc93Pw62mx9Q7vIrJr6-V_iRH2X35jx4uyC2508jcudAFcZC-D0vs2lI60Bwk-nBnzvH0YrowGDKnViztb9XvivHOKl8yhRf43ZX6w02_nC2w',
    rating: 4.9,
    soldCount: '3.8k',
    shopName: 'TechGadget Official Shop',
    shopType: 'Mall',
    tags: ['ส่งฟรี', 'ช้อปเพิ่มลดอีก'],
    category: 'ไอทีลดแรง',
    variants: ['สีดำด้าน (Matte Black)', 'สีขาวมุก (Pearl White)'],
    description: 'หูฟังระบบ Hybrid Active Noise Cancelling ตัดเสียงรบกวนได้ถึง 35dB เชื่อมต่อผ่านบลูทูธ 5.4 กันน้ำกันเหงื่อ IPX5'
  },
  {
    id: 'rec-2',
    name: 'เสื้อยืดมินิมอล Oversize คอตตอน 100% สไตล์เกาหลี ผ้าหนานุ่ม ไม่ย้วย',
    price: 189,
    originalPrice: 270,
    discountPercent: 30,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz_z81eWzXa_s-dK5f_JRykOLrgnxFCEiM2n6wxAt3uM76EkbJfk1RT7E6Xj-kZKxgJX2vRrq6FPrRSbNA9kVb9FgXKlYmjGiSnRU3SnzrZLnGFx9CqK55aVGCjS5ybUYZDRIJHUJrKZbG7Is2q91pUY-QxsuOmecy19Ve93ltdiOB30lzIs-ptlUP09aghI1klz2ZqF97AYosnTAY-K3sS1znPRdMJ6mat6ccXfeemdppyhMc-zxxLQ',
    rating: 4.8,
    soldCount: '5.2k',
    shopName: 'Seoul Streetwear Official',
    shopType: 'ร้านแนะนำ',
    tags: ['ส่งฟรี', 'ยอดนิยม'],
    category: 'แฟชั่น',
    variants: ['เขียวมะกอก Olive (M)', 'เขียวมะกอก Olive (L)', 'ครีม Cream (L)', 'ดำ Black (XL)'],
    description: 'เสื้อยืดผ้า Premium Comb Cotton 100% เบอร์ 20 ระบายอากาศเยี่ยม ทรงโอเวอร์ไซส์แท้สไตล์เกาหลี'
  },
  {
    id: 'rec-3',
    name: 'เซรั่มไฮยาหน้าใสสูตรเข้มข้น ล็อคความชุ่มชื้น ลดรอยสิว กระชับรูขุมขน',
    price: 329,
    originalPrice: 658,
    discountPercent: 50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQOR4fHyz1_ngVVhyDRUXANuv--S8h9U7yu5TlvusstfMXcWTebpr5EC93YEA8q5PteniGwQqE2IwNayW_zmhFZFjhHL9_65DFd1JC3yrQdM2KVQgkdehfi4BS_lwgrcaRM4uqzPET3sRB-z6zqcbkWF5XU0UmT4Yxdm1wRrXSfixr0cKqBuD4085en-ub4awMIPCHQbKS2VVoOJamCII0awllVqKNgRgIl9MphN1R6DxV3FefW8vHpA',
    rating: 4.9,
    soldCount: '1.9k',
    shopName: 'Aurora Botanicals Thailand',
    shopType: 'Mall',
    tags: ['ของแท้ 100%', 'Mall เท่านั้น'],
    category: 'ความงาม',
    variants: ['ขวดเดี่ยว 30ml', 'เซ็ตคู่ 30ml x 2'],
    description: 'ผสาน Hyaluronic Acid 8 โมเลกุล และ Niacinamide เข้มข้น 5% ช่วยเติมน้ำให้ผิวอิ่มฟู กระจ่างใสเป็นธรรมชาติ'
  },
  {
    id: 'rec-4',
    name: 'แก้วเก็บความเย็น 900ml สแตนเลส 316 เก็บน้ำแข็งได้นานถึง 24 ชม.',
    price: 289,
    originalPrice: 466,
    discountPercent: 38,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCubwtFh76JAZ8t0Nh7ewGJZbIHtMeL8QOBllX_tB7tViYLNbxSETVqswT0_t2p0mZzAqvV87ArhwmZTxRNRIMk2sOG26zRHU1EyUQo5ovr02_9tCx1bL2TPPl-YMT3xRRQ4v9a-Z_13QtVT2d0fbtH97CnQECqt_Gw3_nC5Ncuqm4UWLwB-HnzwXcZ37gQBkvFWxKWKSVzaEB4NpR_bXoQyTW4MvWZlhQD4IcVwDMTX4k3KDpzeqdTGw',
    rating: 4.9,
    soldCount: '8.4k',
    shopName: 'Aura Living Official',
    shopType: 'ขายดี',
    tags: ['ส่งฟรี', 'ขายดีอันดับ 1'],
    category: 'ของใช้บ้าน',
    variants: ['สีชมพู Rose Quartz 900ml', 'สีเขียว Sage Green 900ml', 'สีขาว Cloud White 900ml'],
    description: 'แก้วเก็บความเย็นรุ่นหูจับถนัดมือ ทำจากสแตนเลสเกรดการแพทย์ 316 ปลอดภัย ไร้กลิ่นโลหะสนิม'
  }
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-item-1',
    productId: 'cart-earbuds',
    name: 'หูฟังไร้สาย True Wireless ANC Bass Boost กันน้ำ IPX5',
    price: 589,
    originalPrice: 990,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_aNW248UBWFF0IA8Lc7Hy_zpuIKjTgWMTZAjobeZNsIBmTFnG3v41lmYwLs2XE3ASKt7gXdYN2ilgPw5anPpaJZM4l616OIYUyTO12UANVAzn_UOcXe-L3n2YXzQbb_goKqgBSFZFF1-fsCcFRUDHjl66f-vfLZRuJafhvaOj4kbDCSrMcny4vq2ZUGcuK3Fz1tWBk5Nc-wpbQIAcHBKZheXQFei_joarJiHVGqFrE8cuL8T7FfkiZw',
    shopName: 'TechGadget Official Shop',
    shopType: 'Mall',
    variant: 'สีดำด้าน (Matte Black), 128GB',
    variantsList: ['สีดำด้าน (Matte Black), 128GB', 'สีขาวมุก (Pearl White), 128GB'],
    quantity: 1,
    selected: true,
    shopVoucherText: 'โค้ดส่วนลดร้านค้า ลดทันที ฿50',
    shopVoucherClaimed: true
  },
  {
    id: 'cart-item-2',
    productId: 'cart-mug',
    name: 'แก้วมัคเซรามิกสไตล์นอร์ดิก พร้อมจานรองไม้ยางพารา',
    price: 199,
    originalPrice: 350,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1pb1tJkgRJjk4wcCxrzvIn-UTTDGMTTgdrCaHScIjx-B3ON40k7jk861Uds4hVddK-eO1UVcZW-08FkugVlejoDcW96LzitCHOt3YNN66LI5I3uTKxxPjif2giCHl-GTTzzxKyg0x6i6iYZTdlkhO680-yDFFFVWdauGj4T3MmWK2ZN95g1JxZVaaAS41qZUDwb22omTwvqzcs-E0ysd5yzU4OdeSGKhKFfa2eFcmxXqWsLDfY4uIew',
    shopName: 'CozyHome Living Official',
    shopType: 'Preferred+',
    variant: 'สีครีมมิลค์, ไซส์ L (450ml)',
    variantsList: ['สีครีมมิลค์, ไซส์ L (450ml)', 'สีเทาหม่น, ไซส์ L (450ml)'],
    quantity: 1,
    selected: true
  },
  {
    id: 'cart-item-3',
    productId: 'cart-candle',
    name: 'เทียนหอมไขถั่วเหลืองธรรมชาติ กลิ่น English Pear',
    price: 150,
    originalPrice: 290,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG_cCekI61gMN27H8kd0F4AC-qhKT82s_YC0DHcEQCnbdgIGqGHGBWV8R5qiORDbz-LuEJLGbobqYqrcXlDzURix4eCxhnEEmLzBTVaYIdk5U_W9CyS_dxTK-fX9TVJMqsgvAbD2dijBshKd-ksd9RlSpGTlf76GjB0aDdSlJlTfjgvpzOFMKz0sQq05AAIj37x_kztVcpwrTC0ZbVYviWA6luX3vP8K0nTh86dYPzdTxUQM_2Tg316Q',
    shopName: 'CozyHome Living Official',
    shopType: 'Preferred+',
    variant: 'กลิ่นลูกแพร์ & ดอกฟรีเซีย (180g)',
    variantsList: ['กลิ่นลูกแพร์ & ดอกฟรีเซีย (180g)', 'กลิ่นวานิลลา & คาราเมล (180g)', 'กลิ่นลาเวนเดอร์ผ่อนคลาย (180g)'],
    quantity: 1,
    selected: true
  }
];

export const VOUCHERS: Voucher[] = [
  {
    id: 'v-ship',
    title: 'โค้ดส่งฟรี ขั้นต่ำ ฿0',
    description: 'ลดค่าส่งสูงสุด ฿40 ทั่วไทย',
    discountAmount: 40,
    type: 'shipping',
    minSpend: 0,
    claimed: true
  },
  {
    id: 'v-mega',
    title: 'โค้ด Mega Day ลดเพิ่ม ฿150',
    description: 'เมื่อช้อปครบ ฿800 ขึ้นไป',
    discountAmount: 150,
    type: 'discount',
    minSpend: 800,
    claimed: true
  },
  {
    id: 'v-cashback',
    title: 'เงินคืน 25% Coins',
    description: 'รับคืนสูงสุด 200 Shopee Coins',
    discountAmount: 50,
    type: 'cashback',
    minSpend: 200,
    claimed: false
  }
];

export const DEFAULT_USER: UserProfile = {
  name: 'สมชาย สายช้อป',
  username: 'somchai_94050',
  phone: '081-234-5678',
  email: 'somchai@email.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  memberTier: 'Gold',
  coins: 145,
  vouchersCount: 8,
  followedShops: 12,
  isLoggedIn: true
};

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'พัสดุกำลังนำจ่ายถึงบ้านคุณวันนี้',
    description: 'คำสั่งซื้อ #TH26099901 พนักงานกำลังเดินทางมาส่ง กรุณารอรับโทรศัพท์',
    time: '10 นาทีที่แล้ว',
    read: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_aNW248UBWFF0IA8Lc7Hy_zpuIKjTgWMTZAjobeZNsIBmTFnG3v41lmYwLs2XE3ASKt7gXdYN2ilgPw5anPpaJZM4l616OIYUyTO12UANVAzn_UOcXe-L3n2YXzQbb_goKqgBSFZFF1-fsCcFRUDHjl66f-vfLZRuJafhvaOj4kbDCSrMcny4vq2ZUGcuK3Fz1tWBk5Nc-wpbQIAcHBKZheXQFei_joarJiHVGqFrE8cuL8T7FfkiZw'
  },
  {
    id: 'notif-2',
    type: 'promo',
    title: '🔥 Flash Sale เริ่มต้นแล้ว ฿89 บาท!',
    description: 'ดีลเด็ดแท่นชาร์จไร้สาย และลำโพงบลูทูธ ลดราคาสูงสุด 80% ถึงเที่ยงคืนนี้เท่านั้น',
    time: '45 นาทีที่แล้ว',
    read: false
  },
  {
    id: 'notif-3',
    type: 'promo',
    title: 'คุณได้รับโค้ดส่งฟรี ฿0 บาทใหม่ 3 ใบ',
    description: 'ใช้ได้ทันทีกับสินค้าทุกหมวดหมู่ ไม่มีขั้นต่ำ หมดอายุสิ้นเดือนนี้',
    time: '2 ชม. ที่แล้ว',
    read: true
  },
  {
    id: 'notif-4',
    type: 'activity',
    title: 'ยินดีด้วย! คุณได้รับ 50 Shopee Coins',
    description: 'จากการเช็คอินประจำวันต่อเนื่อง 7 วัน แวะมาช้อปต่อเลย!',
    time: '1 วันที่แล้ว',
    read: true
  }
];
