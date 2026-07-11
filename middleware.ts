import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname.startsWith('/auth');

  // 항상 접근 가능한 공개 페이지
  const publicPages = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/auth/reset-password'];
  const isPublicPage = publicPages.includes(pathname);

  // 비밀번호 리셋 관련 페이지는 항상 접근 허용
  const isPasswordResetPage = pathname === '/auth/forgot-password' || pathname === '/auth/reset-password';

  // 비밀번호 리셋 페이지는 항상 접근 가능
  if (isPasswordResetPage) {
    return response;
  }

  // 로그인되지 않은 사용자
  if (!user) {
    // 공개 페이지(로그인, 회원가입)는 접근 허용
    if (isPublicPage) {
      return response;
    }
    // 그 외 페이지는 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // 로그인된 사용자
  if (user) {
    // 로그인/회원가입 페이지로의 접근을 홈페이지로 리다이렉트
    if (['/auth/login', '/auth/signup'].includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
