import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    //log: []: Se você quiser desabilitar todos os logs do Prisma (incluindo error, warn, info, query), você pode definir log como um array vazio [].

    // log: ['error', 'warn']: Se você quiser apenas desabilitar os logs de query mas manter os outros logs importantes (como error e warn), você pode especificar quais tipos de logs você deseja ver.
    log: ['error', 'warn'], // Exemplo: apenas logar erros e avisos
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
