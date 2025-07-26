import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../auth/verifyToken';
import { requireRole } from '../../auth/requireRole';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const tokenError = await verifyToken(req);
  if (tokenError) return tokenError;

  const roleError = requireRole(req, ['seller', 'admin']);
  if (roleError) return roleError;

  const { name, description, price, image } = await req.json();
  // @ts-ignore
  const user = req.user;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      image,
      sellerId: user.userId,
    },
  });

  return NextResponse.json({ message: 'Product created', product }, { status: 201 });
} 