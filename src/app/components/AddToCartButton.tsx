'use client';
import { Product } from '@prisma/client';
import { useCart } from '@/app/hooks/useCart';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem(product.id, 1)}
      className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
    >
      Add to Cart
    </button>
  );
}