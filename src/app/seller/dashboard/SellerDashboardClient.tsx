'use client';

import { useState } from "react";
import Link from "next/link";
import SuccessMessage from "@/components/SuccessMessage"; // ✅ Client component to show success toast/message
import DeleteProductButton from "@/components/DeleteProductButton";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: string | null;
  image?: string | null;
}

interface Props {
  products: Product[];
  sellerName: string;
  totalSales: number;       // <-- ✅ Add this
  ordersCount: number;      // <-- ✅ Add this
}

export default function SellerDashboardClient({ products, sellerName }: Props) {
  const [productList, setProductList] = useState(products); // ✅ State to track current product list
  const [sortBy, setSortBy] = useState<"name" | "price" | "category" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  //function to handle sorting
  const handleSort = (field: "name" | "price" | "category") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  //apply sorting before rendering the tables
  const sortedList = [...productList].sort((a, b) => {
    if (!sortBy) return 0;

    let aVal = a[sortBy] ?? "";
    let bVal = b[sortBy] ?? "";

    if (typeof aVal === "string" && typeof bVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

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
      <h1 className="text-3xl font-bold mb-6">Welcome, <span className="text-[#8f6b5d] font-serif italic text-4xl">{sellerName}!</span></h1>

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
        <thead className="bg-[#8f6b5d] text-white">
          <tr className="border-b font-semibold">
            <th className="py-2 px-2">Image</th>
            <th className="d-none d-md-table-cell py-2 px-4 cursor-pointer" onClick={() => handleSort("name")}><span className="flex items-center gap-1">Name {sortBy === "name" && (<span className="text-sm">{sortOrder === "asc" ? "↑" : "↓"}</span>)}</span></th>
            <th className="d-none d-md-table-cell">Description</th>
            <th className="py-2 px-6 cursor-pointer" onClick={() => handleSort("price")}><span className="flex items-center gap-1">Price {sortBy === "price" && (<span className="text-sm">{sortOrder === "asc" ? "↑" : "↓"}</span>)}</span></th>
            <th className="d-none d-md-table-cell cursor-pointer" onClick={() => handleSort("category")}><span className="flex items-center gap-1">Category {sortBy === "category" && (<span className="text-sm">{sortOrder === "asc" ? "↑" : "↓"}</span>)}</span></th>
            <th className="text-right py-2 px-1">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#b8aa8d]">
          {sortedList.map((p) => (
            <tr key={p.id} className="border-b hover:bg-[#b8aa8d]">
              <td className="py-2">
                <Image
                  src={p.image || "/images/products/placeholder.jpeg"}
                  alt={p.name}
                  width={64}
                  height={64}
                  className="rounded object-cover transistion-transform duration-300 hover:scale-125 hover:shadow-x5"
                  style={{ height: "auto" }} // ✅ Add this line to avoid warning 
                />
              </td>
              <td className="d-none d-md-table-cell py-2 px-4 font-semibold">{p.name}</td>
              <td className="d-none d-md-table-cell">{p.description}</td>
              <td className="py-2 px-6 font-semibold text-green-700">${p.price.toFixed(2)}</td>
              <td className="d-none d-md-table-cell">{p.category || "Uncategorized"}</td>
              <td className="md:text-right text-center space-x-4">
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
