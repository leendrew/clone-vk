import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';

export const hashService = {
  hash(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(16).toString('hex');

      scrypt(data, salt, 64, (err, key) => {
        if (err) {
          reject(err);
        }

        const hash = salt + ':' + key.toString('hex');

        resolve(hash);
      });
    });
  },
  compare(data: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':');
      const encryptedKey = Buffer.from(key, 'hex');

      scrypt(data, salt, 64, (err, key) => {
        if (err) {
          reject(err);
        }

        const isEqual = timingSafeEqual(encryptedKey, key);

        resolve(isEqual);
      });
    });
  },
};
