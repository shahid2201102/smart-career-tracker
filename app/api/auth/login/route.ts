import { NextResponse } from 'next/server';
import { loginService } from '@/services/authService';
import { loginSchema } from '@/lib/validators';
import { signToken } from '@/lib/jwt';
import { createAuthCookie } from '@/lib/session';
import { getErrorMessage } from '@/lib/error';

export async function POST(request: Request) {
  const body = await request.json();
  const result = loginSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: getErrorMessage(result.error.flatten(), 'Invalid login request.') }, { status: 422 });
  }

  try {
    const user = await loginService(result.data);
    const token = signToken(user);
    const response = NextResponse.json({ user });
    response.headers.set('Set-Cookie', createAuthCookie(token));
    return response;
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
