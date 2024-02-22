import { registerDto } from '@/shared/dto';
import type { RegisterDto } from '@/shared/dto';
import { hashService, authService } from '@/server/services';
import { prisma } from '@/server/prisma';

export default defineEventHandler({
  onRequest: [withValidatedBody(registerDto)],
  async handler(event) {
    const { phone, password, firstName, lastName } = event.context.body as RegisterDto;

    const hashedPassword = await hashService.hash(password);

    const user = {
      phone,
      password: hashedPassword,
      firstName,
      lastName,
    };

    const createdUser = await prisma.user.create({
      data: user,
    });

    const tokens = await authService.createTokenPairs({ id: createdUser.id });

    return {
      user: createdUser,
      tokens,
    };
  },
});
