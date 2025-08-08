import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // Return error if user not found or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid Credentials' }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET!;

    // Generate JWT token with user info
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      secret,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Set the token in an httpOnly cookie to prevent access from JavaScript (XSS protection)
    const response = NextResponse.json({
      message: 'Authentication Successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true, // Cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
      sameSite: 'strict', // Protect against CSRF
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day in seconds
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
