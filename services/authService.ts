import { prisma } from '@/lib/db';
import { registerUser, authenticateUser } from '@/lib/auth';
import { AuthPayload, LoginPayload } from '@/lib/validators';

export async function signupService(payload: AuthPayload) {
  return registerUser(payload);
}

export async function loginService(payload: LoginPayload) {
  const user = await authenticateUser(payload);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export async function getUserById(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true }
  });
}
