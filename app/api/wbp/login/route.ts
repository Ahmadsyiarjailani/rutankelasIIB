import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (username === "admin" && password === "123") {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', 'authenticated_token_123', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    return response;
  }
  return NextResponse.json({ success: false }, { status: 401 });
}