import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../auth/verifyToken';
import { requireRole } from '../../auth/requireRole';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const tokenError = await verifyToken(req);
  if (tokenError) return tokenError;

  const roleError = requireRole(req, ['admin']);
  if (roleError) return roleError;

  const { sellerId } = await req.json();

  // Delete seller and their products
  await prisma.product.deleteMany({ where: { sellerId } });
  await prisma.user.delete({ where: { id: sellerId, role: 'seller' } });

  return NextResponse.json({ message: 'Seller deleted' });
} 