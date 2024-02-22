import * as zod from 'zod';
import { ERROR_MESSAGE } from '../shared.dto';

export const refreshDto = zod.object({
  refreshToken: zod.string({
    required_error: ERROR_MESSAGE.required,
  }),
});

export type RefreshDto = zod.infer<typeof refreshDto>;
