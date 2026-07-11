'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from '@/components/Toast';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const isFormValid = email.trim() && password;

  const getErrorMessage = (errorCode: string): string => {
    const messages: { [key: string]: string } = {
      'invalid_credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
      'email_not_confirmed': '이메일 인증을 완료해주세요.',
      'user_not_found': '등록되지 않은 이메일입니다.',
      'invalid_grant': '이메일 또는 비밀번호가 올바르지 않습니다.',
    };
    return messages[errorCode] || '로그인에 실패했습니다. 다시 시도해주세요.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        const errorMessage = getErrorMessage(error.code || '');
        setToast({ message: errorMessage, type: 'error' });
        setIsLoading(false);
        return;
      }

      if (data.user) {
        setToast({ message: '로그인 성공했습니다!', type: 'success' });
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch (error) {
      setToast({ message: '로그인 중 오류가 발생했습니다.', type: 'error' });
      setIsLoading(false);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setToast({ message: '카카오 로그인 중 오류가 발생했습니다.', type: 'error' });
      }
    } catch (error) {
      setToast({ message: '카카오 로그인 중 오류가 발생했습니다.', type: 'error' });
    }
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

          {/* Password Input */}
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
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

          {/* Login Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full px-5 py-3.5 bg-[var(--accent)] text-white rounded-xl font-bold hover:opacity-90 transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        {/* Kakao Login Button */}
        <button
          onClick={handleKakaoLogin}
          disabled={isLoading}
          className="w-full px-5 py-3.5 bg-[#FEE500] text-[#191919] rounded-xl font-bold hover:bg-[#FDD835] transition-all mt-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {/* Kakao Talk Logo SVG */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 48 48"
            fill="currentColor"
            className="text-[#191919]"
          >
            <path d="M24 2C12.96 2 4 9.16 4 18c0 5.48 3.08 10.28 8 12.84V44l8.16-4.64C21.8 40.08 22.88 40.12 24 40.12c11.04 0 20-7.16 20-16s-8.96-16-20-16z" />
          </svg>
          <span>카카오로 로그인</span>
        </button>

        {/* Forgot Password Link */}
        <div className="text-center mt-4">
          <p className="text-[var(--text-sub)] text-sm">
            <Link
              href="/auth/forgot-password"
              className="text-[var(--accent)] font-bold hover:opacity-80 transition-opacity"
            >
              비밀번호 찾기
            </Link>
          </p>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
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
