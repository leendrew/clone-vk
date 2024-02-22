import jwt from 'jsonwebtoken';

type Secret = { secret: jwt.Secret };

export const jwtService = {
  signAsync(
    payload: string | Buffer | object,
    { secret, ...rest }: jwt.SignOptions & Secret,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
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
    { secret, ...rest }: jwt.VerifyOptions & Secret,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, rest, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result as T);
      });
    });
  },
};
