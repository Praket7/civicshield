import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required.' }, { status: 400 });
    const result = await loginUser(email, password);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 401 });
    const response = NextResponse.json({ user: result.user });
    response.cookies.set('cs-session', result.token!, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60, path: '/' });
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 });
  }
}
