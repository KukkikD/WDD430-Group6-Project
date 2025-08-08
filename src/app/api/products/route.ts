import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import prisma from '@/app/lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();

  // ✅ Get user session (authentication)
  const session = await getServerSession(authOptions);

  // ❌ If not logged in, block the request
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // ✅ Real sellerId from logged-in user
  const sellerId = session.user.id;

  try {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category,
        sellerId, // ✅ Now uses actual logged-in seller
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
