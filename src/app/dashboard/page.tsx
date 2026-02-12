import { prisma } from "@/lib/prisma";
import Charts from "@/components/Charts";

export default async function DashboardPage() {
  const listings = await prisma.listing.findMany();

  const totalListings = listings.length;
  const totalRevenue = listings.reduce(
    (sum, item) => sum + item.price,
    0
  );

  // fake monthly chart data from real numbers
  const chartData = [
    { name: "Jan", value: totalRevenue * 0.3 },
    { name: "Feb", value: totalRevenue * 0.5 },
    { name: "Mar", value: totalRevenue * 0.7 },
    { name: "Apr", value: totalRevenue },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard 🚀</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Total Listings" value={totalListings} />
        <StatCard title="Total Revenue" value={`$${totalRevenue}`} />
      </div>

      {/* Chart */}
      <Charts data={chartData} />
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
