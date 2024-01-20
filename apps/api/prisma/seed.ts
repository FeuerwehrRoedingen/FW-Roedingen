import { PrismaClient } from '@prisma/client'

import { env } from '../src/env'

const prisma = new PrismaClient()

async function main() {

  const testUser = await prisma.user.create({
    data: {
      id: env.TEST_USER_ID,
    }
  });

  const testBorrow = await prisma.borrow.upsert({
    where: { id: 1 },
    update: {},
    create: {
      borrowedAt: new Date(),
      returnedAt: null,
      user: {
        connect: testUser
      }
    },
  });

  const bench = await prisma.items.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Bierzeltbänke',
      description: 'Bierzeltbänke für 5 Personen',
      quantity: 20,
      image: 'https://www.bargusto.de/wp-content/uploads/2019/12/Gastamio-Bierzeltbank-e1597222062229.jpg'
    },
  });

  const table = await prisma.items.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Bierzelttische',
      description: 'Biertische für 10 Personen',
      quantity: 10,
      image: 'https://www.dammers.com/media/98/cf/56/1658880203/IMG415772_47308.jpg'
    },
  });

  const borrowBench = await prisma.itemBorrow.upsert({
    where: { id: 1 },
    update: {},
    create: {
      amount: 10,
      item: {
        connect: bench
      },
      borrow: {
        connect: testBorrow
      },
    },
  });

  const borrowTable = await prisma.itemBorrow.upsert({
    where: { id: 2 },
    update: {},
    create: {
      amount: 5,
      item: {
        connect: table
      },
      borrow: {
        connect: testBorrow
      },
    },
  });
}

main()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
