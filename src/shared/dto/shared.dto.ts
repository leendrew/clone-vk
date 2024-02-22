import * as zod from 'zod';

export const ERROR_MESSAGE = {
  required: 'Это поле обязательно для заполнения',
  incorrect: 'Это поле заполнено некорректно',
};

export const LENGTH_RESTRICTIONS = {
  min: {
    name: 3,
    password: 4,
  },
  max: {},
};

export const SCHEMA = {
  phone: zod
    .string({ required_error: ERROR_MESSAGE.required })
    .refine(
      (value) => /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/.test(value),
      ERROR_MESSAGE.incorrect,
    ),
  password: zod
    .string({
      required_error: ERROR_MESSAGE.required,
    })
    .min(LENGTH_RESTRICTIONS.min.password, 'Пароль слишком короткий'),
  name: zod
    .string({
      required_error: ERROR_MESSAGE.required,
    })
    .min(LENGTH_RESTRICTIONS.min.password),
};
