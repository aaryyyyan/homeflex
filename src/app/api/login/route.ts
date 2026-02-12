import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  // change password here
  if (password === "admin123") {
    const res = NextResponse.json({ success: true });

    res.cookies.set("auth", "true", {
      httpOnly: true,
      path: "/",
    });

    return res;
  }

  return NextResponse.json(
    { success: false },
    { status: 401 }
  );
}
