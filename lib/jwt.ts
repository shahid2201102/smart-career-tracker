import jwt from 'jsonwebtoken';

const secret = process.env.NEXTAUTH_SECRET;
if (!secret) {
  throw new Error('NEXTAUTH_SECRET is required for JWT generation');
}
const jwtSecret: string = secret;

type JwtPayload = Record<string, unknown>;

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, jwtSecret) as JwtPayload;
  } catch {
    return null;
  }
}
