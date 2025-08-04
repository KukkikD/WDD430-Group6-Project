import { NextRequest, NextResponse } from 'next/server';

export function requireRole(req: NextRequest, allowedRoles: string[]) {
  // @ts-expect-error - temporarily bypass due to type inference issue
  const user = req.user;
  if (!user || !allowedRoles.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return null; // No error
} 