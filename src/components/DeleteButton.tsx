"use client";

export default function DeleteButton({ id }: { id: number }) {
  async function handleDelete() {
    const ok = confirm("Delete this listing?");
    if (!ok) return;

    await fetch(`/api/listings/${id}`, {
      method: "DELETE",
    });

    location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 dark:text-red-400"
    >
      Delete
    </button>
  );
}
