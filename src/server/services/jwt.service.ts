import jwt from 'jsonwebtoken';

export const jwtService = {
  signAsync(
    payload: string | Buffer | object,
    options: jwt.SignOptions & { secret: jwt.Secret },
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const { secret, ...rest } = options;

      jwt.sign(payload, secret, rest, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result as string);
      });
    });
  },
  verifyAsync<T extends object>(
    token: string,
    options: jwt.VerifyOptions & { secret: jwt.Secret },
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const { secret, ...rest } = options;

      jwt.verify(token, secret, rest, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result as T);
      });
    });
  },
};
