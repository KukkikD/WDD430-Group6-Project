import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

// ✅ PUT: Update product by ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  // ✅ According to Next.js App Router best practices,
  // we should destructure `params` from context separately (not directly in the arguments)
  const { params } = context;
  const { id } = params;

  const data = await req.json();

  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedProduct); // ✅ Return updated product
  } catch (error) {
    console.error('❌ Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove product by ID
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  // ✅ Destructure `params` separately to avoid runtime warnings
  const { params } = context;
  const { id } = params;

  try {
    const deleted = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(deleted); // ✅ Return deleted product
  } catch (error) {
    console.error("❌ Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
