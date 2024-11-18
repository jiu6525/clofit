// middleware.ts 예제
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // 요청에 따른 조건부 로직 처리
  if (
    request.nextUrl.pathname.endsWith('home') || 
    request.nextUrl.pathname.endsWith('closet') || 
    request.nextUrl.pathname.endsWith('fitting') || 
    request.nextUrl.pathname.endsWith('my') || 
    request.nextUrl.pathname.endsWith('feed')
) {
    if (!request.cookies.get('Authorization')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return response;
}
