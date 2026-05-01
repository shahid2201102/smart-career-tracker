import { NextResponse } from 'next/server';
import { signupService } from '@/services/authService';
import { authSchema } from '@/lib/validators';
import { signToken } from '@/lib/jwt';
import { createAuthCookie } from '@/lib/session';
import { getErrorMessage } from '@/lib/error';

export async function POST(request: Request) {
  const body = await request.json();
  const result = authSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: getErrorMessage(result.error.flatten(), 'Invalid signup request.') }, { status: 422 });
  }

  try {
    const user = await signupService(result.data);
    const token = signToken({ id: user.id, email: user.email, name: user.name, role: user.role });
    const response = NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    response.headers.set('Set-Cookie', createAuthCookie(token));
    return response;
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
