'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterCustomerPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) router.push('/login');
    else setError(data.error || 'Registration failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <form onSubmit={onSubmit} className="bg-white p-8 shadow rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Register as Customer</h2>
        <input className="w-full mb-4 p-2 border rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input className="w-full mb-4 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="w-full mb-4 p-2 border rounded" type="password" placeholder="Password (min 8)" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white p-2 rounded font-semibold">Register</button>
      </form>
    </div>
  );
}
