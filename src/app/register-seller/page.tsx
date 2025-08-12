"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function RegisterSellerPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    bio: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register-seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setForm({ name: "", email: "", password: "", profileImage: "", bio: "" });
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-stone-50 p-6 rounded-lg shadow mt-32">
      <h1 className="text-2xl font-bold mb-4 text-stone-800">Create Seller Account</h1>

      {isSuccess && (
        <div className="mb-4 rounded border border-green-300 bg-green-100 text-green-800 px-4 py-3">
          <p className="font-medium">Seller account created!</p>
          <p className="text-sm mt-1">
            You can now
            {" "}
            <Link href="/login" className="underline font-semibold">
              sign in
            </Link>
            .
          </p>
        </div>
      )}

      {!isSuccess && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            required
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
          />
          <input
            name="profileImage"
            type="url"
            placeholder="Profile Image URL (optional)"
            value={form.profileImage}
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
          />
          <textarea
            name="bio"
            placeholder="Short bio (optional)"
            value={form.bio}
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
          />

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-900 hover:bg-yellow-950 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Register as Seller"}
          </button>
        </form>
      )}
    </div>
  );
}
