"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditListing() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    status: "Active",
    image: "",
  });

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/listings");
      const data = await res.json();

      const item = data.data.find((l: any) => l.id == id);

      if (item) setForm(item);
    }

    load();
  }, [id]);

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

  /* ---------------- UPDATE ---------------- */
  async function handleSubmit(e: any) {
    e.preventDefault();

    await fetch(`/api/listings/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });

    router.push("/dashboard/listings");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h1 className="text-2xl font-bold">Edit Listing</h1>

      <input
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="border p-2"
      />

      <input
        type="number"
        value={form.price}
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
        Save Changes
      </button>
    </form>
  );
}
