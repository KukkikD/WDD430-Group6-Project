'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterSellerPage() {
  const [form, setForm] = useState({ name:'', email:'', password:'', profileImage:'', bio:'' });
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch('/api/register-seller', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(form),
    });

    const text = await res.text();                // ✅ อ่านแบบกันพัง
    const data = text ? JSON.parse(text) : null;  // ✅ body อาจว่างตอน 405

    if (!res.ok) {
      setError(data?.error || `Request failed: ${res.status}`);
      return;
    }
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <form onSubmit={onSubmit} className="bg-white p-8 shadow rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Register as Seller</h2>
        <input className="w-full mb-4 p-2 border rounded" placeholder="Name"
               value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input className="w-full mb-4 p-2 border rounded" type="email" placeholder="Email"
               value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
        <input className="w-full mb-4 p-2 border rounded" type="password" placeholder="Password (min 8)"
               value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
        <input className="w-full mb-4 p-2 border rounded" placeholder="Profile image URL (optional)"
               value={form.profileImage} onChange={e=>setForm({...form, profileImage:e.target.value})} />
        <textarea className="w-full mb-4 p-2 border rounded" placeholder="Bio (optional)"
               value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white p-2 rounded font-semibold">Register</button>
      </form>
    </div>
  );
}
