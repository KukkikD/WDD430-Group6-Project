'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Ceramics');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        image,
        category
        //sellerId: 'seller-id-demo', // ⚠️ Replace with actual sellerId when Auth is ready
      }),
    });

    router.push('/seller/dashboard');
  };

  return (
    <main className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        />

        <label htmlFor="category" className="block font-medium">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        >
          <option value="Ceramics">Ceramics</option>
          <option value="Knitting">Knitting</option>
          <option value="Woodwork">Woodwork</option>
          <option value="Jewelry">Jewelry</option>
        </select>

        <button type="submit" className="bg-green-800 text-white px-4 py-2 rounded">
          Create Product
        </button>
      </form>
    </main>
  );
}
