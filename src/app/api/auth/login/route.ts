import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if(!email || !password) {
      return NextResponse.json(
          { message: 'Email and password are required'},
          { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email}});

    if(!user) {
      return NextResponse.json(
          { message: 'Invalid Credentials'},
          { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(isPasswordCorrect){

      const secret = process.env.JWT_SECRET;
      if(!secret) {
        throw new Error('JWT_SECRET doesn\'t match');
      }


      // Define the payload
      const payload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      //Generate the JWT with a duration of 1 day
      const token = jwt.sign(payload, secret, { expiresIn: '1d' });
      // return the token
      return NextResponse.json({
        message: 'Authentication Successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token,
      });

    }else{
      return NextResponse.json(
          { message: 'Invalid Credentials'},
          { status: 401}
      );
    }

  } catch(error) {
    console.log('There was a problem with Login API', error);
    return NextResponse.json(
        { message: 'Server Error' },
        { status: 500}
    );
  }
}