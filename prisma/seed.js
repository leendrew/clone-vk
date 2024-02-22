import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/ru';
import { scrypt, randomBytes } from 'node:crypto';

const prisma = new PrismaClient();

const USERS_COUNT = 10;
const PHONE_BASE = '7999999999';
const PASSWORD = 'pass';

// temporary
function hash(data) {
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
}

async function seedUsers() {
  await prisma.$executeRaw`truncate table users cascade`;
  await prisma.$executeRaw`alter sequence users_id_seq restart with 1`;

  for (let i = 0; i < USERS_COUNT; i++) {
    const hashedPassword = await hash(PASSWORD);
    const user = {
      phone: PHONE_BASE + i,
      password: hashedPassword,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
    };
    await prisma.user.create({
      data: user,
    });
  }
}

async function bootstrap() {
  await seedUsers();
}

bootstrap()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect().then(() => {
      process.exit(1);
    });
  });
