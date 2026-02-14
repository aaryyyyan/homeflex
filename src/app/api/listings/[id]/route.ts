import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json(listing);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.listing.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
