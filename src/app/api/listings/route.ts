import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* ---------------- GET ---------------- */
/* search + filter + pagination */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 5);

  const skip = (page - 1) * limit;

  const where: any = {};

  if (search) {
    // SQLite already case insensitive
    where.name = {
      contains: search,
    };
  }

  if (status) {
    where.status = status;
  }

  const listings = await prisma.listing.findMany({
    where,
    skip,
    take: limit,
    orderBy: { id: "desc" },
  });

  const total = await prisma.listing.count({ where });

  return NextResponse.json({
    data: listings,
    page,
    totalPages: Math.ceil(total / limit),
    total,
  });
}

/* ---------------- POST ---------------- */
/* create listing */

export async function POST(req: Request) {
  const body = await req.json();

  const listing = await prisma.listing.create({
    data: {
      name: body.name,
      price: Number(body.price),
      status: body.status || "Active",
      image: body.image || null, // ✅ THIS WAS MISSING
    },
  });

  return NextResponse.json(listing);
}


/* ---------------- DELETE ---------------- */

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = Number(searchParams.get("id"));

  await prisma.listing.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Deleted" });
}
