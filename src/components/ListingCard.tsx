export default function ListingCard({ listing }: any) {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm">
      <img src={listing.image} className="h-40 w-full object-cover" />

      <div className="p-4">
        <h3 className="font-semibold">{listing.title}</h3>
        <p className="text-sm text-gray-500">{listing.location}</p>
        <p className="font-bold mt-2">${listing.price}/month</p>
      </div>
    </div>
  )
}
