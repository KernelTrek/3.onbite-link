'use client';

import { useState } from 'react';
import Link from 'next/link';
import Toast from '@/components/Toast';
import { createClient } from '@/utils/supabase/client';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setToast({ message: error.message, type: 'error' });
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      setToast({
        message: '비밀번호 리셋 링크가 이메일로 발송되었습니다.',
        type: 'success'
      });
    } catch (error) {
      setToast({ message: '비밀번호 리셋 요청 중 오류가 발생했습니다.', type: 'error' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[var(--text)] text-center mb-12">
          한입 링크
        </h1>

        {isSubmitted ? (
          <div className="text-center space-y-4">
            <p className="text-[var(--text)]">
              입력하신 이메일로 비밀번호 리셋 링크가 발송되었습니다.
            </p>
            <p className="text-sm text-[var(--text-sub)]">
              이메일을 확인하고 링크를 클릭하여 비밀번호를 재설정해주세요.
            </p>
            <div className="pt-4">
              <Link
                href="/auth/login"
                className="inline-block px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-bold hover:opacity-90 transition-all"
              >
                로그인 페이지로 돌아가기
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-bold text-[var(--text)] mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력하세요"
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
                disabled={!email.trim() || isLoading}
                className="w-full px-5 py-3.5 bg-[var(--accent)] text-white rounded-xl font-bold hover:opacity-90 transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '발송 중...' : '리셋 링크 발송'}
              </button>
            </form>

            {/* Links */}
            <div className="text-center mt-6 space-y-2">
              <p className="text-[var(--text-sub)] text-sm">
                <Link
                  href="/auth/login"
                  className="text-[var(--accent)] font-bold hover:opacity-80 transition-opacity"
                >
                  로그인
                </Link>
              </p>
              <p className="text-[var(--text-sub)] text-sm">
                계정이 없으신가요?{' '}
                <Link
                  href="/auth/signup"
                  className="text-[var(--accent)] font-bold hover:opacity-80 transition-opacity"
                >
                  회원가입
                </Link>
              </p>
            </div>
          </>
        )}
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
