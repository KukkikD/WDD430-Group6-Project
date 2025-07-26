import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'seller@example.com'; // Change as needed
  const password = 'sellerpassword';  // Change as needed
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Seller user already exists.');
    return;
  }

  await prisma.user.create({
    data: {
      name: 'Seller',
      email,
      password: hashedPassword,
      role: 'seller',
    },
  });

  console.log('Seller user created!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 