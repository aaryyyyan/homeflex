import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import LogoutButton from "@/components/LogoutButton";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    page?: string;
  }>;
}) {
  const sp = await searchParams;

  const pageSize = 5;
  const page = Number(sp.page || 1);
  const skip = (page - 1) * pageSize;

  const where: any = {};

  /* ---------------- SEARCH (SQLite safe) ---------------- */
  if (sp.q) {
    where.name = {
      contains: sp.q, // ❌ no "mode" for sqlite
    };
  }

  /* ---------------- STATUS FILTER ---------------- */
  if (sp.status) {
    where.status = sp.status;
  }

  /* ---------------- DB QUERY ---------------- */
  const listings = await prisma.listing.findMany({
    where,
    skip,
    take: pageSize,
    orderBy: { id: "desc" },
  });

  const total = await prisma.listing.count({ where });
  const totalPages = Math.ceil(total / pageSize);

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Listings 🏠</h1>
        <LogoutButton />
      </div>

      {/* ---------------- SEARCH FORM ---------------- */}
      <form className="flex gap-4">
        <input
          name="q"
          placeholder="Search name..."
          defaultValue={sp.q}
          className="border p-2 rounded-lg"
        />

        <select
          name="status"
          defaultValue={sp.status}
          className="border p-2 rounded-lg"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Sold">Sold</option>
        </select>

        <button className="bg-black text-white px-4 rounded-lg">
          Search
        </button>
      </form>

      {/* ---------------- TABLE ---------------- */}
      <div className="rounded-xl shadow overflow-hidden bg-white">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {listings.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">
                  <img
                    src={item.image || "/vercel.svg"}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                </td>

                <td className="p-4">{item.name}</td>

                <td className="p-4 font-semibold">
                  ${item.price}
                </td>

                <td className="p-4 flex gap-4">

                  {/* EDIT */}
                  <Link
                    href={`/dashboard/edit/${item.id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  {/* DELETE (client component) */}
                  <DeleteButton id={item.id} />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- PAGINATION ---------------- */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`?page=${i + 1}${sp.q ? `&q=${sp.q}` : ""}${
              sp.status ? `&status=${sp.status}` : ""
            }`}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
