import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach user info to request (for use in route handlers)
    // @ts-ignore
    req.user = decoded;
    return null; // No error
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
} 