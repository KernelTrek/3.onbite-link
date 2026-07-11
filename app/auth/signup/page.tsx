'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 기능은 구현하지 않음
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-12">
          한입 링크
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
              required
              className="w-full px-4 py-3.5 bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] rounded-xl focus:outline-none focus:bg-white transition-all"
              style={{
                boxShadow: '0 0 0 2px transparent',
              } as React.CSSProperties}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
              }}
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
              className="w-full px-4 py-3.5 bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] rounded-xl focus:outline-none focus:bg-white transition-all"
              style={{
                boxShadow: '0 0 0 2px transparent',
              } as React.CSSProperties}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
              }}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 확인"
              required
              className="w-full px-4 py-3.5 bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] rounded-xl focus:outline-none focus:bg-white transition-all"
              style={{
                boxShadow: '0 0 0 2px transparent',
              } as React.CSSProperties}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
              }}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full px-5 py-3.5 bg-[var(--accent)] text-white rounded-xl font-bold hover:opacity-90 transition-all mt-8"
          >
            회원가입
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-[var(--text-sub)] text-sm">
            이미 계정이 있으신가요?{' '}
            <Link
              href="/auth/login"
              className="text-[var(--accent)] font-bold hover:opacity-80 transition-opacity"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
