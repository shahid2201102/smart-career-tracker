import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

const COOKIE_NAME = 'career_tracker_token';

export async function getServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload || typeof payload !== 'object') return null;

  return { id: payload.id as string, email: payload.email as string, name: payload.name as string, role: payload.role as string };
}

const secureFlag = process.env.NODE_ENV === 'production' ? 'Secure;' : '';

export function createAuthCookie(token: string) {
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}; ${secureFlag}`;
}

export function revokeAuthCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0; ${secureFlag}`;
}
