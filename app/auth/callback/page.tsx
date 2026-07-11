'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function CallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleCallback = async () => {
      // URL의 query string에서 type을 확인
      const searchParams = new URLSearchParams(window.location.search);
      const type = searchParams.get('type');
      const code = searchParams.get('code');

      // OAuth 로그인 처리 (카카오 로그인 등)
      if (code) {
        // Supabase가 자동으로 코드를 처리하도록 대기
        await new Promise(resolve => setTimeout(resolve, 500));

        // 세션 확인
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          // 로그인 성공 - 홈페이지로 이동
          router.push('/');
          return;
        }
      }

      if (type === 'recovery') {
        // 비밀번호 리셋 링크인 경우 reset-password 페이지로 이동
        // hash 부분의 토큰은 자동으로 포함됨
        router.push('/auth/reset-password');
      } else if (type === 'signup' || type === 'email_change') {
        // 이메일 확인 또는 이메일 변경인 경우 홈으로 이동
        router.push('/');
      } else if (!code) {
        // 기타 경우 로그인 페이지로 이동
        router.push('/auth/login');
      }
    };

    handleCallback();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[var(--text)]">인증을 처리 중입니다...</p>
      </div>
    </div>
  );
}
