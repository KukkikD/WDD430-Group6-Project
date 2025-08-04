import { NextResponse } from 'next/server';
// 🔒 Uncomment these lines once authentication is enabled
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/app/lib/prisma';

// 🛒 POST: Create a new product
export async function POST(req: Request) {
  const data = await req.json();

  // 🔐 Authentication check (ENABLE THIS WHEN Auth is ready)
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  // }
  // const sellerId = session.user.id;

  // ⚠️ TEMP: Hardcoded seller ID for development only
  const sellerId = 'cmda12lsr0000j8lwnoit0acv'; // TODO: Replace with session.user.id when Auth is ready

  try {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        sellerId: sellerId, // ✅ Currently hardcoded; will be dynamic once Auth is active
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error('❌ Error creating product:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create product' },
      { status: 500 }
    );
  }
}
