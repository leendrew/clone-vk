import { jwtService } from '@/server/services';
import { prisma } from '@/server/prisma';
import { unauthorizedException } from '@/server/exceptions';

export function withAuth() {
  return defineRequestMiddleware(async (event) => {
    const { jwtSecret } = useRuntimeConfig();

    const authHeader = getHeader(event, 'Authorization');
    if (!authHeader) {
      throw unauthorizedException();
    }

    const [, token] = authHeader.split(' ');

    const { sub: id } = await jwtService.verifyAsync<{ sub: number }>(token as string, {
      secret: jwtSecret,
    });

    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) {
      throw unauthorizedException();
    }

    event.context.user = user;
  });
}
