import { PrismaClient } from '@prisma/client';
import faker from '@faker-js/faker';

const prisma = new PrismaClient();
const PASSWORD = '$2b$10$t9z2hwiQR/GmGQ/crs2VJ.IBo9AHDsEifT3tg5orsThSV6oYU9PZa';
const USER_COUNT = 20;

async function main() {
  for (let i = 0; i < USER_COUNT; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);

    const numOfPosts = faker.datatype.number({ min: 3, max: 20 });
    const posts: any = Array.from(Array(numOfPosts)).map(_ => ({
      title: faker.lorem.words(faker.datatype.number({ min: 5, max: 15 })),
      content: faker.lorem.paragraphs(faker.datatype.number({ min: 300, max: 900 })),
      createdAt: faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z'),
    }));

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        firstName,
        lastName,
        password: PASSWORD,
        posts: {
          create: [
            ...posts,
          ]
        },
      },
    });

    console.log('Created User', user);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
