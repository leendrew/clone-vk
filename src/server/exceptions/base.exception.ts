import type { H3Error } from 'h3';

type ExceptionPayload = Partial<Omit<H3Error, 'statusCode'>>;

export function baseException({ statusCode, message }: Pick<H3Error, 'statusCode' | 'message'>) {
  return (options: ExceptionPayload = {}) => createError({ statusCode, message, ...options });
}
