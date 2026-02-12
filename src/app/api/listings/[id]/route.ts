import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* ================= UPDATE LISTING ================= */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const listing = await prisma.listing.update({
    where: {
      id: Number(id),
    },
    data: {
      name: body.name,
      price: Number(body.price),
      status: body.status,
      image: body.image || null, // ✅ IMPORTANT
    },
  });

  return NextResponse.json(listing);
}

/* ================= DELETE LISTING ================= */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.listing.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({ success: true });
}
