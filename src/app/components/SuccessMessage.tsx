"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessMessage() {
  const searchParams = useSearchParams();
  const created = searchParams.get("created");

  if (created !== "true") return null;

  return (
    <p className="bg-green-100 text-green-800 px-4 py-2 mb-4 rounded border border-green-300">
      ✅ Product created successfully!
    </p>
  );
}
