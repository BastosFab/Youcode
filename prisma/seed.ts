import { PrismaClient } from "@prisma/client";

import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Dans la function `main`, je fais un code pour créer 10 utilisateurs qui ont chacun 1 cours et 100 relations entre les cours et les utilisateurs en tant qu'élèves.

const main = async () => {
  // const users = await prisma.user.findMany();

  // for (const user of users) {
  //   await prisma.courseOnUser.create({
  //     data: {
  //       courseId: "clye8pt7b0000c53966ln14xe",
  //       userId: user.id,
  //     },
  //   });
  // }

  const users: any[] = [];

  for (let i = 0; i < 10; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          createdCourses: {
            create: {
              name: faker.lorem.words(3),
              createdAt: faker.date.past(),
              presentation: faker.lorem.paragraph(),
              image: faker.image.url(),
              lessons: {
                createMany: {
                  data: [
                    {
                      name: faker.lorem.words(3),
                      content: faker.lorem.paragraph(),
                      rank: "aaaaaa",
                    },
                    {
                      name: faker.lorem.words(3),
                      content: faker.lorem.paragraph(),
                      rank: "aaaaab",
                    },
                  ],
                },
              },
            },
          },
        },
      })
    );
  }

  // link users to courses
  const courses = await prisma.course.findMany();

  for (const course of courses) {
    const random3Users = faker.helpers.arrayElements(users, 15);

    for (const user of random3Users) {
      await prisma.courseOnUser.create({
        data: {
          userId: user.id,
          courseId: "clye8pt7b0000c53966ln14xe",
        },
      });
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
