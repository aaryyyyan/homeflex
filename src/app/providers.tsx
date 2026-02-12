"use client";

import { useEffect, useState } from "react";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      {/* Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-lg dark:bg-white dark:text-black"
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

      {children}
    </div>
  );
}
