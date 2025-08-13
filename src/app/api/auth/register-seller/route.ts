import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

function normalizeEmail(raw: unknown): string {
  return (raw ?? "").toString().trim().toLowerCase();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name ?? "").toString().trim();
    const email = normalizeEmail(body?.email);
    const password = (body?.password ?? "").toString();
    const bio = body?.bio ? body.bio.toString().trim() : null;
    const profileImage = body?.profileImage ? body.profileImage.toString().trim() : null;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "seller",       // 🔒 Force seller here
        bio,
        profileImage,
      },
      select: { id: true, email: true, role: true },
    });

    return NextResponse.json(
      { message: "Seller account created successfully", user },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register-seller error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
