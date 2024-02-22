import * as zod from 'zod';
import { SCHEMA } from '../shared.dto';

export const loginDto = zod.object({
  phone: SCHEMA.phone,
  password: SCHEMA.password,
});

export type LoginDto = zod.infer<typeof loginDto>;
