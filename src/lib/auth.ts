import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'civicshield-fallback-secret');
const COOKIE_NAME = 'cs-session';

export interface UserSession {
  id: number;
  email: string;
  name: string | null;
  cityId: string | null;
  role: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(user: UserSession): Promise<string> {
  return new SignJWT({ id: user.id, email: user.email, name: user.name, cityId: user.cityId, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as UserSession;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function registerUser(email: string, password: string, name: string, cityId: string = 'buffalo-ny'): Promise<{ user?: UserSession; error?: string }> {
  try {
    const existing = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
    if (existing.length > 0) return { error: 'An account with this email already exists.' };
    const hash = await hashPassword(password);
    const [newUser] = await db.insert(users).values({
      email: email.toLowerCase(), passwordHash: hash, name, cityId,
    }).returning();
    return { user: { id: newUser.id, email: newUser.email, name: newUser.name, cityId: newUser.cityId, role: newUser.role } };
  } catch (err) {
    console.error('Register error:', err);
    return { error: 'Registration failed. Please try again.' };
  }
}

export async function loginUser(email: string, password: string): Promise<{ user?: UserSession; token?: string; error?: string }> {
  try {
    const found = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
    if (found.length === 0) return { error: 'Invalid email or password.' };
    const user = found[0];
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return { error: 'Invalid email or password.' };
    const session: UserSession = { id: user.id, email: user.email, name: user.name, cityId: user.cityId, role: user.role };
    const token = await createToken(session);
    return { user: session, token };
  } catch (err) {
    console.error('Login error:', err);
    return { error: 'Login failed. Please try again.' };
  }
}
