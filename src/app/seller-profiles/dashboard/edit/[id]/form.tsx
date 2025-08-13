'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
};

export default function Form({ product }: { product: Product }) {
  const router = useRouter();

  // ✅ useState ready to use
  const [name, setName] = useState(product.name || '');
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price.toString() || '');
  const [image, setImage] = useState(product.image || '');
  const [category, setCategory] = useState(product.category || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        image,
        category,
      }),
    });

    router.push('/seller-profiles/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="image">Image URL</label>
        <input
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 w-full"
          required
        >
          <option value="">Select category</option>
          <option value="Knitting">Knitting</option>
          <option value="Ceramics">Ceramics</option>
          <option value="Woodwork">Woodwork</option>
          <option value="Jewelry">Jewelry</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded">
        Update Product
      </button>
    </form>
  );
}
