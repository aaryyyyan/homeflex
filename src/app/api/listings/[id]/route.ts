import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const listing = await prisma.listing.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(listing);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await prisma.listing.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
