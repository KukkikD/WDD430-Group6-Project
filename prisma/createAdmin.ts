import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com'; // Change as needed
  const password = 'adminpassword';  // Change as needed
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin user already exists.');
    return;
  }

  await prisma.user.create({
    data: {
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Admin user created!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 