'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';
import { createClient } from '@/utils/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // URL hash에서 access token 확인
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      setIsReady(true);
    } else {
      setToast({ message: '유효한 리셋 링크가 아닙니다.', type: 'error' });
      setTimeout(() => router.push('/auth/login'), 2000);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setToast({ message: '비밀번호가 일치하지 않습니다.', type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setToast({ message: error.message, type: 'error' });
        setIsLoading(false);
        return;
      }

      setToast({ message: '비밀번호가 변경되었습니다.', type: 'success' });
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (error) {
      setToast({ message: '비밀번호 변경 중 오류가 발생했습니다.', type: 'error' });
      setIsLoading(false);
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-5">
        <div className="w-full max-w-sm text-center">
          <p className="text-[var(--text)]">링크를 확인 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-12">
          한입 링크
        </h1>

        <h2 className="text-lg font-bold text-[var(--text)] text-center mb-8">
          비밀번호 재설정
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input */}
          <div>
            <label className="block text-sm font-bold text-[var(--text)] mb-2">
              새 비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="새 비밀번호를 입력하세요"
              required
              disabled={isLoading}
              className="w-full px-4 py-3.5 bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] rounded-xl focus:outline-none focus:bg-white transition-all disabled:opacity-50"
              style={{
                boxShadow: '0 0 0 2px transparent',
              } as React.CSSProperties}
              onFocus={(e) => {
                if (!isLoading) e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
              }}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-bold text-[var(--text)] mb-2">
              비밀번호 확인
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
              disabled={isLoading}
              className="w-full px-4 py-3.5 bg-[#F4F4F4] text-[var(--text)] placeholder-[var(--placeholder)] rounded-xl focus:outline-none focus:bg-white transition-all disabled:opacity-50"
              style={{
                boxShadow: '0 0 0 2px transparent',
              } as React.CSSProperties}
              onFocus={(e) => {
                if (!isLoading) e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 2px transparent';
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!password || !confirmPassword || isLoading}
            className="w-full px-5 py-3.5 bg-[var(--accent)] text-white rounded-xl font-bold hover:opacity-90 transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '변경 중...' : '비밀번호 변경'}
          </button>
        </form>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
