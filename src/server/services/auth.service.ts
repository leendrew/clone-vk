import type { User } from '@prisma/client';
import { jwtService } from '@/server/services/jwt.service';
import { prisma } from '@/server/prisma';
import { HTTP_STATUS } from '@/shared/constants';

type CreateTokenPayload<T extends object> = {
  id: number;
  ttl: number;
  payload?: T;
};
type CreateTokenResponse = string;

type CreateTokenPairsPayload = {
  id: number;
};
type CreateTokenPairsResponse = {
  access: string;
  refresh: string;
};

type RefreshTokenPayload = {
  refreshToken: string;
};
type RefreshTokenResponse = {
  user: User;
  tokens: CreateTokenPairsResponse;
};

export const authService = {
  createToken<T extends object>({
    id,
    ttl,
    payload,
  }: CreateTokenPayload<T>): Promise<CreateTokenResponse> {
    const { jwtSecret } = useRuntimeConfig();
    try {
      const token = jwtService.signAsync(
        {
          sub: id,
          ...payload,
        },
        {
          secret: jwtSecret,
          expiresIn: ttl,
        },
      );

      return token;
    } catch (e) {
      throw e;
    }
  },
  async createTokenPairs({ id }: CreateTokenPairsPayload): Promise<CreateTokenPairsResponse> {
    const { jwtAccessTtl, jwtRefreshTtl } = useRuntimeConfig();

    const [access, refresh] = await Promise.all([
      this.createToken({ id, ttl: jwtAccessTtl, payload: { id } }),
      this.createToken({ id, ttl: jwtRefreshTtl }),
    ]);

    return { access, refresh };
  },
  async refreshToken({ refreshToken }: RefreshTokenPayload): Promise<RefreshTokenResponse> {
    const { jwtSecret } = useRuntimeConfig();
    try {
      const { sub: id } = await jwtService.verifyAsync<{ sub: number }>(refreshToken, {
        secret: jwtSecret,
      });

      const user = await prisma.user.findFirst({ where: { id } });
      if (!user) {
        throw createError({ statusCode: HTTP_STATUS.notFound, message: 'Неверные данные' });
      }

      const tokens = await this.createTokenPairs({ id });

      return { user, tokens };
    } catch (e) {
      throw createError({ statusCode: 401 });
    }
  },
};
