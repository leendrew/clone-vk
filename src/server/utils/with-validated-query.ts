import type { Schema } from 'zod';
import { badRequestException } from '@/server/exceptions';

export function withValidatedQuery<T extends Schema>(schema: T) {
  return defineRequestMiddleware(async (event) => {
    const result = await getValidatedQuery(event, (query) => schema.safeParse(query));
    if (!result.success) {
      throw badRequestException({
        message: 'Ошибка валидации',
        data: result.error,
      });
    }

    event.context.query = result.data;
  });
}
