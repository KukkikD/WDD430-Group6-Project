import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // สำคัญ: กัน edge

// ชั่วคราวเพื่อดีบัก: ถ้าอันนี้ 200 แปลว่า route ถูกแม็ปจริง
export function GET() {
  return NextResponse.json({ ok: true, route: '/api/register' }, { status: 200 });
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
    // 👉 โหลดโมดูลหนัก ๆ ตอนนี้เท่านั้น (เลี่ยงพังตอน GET)
    const [{ default: prisma }, bcrypt] = await Promise.all([
      import('@/app/lib/prisma'),
      import('bcrypt'),
    ]);

    const { name, email, password } = await req.json();
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
      data: { name: String(name).trim(), email: normalizedEmail, password: hashed, role: 'customer' },
      select: { id: true, email: true, role: true },
    });

    return NextResponse.json({ message: 'Registered', user }, { status: 201 });
  } catch (err) {
    console.error('Register customer error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
