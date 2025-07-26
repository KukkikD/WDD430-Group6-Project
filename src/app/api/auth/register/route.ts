import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const ALLOWED_ROLES = ['customer', 'seller']; // Only allow these roles via public registration

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password, role } = body;

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Only allow customer or seller roles via registration
  const userRole = ALLOWED_ROLES.includes(role) ? role : 'customer';

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: userRole,
    },
  });

  return NextResponse.json({ message: 'User registered', user: { id: user.id, email: user.email, role: user.role } }, { status: 201 });
} 