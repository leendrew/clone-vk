import { refreshDto } from '@/shared/dto';
import type { RefreshDto } from '@/shared/dto';
import { authService } from '@/server/services';

export default defineEventHandler({
  onRequest: [withValidatedBody(refreshDto)],
  async handler(event) {
    const { refreshToken } = event.context.body as RefreshDto;

    const result = await authService.refreshToken({ refreshToken });

    return result;
  },
});
