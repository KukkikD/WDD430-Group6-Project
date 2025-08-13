import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // normalize email
    const normalizedEmail = String(email).trim().toLowerCase();

    // check duplicate
    const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (exists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        email: normalizedEmail,
        password: hashed,
        role: 'customer', // force role = customer
      },
      select: { id: true, email: true, role: true },
    });

    return NextResponse.json({ message: 'Registered', user }, { status: 201 });
  } catch (err) {
    console.error('Register customer error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
