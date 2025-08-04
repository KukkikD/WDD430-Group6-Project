import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    include: { seller: { select: { name: true, id: true } } },
  });
  return NextResponse.json({ products });
} 