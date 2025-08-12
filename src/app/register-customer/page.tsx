"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";

export default function RegisterCustomerPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "customer" }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Register as Customer</h2>

        {isSuccess && (
          <div className="mb-4 rounded border border-green-300 bg-green-100 text-green-800 px-4 py-3">
            <p className="font-medium">Registration successful!</p>
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
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />

            {error && <p className="text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white p-2 rounded font-semibold disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
