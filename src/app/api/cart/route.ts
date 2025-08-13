// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/* GET → cart items with product */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json([], { status: 401 });

  const items = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: { product: true },
    orderBy: { product: { createdAt: "desc" } },
  });
  return NextResponse.json(items);
}

/* POST → add / increment */
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { productId, qty = 1 } = await req.json();
  await prisma.cartItem.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    update: { qty: { increment: qty } },
    create: { userId: session.user.id, productId, qty },
  });
  return NextResponse.json({ ok: true });
}

/* PATCH → change qty */
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { productId, qty } = await req.json();
  if (qty <= 0) {
    await prisma.cartItem.deleteMany({
      where: { userId: session.user.id, productId },
    });
  } else {
    await prisma.cartItem.update({
      where: { userId_productId: { userId: session.user.id, productId } },
      data: { qty },
    });
  }
  return NextResponse.json({ ok: true });
}

/* DELETE → remove item */
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { productId } = await req.json();
  await prisma.cartItem.deleteMany({
    where: { userId: session.user.id, productId },
  });
  return NextResponse.json({ ok: true });
}
