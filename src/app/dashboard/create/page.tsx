"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateListing() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    status: "Active",
    image: "",
  });

  /* ---------------- IMAGE UPLOAD ---------------- */
  async function handleImage(e: any) {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setForm((prev) => ({
      ...prev,
      image: data.url,
    }));
  }

  /* ---------------- SUBMIT ---------------- */
  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch("/api/listings", {
      method: "POST",
      body: JSON.stringify(form),
    });

    router.push("/dashboard/listings");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h1 className="text-2xl font-bold">Create Listing</h1>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="border p-2"
      />

      <input
        type="number"
        placeholder="Price"
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
        className="border p-2"
      />

      {/* 🔥 IMAGE INPUT */}
      <input type="file" onChange={handleImage} />

      {/* preview */}
      {form.image && (
        <img src={form.image} className="w-24 rounded" />
      )}

      <button className="bg-black text-white p-2 rounded">
        Create
      </button>
    </form>
  );
}
