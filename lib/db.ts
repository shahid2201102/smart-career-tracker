import { PrismaClient } from '@prisma/client';

const globalWithPrisma = global as typeof globalThis & {
  prisma?: PrismaClient;
};

export const prisma =
  globalWithPrisma.prisma ?? new PrismaClient({ log: ['query', 'warn'] });

if (process.env.NODE_ENV !== 'production') globalWithPrisma.prisma = prisma;
