'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterSellerPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: '',
    bio: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register-seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-stone-50 p-6 rounded-lg shadow mt-32">
        <h1 className="text-2xl font-bold mb-4 text-stone-800">Create Seller Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            name="name"
            type="text"
            required
            placeholder="Full name"
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
            />
            <input
            name="email"
            type="email"
            required
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
            />
            <input
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
            />
            <input
            name="profileImage"
            type="url"
            placeholder="Profile Image URL (optional)"
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
            />
            <textarea
            name="bio"
            placeholder="Short bio (optional)"
            onChange={handleChange}
            className="w-full p-2 border border-stone-300 rounded bg-stone-100 placeholder-stone-500"
            />

            {error && <p className="text-red-600">{error}</p>}

            <button
            type="submit"
            className="w-full bg-yellow-900 hover:bg-yellow-950 text-white py-2 rounded-lg font-semibold transition"
            disabled={isLoading}
            >
            {isLoading ? 'Creating...' : 'Register as Seller'}
            </button>
        </form>
    </div>

  );
}
