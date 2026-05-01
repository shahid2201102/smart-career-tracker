import bcrypt from 'bcrypt';
import { prisma } from './db';
import { AuthPayload, LoginPayload } from './validators';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function registerUser(data: AuthPayload) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new Error('Email already registered');
  }

  const password = await hashPassword(data.password);
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password,
      role: 'USER'
    }
  });
}

export async function authenticateUser(payload: LoginPayload) {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) return null;

  const isValid = await verifyPassword(payload.password, user.password);
  if (!isValid) return null;

  return user;
}
