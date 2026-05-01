import jwt from 'jsonwebtoken';

const secret = process.env.NEXTAUTH_SECRET;
if (!secret) {
  throw new Error('NEXTAUTH_SECRET is required for JWT generation');
}

export function signToken(payload: object) {
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret) as Record<string, any>;
  } catch {
    return null;
  }
}
