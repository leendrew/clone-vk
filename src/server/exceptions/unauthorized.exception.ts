import { baseException } from './base.exception';
import { HTTP_STATUS } from '@/shared/constants';

export const unauthorizedException = baseException({
  statusCode: HTTP_STATUS.unauthorized,
  message: 'Требуется авторизация',
});
