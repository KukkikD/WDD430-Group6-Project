import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export function GET() {
  return NextResponse.json({ ok: true, route: '/api/register-seller' }, { status: 200 });
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const [{ default: prisma }, bcrypt] = await Promise.all([
      import('@/app/lib/prisma'),
      import('bcrypt'),
    ]);

    const { name, email, password, profileImage, bio } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (exists) return NextResponse.json({ error: 'User already exists' }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: String(name).trim(),
        email: normalizedEmail,
        password: hashed,
        role: 'seller',
        profileImage: profileImage || null,
        bio: bio || null,
      },
      select: { id: true, email: true, role: true },
    });

    return NextResponse.json({ message: 'Seller registered', user }, { status: 201 });
  } catch (err) {
    console.error('Register seller error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
