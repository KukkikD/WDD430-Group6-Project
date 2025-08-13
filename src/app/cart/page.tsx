// app/cart/page.tsx
'use client';
import Image from 'next/image';
import { useCart } from '@/app/hooks/useCart';

export default function CartPage() {
  const { items, updateQty, removeItem } = useCart();

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (!items.length) return <p className="text-center py-10">Your cart is empty.</p>;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="space-y-6">
        {items.map(({ id, product, qty }) => (
          <div key={id} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow">
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              className="object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-500">${product.price.toFixed(2)} each</p>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => updateQty(product.id, qty - 1)} className="px-2 py-1 border rounded">-</button>
              <span>{qty}</span>
              <button onClick={() => updateQty(product.id, qty + 1)} className="px-2 py-1 border rounded">+</button>
            </div>

            <p className="font-semibold w-20 text-right">${(product.price * qty).toFixed(2)}</p>

            <button onClick={() => removeItem(product.id)} className="text-red-600 text-sm">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gray-100 p-6 rounded-xl">
        <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between mt-2"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold text-xl mt-2"><span>Total</span><span>${total.toFixed(2)}</span></div>
        <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">Checkout</button>
      </div>
    </main>
  );
}