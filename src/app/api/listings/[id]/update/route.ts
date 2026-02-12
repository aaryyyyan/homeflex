import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  await prisma.listing.update({
    where: { id: Number(id) },
    data: {
      name: body.name,
      price: Number(body.price),
    },
  });

  return Response.json({ ok: true });
}
