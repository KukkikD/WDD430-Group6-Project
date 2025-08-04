'use client';

import { useState } from "react";
import Link from "next/link";
import SuccessMessage from "@/components/SuccessMessage"; // ✅ Client component to show success toast/message
import DeleteProductButton from "@/components/DeleteProductButton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string | null;
}

interface Props {
  products: Product[];
  sellerName: string;
}

export default function SellerDashboardClient({ products, sellerName }: Props) {
  const [productList, setProductList] = useState(products); // ✅ State to track current product list

  // ✅ Handle product deletion
  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // ✅ Remove product from local state to update UI immediately
        setProductList(productList.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting.");
    }
  };

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome, {sellerName}</h1>

      {/* ✅ Show success message when redirected with ?created=true */}
      <SuccessMessage />

      {/* ➕ Button to add a new product */}
      <Link
        href="/seller/dashboard/creates"
        className="bg-green-800 text-white px-4 py-2 rounded mb-6 inline-block"
      >
        + Add New Product
      </Link>

      {/* 📦 Product list table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b font-semibold">
            <th className="py-2">Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{p.name}</td>
              <td>{p.description}</td>
              <td>${p.price.toFixed(2)}</td>
              <td>{p.category || "Uncategorized"}</td>
              <td className="text-right space-x-4">
                {/* 🔧 Edit product link */}
                <Link href={`/seller/dashboard/edit/${p.id}`} className="text-blue-600 underline">
                  Edit
                </Link>
                {/* ❌ Delete product button component */}
                <DeleteProductButton productId={p.id} onDelete={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
