import { PrismaClient } from '@prisma/client';

const config = useRuntimeConfig();

let prismaClient: PrismaClient | undefined;

export const prisma = prismaClient ?? new PrismaClient();

if (config.public.isDev) {
  prismaClient = prisma;
}
