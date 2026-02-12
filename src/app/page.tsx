"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [name, setName] = useState("");

  async function fetchListings() {
    const res = await fetch("/api/listings");
    const data = await res.json();
    setListings(data.data);
  }

  async function addListing() {
    await fetch("/api/listings", {
      method: "POST",
      body: JSON.stringify({
        name,
        price: 1000,
      }),
    });

    setName("");
    fetchListings();
  }

  async function deleteListing(id: number) {
    await fetch(`/api/listings?id=${id}`, {
      method: "DELETE",
    });

    fetchListings();
  }

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Listings</h1>

      <input
        placeholder="listing name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addListing}>Add</button>

      <ul>
        {listings.map((l: any) => (
          <li key={l.id}>
            {l.name} - ₹{l.price}
            <button onClick={() => deleteListing(l.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
