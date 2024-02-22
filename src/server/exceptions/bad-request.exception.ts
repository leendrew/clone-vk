import { baseException } from './base.exception';
import { HTTP_STATUS } from '@/shared/constants';

export const badRequestException = baseException({
  statusCode: HTTP_STATUS.badRequest,
  message: 'Неверные данные',
});
