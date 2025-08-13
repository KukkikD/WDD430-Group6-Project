import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

// Small helper to normalize and validate inputs
function normalizeEmail(raw: unknown): string {
  const email = (raw ?? "").toString().trim().toLowerCase();
  return email;
}

function isStrongEnough(password: string) {
  // 🔐 Minimum policy example: at least 8 chars, have letter and digit
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name ?? "").toString().trim();
    const email = normalizeEmail(body?.email);
    const password = (body?.password ?? "").toString();
    const bio = body?.bio ? body.bio.toString().trim() : null;
    const profileImage = body?.profileImage ? body.profileImage.toString().trim() : null;

    // Allow only these roles from public registration
    const roleRaw = (body?.role ?? "customer").toString().trim().toLowerCase();
    const role = roleRaw === "seller" ? "seller" : "customer"; // default to 'customer'

    // ✅ Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }
    if (!isStrongEnough(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters and contain letters and numbers" },
        { status: 400 }
      );
    }

    // 🔎 Check duplicate
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,                 // "customer" | "seller"
        bio,                  // optional
        profileImage,         // optional
      },
      select: { id: true, email: true, role: true },
    });

    return NextResponse.json(
      { message: "User registered", user },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
