import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password, profileImage, bio } = body;

  // ✅ Validate required fields
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
  }

  // 🔎 Check for existing user
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // 🔐 Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Create the user with optional fields
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: 'seller', // 🔐 force seller role
      profileImage: profileImage || null,
      bio: bio || null,
    },
  });

  return NextResponse.json({ message: 'Seller account created successfully', user: { id: user.id, email: user.email, role: user.role } }, { status: 201 });
}
