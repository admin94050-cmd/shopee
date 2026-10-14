import React, { useState, useEffect } from 'react';
import { APP_LOGO } from '../data/mockData';
import { UserProfile } from '../types';

interface AuthScreenProps {
  user: UserProfile;
  onLoginSuccess: (userData: Partial<UserProfile>) => void;
  onLogout: () => void;
  onShowToast: (msg: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  user,
  onLoginSuccess,
  onLogout,
  onShowToast,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('081-234-5678');
  const [emailOrUser, setEmailOrUser] = useState('');
  const [password, setPassword] = useState('••••••••');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState<number | null>(null);

  // OTP Countdown simulation
  useEffect(() => {
    if (otpCountdown === null) return;
    if (otpCountdown <= 0) {
      setOtpCountdown(null);
      return;
    }
    const timer = setInterval(() => {
      setOtpCountdown((prev) => (prev ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpCountdown]);

  const handleSendOtp = () => {
    if (otpCountdown !== null) return;
    setOtpCountdown(60);
    onShowToast(`📲 รหัส OTP ได้ถูกส่งไปยังหมายเลข ${phoneNumber} แล้ว`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      onShowToast('🎉 สมัครสมาชิกสำเร็จ! รับคูปองส่งฟรี 3 ใบ');
      onLoginSuccess({
        name: authMethod === 'phone' ? `ผู้ใช้ ${phoneNumber.slice(-4)}` : emailOrUser || 'สมาชิกใหม่',
        phone: phoneNumber,
        email: emailOrUser || 'user@example.com',
        isLoggedIn: true,
      });
    } else {
      onShowToast('✅ เข้าสู่ระบบสำเร็จ ยินดีต้อนรับกลับมา!');
      onLoginSuccess({
        name: 'สมชาย สายช้อป',
        phone: '081-234-5678',
        email: 'somchai@email.com',
        isLoggedIn: true,
      });
    }
  };

  const handleSocialLogin = (platform: 'LINE' | 'Google' | 'Apple') => {
    onShowToast(`เข้าสู่ระบบด้วยบัญชี ${platform} สำเร็จ`);
    onLoginSuccess({
      name: `ผู้ใช้ ${platform}`,
      isLoggedIn: true,
    });
  };

  // If user is already logged in, show the Account & Profile screen ("ฉัน")
  // with quick switcher to test the Auth Form!
  if (user.isLoggedIn) {
    return (
      <div className="flex flex-col w-full pb-24">
        {/* User Profile Header */}
        <div className="bg-gradient-to-b from-[#b22204] to-[#ff5722] text-white p-4 pt-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 overflow-hidden bg-white/20 flex items-center justify-center shadow-md">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-[17px] font-bold leading-tight">{user.name}</h2>
                  <span className="bg-[#ffdea8] text-[#271900] text-[10px] font-black px-1.5 py-0.2 rounded-full uppercase">
                    {user.memberTier}
                  </span>
                </div>
                <span className="text-[12px] opacity-80">{user.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onShowToast('เปิดการตั้งค่าบัญชี')}
                className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25"
                aria-label="ตั้งค่า"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
              </button>
            </div>
          </div>

          {/* Quick Balance Cards */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-2 border-t border-white/15 text-center">
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2">
              <span className="text-[11px] opacity-80">Shopee Coins</span>
              <p className="text-[16px] font-black text-[#ffdea8] mt-0.5">{user.coins}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2">
              <span className="text-[11px] opacity-80">คูปองของฉัน</span>
              <p className="text-[16px] font-black text-white mt-0.5">{user.vouchersCount} ใบ</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2">
              <span className="text-[11px] opacity-80">ร้านที่ติดตาม</span>
              <p className="text-[16px] font-black text-white mt-0.5">{user.followedShops}</p>
            </div>
          </div>
        </div>

        {/* Order Status Tracker */}
        <div className="p-3">
          <div className="bg-white rounded-2xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#f0eded]">
              <span className="text-[14px] font-bold text-[#1b1c1c]">คำสั่งซื้อของฉัน</span>
              <button
                onClick={() => onShowToast('ดูประวัติคำสั่งซื้อทั้งหมด')}
                className="text-[12px] text-[#8f7069] hover:text-[#b22204] flex items-center"
              >
                ดูประวัติ
                <span className="material-symbols-outlined text-[15px]">chevron_right</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-1 pt-3 text-center">
              {[
                { label: 'ที่ต้องชำระ', icon: 'account_balance_wallet', badge: 1 },
                { label: 'ที่ต้องจัดส่ง', icon: 'inventory_2', badge: 2 },
                { label: 'ที่ต้องได้รับ', icon: 'local_shipping', badge: 1 },
                { label: 'ให้คะแนน', icon: 'star_outline' },
                { label: 'คืนเงิน/ยกเลิก', icon: 'replay' },
              ].map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => onShowToast(`ดูรายการ: ${step.label}`)}
                  className="flex flex-col items-center group relative active:scale-95 transition-transform"
                >
                  <div className="relative text-[#5b403b] group-hover:text-[#b22204]">
                    <span className="material-symbols-outlined text-[24px]">{step.icon}</span>
                    {step.badge && (
                      <span className="absolute -top-1 -right-2 bg-[#b22204] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {step.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#5b403b] mt-1 truncate w-full">
                    {step.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Services */}
          <div className="bg-white rounded-2xl p-3.5 shadow-xs mt-3 space-y-3">
            <h3 className="text-[14px] font-bold text-[#1b1c1c]">บริการยอดนิยม</h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'ShopeePay', icon: 'payments', color: 'text-[#ff5722]' },
                { label: 'SPayLater', icon: 'credit_card', color: 'text-[#b22204]' },
                { label: 'โค้ดส่วนลด', icon: 'confirmation_number', color: 'text-[#986d00]' },
                { label: 'ศูนย์ช่วยเหลือ', icon: 'help_outline', color: 'text-[#5b403b]' },
              ].map((srv, idx) => (
                <button
                  key={idx}
                  onClick={() => onShowToast(`เปิด ${srv.label}`)}
                  className="flex flex-col items-center p-2 rounded-xl hover:bg-[#f6f3f2] active:scale-95 transition-all"
                >
                  <span className={`material-symbols-outlined text-[24px] ${srv.color}`}>
                    {srv.icon}
                  </span>
                  <span className="text-[11px] text-[#1b1c1c] mt-1 font-medium">{srv.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Switch to login / logout */}
          <div className="mt-4 px-1 flex flex-col gap-2">
            <button
              onClick={() => {
                onLogout();
                onShowToast('ออกจากระบบแล้ว');
              }}
              className="w-full py-2.5 rounded-full border border-[#ba1a1a] text-[#ba1a1a] font-bold text-[13px] hover:bg-[#ffdad6]/20 active:scale-98 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              ออกจากระบบ (สลับไปหน้าเข้าสู่ระบบ)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Auth Screen Form (Exact mockup representation from Screen 3)
  return (
    <div className="flex flex-col w-full px-3 pb-24 max-w-md mx-auto">
      {/* Brand Header Section */}
      <div className="flex flex-col items-center pt-6 pb-4 text-center relative">
        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#ffdad3] shadow-md mb-2">
          <img
            alt="ShopOrange Logo"
            className="w-14 h-14 object-contain rounded-md drop-shadow-sm"
            src={APP_LOGO}
          />
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5722] text-white shadow">
            <span className="material-symbols-outlined text-[14px]">local_mall</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#ffdad3]/60 mb-2">
          <span className="material-symbols-outlined text-[#b22204] text-[16px]">verified</span>
          <span className="text-[11px] font-bold text-[#b22204] tracking-wide uppercase">
            ช้อปสะดวก ปลอดภัย 100%
          </span>
        </div>

        <h1 className="text-[24px] font-extrabold text-[#1b1c1c] tracking-tight">
          ยินดีต้อนรับกลับมา
        </h1>
        <p className="text-[13px] text-[#b02f00] font-bold mt-0.5">ช้อปคุ้ม ส่งฟรี ทุกวัน</p>
      </div>

      {/* Main Auth Card Container */}
      <div className="w-full bg-white rounded-2xl shadow-sm p-4 flex flex-col space-y-3">
        {/* Primary Switch: เข้าสู่ระบบ / ลงทะเบียน */}
        <div className="relative bg-[#f6f3f2] p-1 rounded-full flex items-center shadow-inner">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 rounded-full text-[13px] font-bold transition-all duration-200 text-center ${
              authMode === 'login'
                ? 'bg-white text-[#b22204] shadow-xs'
                : 'text-[#5b403b] hover:text-[#1b1c1c]'
            }`}
          >
            เข้าสู่ระบบ
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 rounded-full text-[13px] font-bold transition-all duration-200 text-center ${
              authMode === 'register'
                ? 'bg-white text-[#b22204] shadow-xs'
                : 'text-[#5b403b] hover:text-[#1b1c1c]'
            }`}
          >
            ลงทะเบียนใหม่
          </button>
        </div>

        {/* Sub-Method Switch: Phone vs Email */}
        <div className="flex items-center justify-center space-x-2 pt-0.5">
          <button
            type="button"
            onClick={() => setAuthMethod('phone')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
              authMethod === 'phone'
                ? 'bg-[#ffdad3] text-[#b22204]'
                : 'bg-[#f0eded] text-[#5b403b]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">smartphone</span>
            เบอร์โทรศัพท์
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('email')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
              authMethod === 'email'
                ? 'bg-[#ffdad3] text-[#b22204]'
                : 'bg-[#f0eded] text-[#5b403b]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">mail</span>
            อีเมล / ชื่อผู้ใช้
          </button>
        </div>

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2.5 pt-1">
          {/* Phone or Email Input */}
          {authMethod === 'phone' ? (
            <div className="flex flex-col space-y-1">
              <label className="text-[12px] text-[#5b403b] font-semibold">
                เบอร์โทรศัพท์มือถือ
              </label>
              <div className="flex items-stretch gap-2">
                {/* +66 Prefix */}
                <div className="flex items-center justify-center px-3 bg-[#f0eded] rounded-xl text-[13px] font-bold text-[#1b1c1c]">
                  🇹🇭 +66
                </div>
                <div className="relative flex-1 flex items-center">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="081-234-5678"
                    required
                    className="w-full h-11 px-3 pr-20 bg-[#f6f3f2] rounded-xl text-[14px] text-[#1b1c1c] placeholder:text-[#8f7069] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b22204] transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpCountdown !== null}
                    className={`absolute right-1.5 px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all ${
                      otpCountdown !== null
                        ? 'bg-[#eae7e7] text-[#8f7069] cursor-not-allowed'
                        : 'bg-[#ff5722]/15 text-[#b02f00] hover:bg-[#ff5722]/25 active:scale-95'
                    }`}
                  >
                    {otpCountdown !== null ? `รอ ${otpCountdown}s` : 'ส่ง OTP'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-1">
              <label className="text-[12px] text-[#5b403b] font-semibold">
                อีเมล หรือ ชื่อผู้ใช้งาน
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#8f7069] text-[20px]">
                  account_circle
                </span>
                <input
                  type="text"
                  value={emailOrUser}
                  onChange={(e) => setEmailOrUser(e.target.value)}
                  placeholder="user@email.com หรือ username"
                  required
                  className="w-full h-11 pl-10 pr-3.5 bg-[#f6f3f2] rounded-xl text-[14px] text-[#1b1c1c] placeholder:text-[#8f7069] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b22204] transition-all"
                />
              </div>
            </div>
          )}

          {/* Password with Eye Toggle */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-[12px] text-[#5b403b] font-semibold">รหัสผ่าน</label>
              {authMode === 'login' && (
                <button
                  type="button"
                  onClick={() => onShowToast('เปิดหน้าตั้งรหัสผ่านใหม่ทาง SMS/อีเมล')}
                  className="text-[11px] text-[#b02f00] hover:underline"
                >
                  ลืมรหัสผ่าน?
                </button>
              )}
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#8f7069] text-[20px]">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="กรอกรหัสผ่านของคุณ"
                required
                className="w-full h-11 pl-10 pr-10 bg-[#f6f3f2] rounded-xl text-[14px] text-[#1b1c1c] placeholder:text-[#8f7069] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b22204] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-[#5b403b] hover:text-[#1b1c1c]"
                aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          {/* Confirm Password (Register mode only) */}
          {authMode === 'register' && (
            <div className="flex flex-col space-y-1">
              <label className="text-[12px] text-[#5b403b] font-semibold">
                ยืนยันรหัสผ่านอีกครั้ง
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#8f7069] text-[20px]">
                  lock_reset
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="ระบุรหัสผ่านให้ตรงกัน"
                  required
                  className="w-full h-11 pl-10 pr-10 bg-[#f6f3f2] rounded-xl text-[14px] text-[#1b1c1c] placeholder:text-[#8f7069] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#b22204] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 p-1 text-[#5b403b] hover:text-[#1b1c1c]"
                  aria-label={showConfirmPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showConfirmPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Primary Action CTA Button */}
          <div className="pt-1.5">
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#b22204] text-white text-[14px] font-bold shadow-md hover:bg-[#d63c1e] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{authMode === 'login' ? 'เข้าสู่ระบบ' : 'สร้างบัญชีใหม่'}</span>
              <span className="material-symbols-outlined text-[18px]">
                {authMode === 'login' ? 'arrow_forward' : 'how_to_reg'}
              </span>
            </button>
          </div>

          {/* Micro Banner */}
          <div className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#f6f3f2] rounded-xl text-center">
            <span className="material-symbols-outlined text-[#986d00] text-[17px]">
              local_shipping
            </span>
            <span className="text-[11px] text-[#5b403b] font-medium">
              สมาชิกใหม่รับคูปองส่งฟรี 0 บาท ทันที 3 ใบ
            </span>
          </div>
        </form>

        {/* Social Login Divider */}
        <div className="relative flex items-center justify-center py-1">
          <div className="w-full h-[1px] bg-[#e5e2e1] absolute"></div>
          <span className="relative bg-white px-3 text-[12px] text-[#8f7069]">
            หรือเข้าสู่ระบบด้วย
          </span>
        </div>

        {/* Social Identity Buttons: LINE, Google, Apple */}
        <div className="grid grid-cols-3 gap-2">
          {/* LINE Button */}
          <button
            type="button"
            onClick={() => handleSocialLogin('LINE')}
            className="h-10 flex items-center justify-center gap-1 rounded-xl bg-[#06C755]/10 hover:bg-[#06C755]/20 text-[#06C755] active:scale-95 transition-all shadow-xs"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M19.365 9.864c0-4.02-4.195-7.28-9.365-7.28C4.829 2.584.635 5.844.635 9.864c0 3.6 3.324 6.612 7.81 7.172.304.066.718.201.823.46.094.236.062.605.03.843l-.133.805c-.04.246-.19 1.002.877.546 1.066-.456 5.766-3.396 7.868-5.816 1.455-1.688 2.055-3.41 2.055-4.014" />
            </svg>
            <span className="text-[12px] font-bold">LINE</span>
          </button>

          {/* Google Button */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="h-10 flex items-center justify-center gap-1 rounded-xl bg-[#f0eded] hover:bg-[#eae7e7] text-[#1b1c1c] active:scale-95 transition-all shadow-xs"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                fill="#4285F4"
              />
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                fill="#34A853"
              />
              <path
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                fill="#FBBC05"
              />
              <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-[12px] font-semibold">Google</span>
          </button>

          {/* Apple Button */}
          <button
            type="button"
            onClick={() => handleSocialLogin('Apple')}
            className="h-10 flex items-center justify-center gap-1 rounded-xl bg-[#303030] text-white hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.42-6-9.28-10.73-19.8-14.21-31.54-3.47-11.75-5.21-23.13-5.21-34.15 0-16.08 4.21-29.45 12.63-40.11 8.41-10.66 18.73-16.14 30.95-16.44 5.37.11 11.08 1.44 17.13 3.99 6.05 2.56 10.15 3.89 12.3 3.99 1.77 0 6.03-1.49 12.78-4.47 6.75-2.98 12.51-4.25 17.29-3.8 12.98.98 23.36 5.8 31.13 14.47-11.35 6.84-16.89 16.3-16.63 28.38.27 9.5 3.98 17.39 11.13 23.66 7.15 6.27 15.53 9.77 25.13 10.5-2.18 6.74-4.88 13.57-8.1 20.48zM119.22 33.15c0-7.39 2.68-14.41 8.04-21.06 5.36-6.65 12.1-10.99 20.22-13.01.22 1.3.33 2.6.33 3.91 0 7.39-2.82 14.73-8.47 22.03-5.65 7.3-12.44 11.73-20.36 13.29-.22-1.52-.33-2.73-.33-3.64l.57-1.52z" />
            </svg>
            <span className="text-[12px] font-semibold">Apple</span>
          </button>
        </div>
      </div>

      {/* Terms & Privacy Footnote */}
      <div className="mt-4 text-center px-2">
        <p className="text-[11px] text-[#8f7069] leading-relaxed">
          การเข้าสู่ระบบหรือลงทะเบียน แสดงว่าคุณยอมรับ{' '}
          <button
            onClick={() => onShowToast('เปิดเงื่อนไขการใช้บริการ')}
            className="text-[#b02f00] font-medium underline"
          >
            เงื่อนไขการใช้บริการ
          </button>{' '}
          และรับทราบ{' '}
          <button
            onClick={() => onShowToast('เปิดนโยบายความเป็นส่วนตัว')}
            className="text-[#b02f00] font-medium underline"
          >
            นโยบายความเป็นส่วนตัว
          </button>{' '}
          ของ ShopOrange
        </p>
      </div>
    </div>
  );
};
