import { loginDto } from '@/shared/dto';
import type { LoginDto } from '@/shared/dto';
import { prisma } from '@/server/prisma';
import { hashService, authService } from '@/server/services';
import { badRequestException } from '@/server/exceptions';

export default defineEventHandler({
  onRequest: [withValidatedBody(loginDto)],
  async handler(event) {
    const { phone, password } = event.context.body as LoginDto;

    const user = await prisma.user.findFirst({ where: { phone } });
    if (!user) {
      throw badRequestException();
    }

    const isPasswordsEqual = await hashService.compare(password, user.password);
    if (!isPasswordsEqual) {
      throw badRequestException();
    }

    const tokens = await authService.createTokenPairs({ id: user.id });

    return { user, tokens };
  },
});
