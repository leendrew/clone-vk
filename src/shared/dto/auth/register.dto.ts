import * as zod from 'zod';
import { SCHEMA, ERROR_MESSAGE } from '../shared.dto';

export const registerDto = zod
  .object({
    phone: SCHEMA.phone,
    password: SCHEMA.password,
    confirmPassword: zod.string({
      required_error: ERROR_MESSAGE.required,
    }),
    firstName: SCHEMA.name,
    lastName: SCHEMA.name,
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegisterDto = zod.infer<typeof registerDto>;
