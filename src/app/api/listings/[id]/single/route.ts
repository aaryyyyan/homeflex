import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const item = await prisma.listing.findUnique({
    where: { id: Number(id) },
  });

  return Response.json(item);
}
