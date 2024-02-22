import type { Schema } from 'zod';
import { badRequestException } from '@/server/exceptions';

export function withValidatedBody<T extends Schema>(schema: T) {
  return defineRequestMiddleware(async (event) => {
    const result = await readValidatedBody(event, (body) => schema.safeParse(body));
    if (!result.success) {
      throw badRequestException({
        message: 'Ошибка валидации',
        data: result.error,
        // fatal: true, // to return immediately
      });
    }

    event.context.body = result.data;
  });
}
