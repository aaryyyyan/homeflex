import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 p-6 space-y-6
                        bg-black text-white
                        dark:bg-gray-800">
        <h2 className="text-xl font-bold">⚡ HomeFlex</h2>

        <nav className="flex flex-col gap-3">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/dashboard/listings">Listings</Link>
          <Link href="/dashboard/create">Create</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
