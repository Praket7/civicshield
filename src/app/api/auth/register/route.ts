import { NextRequest, NextResponse } from 'next/server';
import { registerUser, createToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, cityId } = await request.json();
    if (!email || !password) return NextResponse.json({ error: 'Email and password required.' }, { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    const result = await registerUser(email, password, name || '', cityId);
    if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
    const token = await createToken(result.user!);
    const response = NextResponse.json({ user: result.user });
    response.cookies.set('cs-session', token, { httpOnly: true, secure: false, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60, path: '/' });
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
}
