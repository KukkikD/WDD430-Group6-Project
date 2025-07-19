import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const seller = await prisma.user.create({
    data: {
      name: 'Crafty Seller',
      email: 'seller@example.com',
      password: 'hashedpassword', // will do real hash later
      role: 'seller',
      bio: 'I create beautiful handmade crafts.',
      profileImage: '/profile.png',
    },
  });

  await prisma.product.create({
    data: {
      name: 'Handmade Wooden Bowl',
      description: 'Beautiful wooden bowl crafted by hand.',
      price: 29.99,
      image: '/bowl.jpg',
      sellerId: seller.id,
    },
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
