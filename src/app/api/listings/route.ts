import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  const body = await req.json();

  const listing = await prisma.listing.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(listing);
}
