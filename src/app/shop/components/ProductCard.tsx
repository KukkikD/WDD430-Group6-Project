'use client';

import { useState } from 'react';
import { Product } from '@prisma/client';
import { useCart } from '@/app/shop/hooks/useCart';
import Image from 'next/image';

function normalizeSrc(src?: string) {
  if (!src) return null;
  const s = src.trim();
  if (!s) return null;
  // If it's remote, leave it; if it's local without a leading slash, add it.
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  return s.startsWith('/') ? s : `/${s}`;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const placeholder = '/images/products/placeholder.jpeg';
  const initial = normalizeSrc(product.image) ?? placeholder;
  const [imgSrc, setImgSrc] = useState(initial);

    return (
        <div className="bg-white border border-gray-200 rounded-x1 p-4 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-full h-56 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    //src={product.image || 'https://placehold.co/400x400/EEE/333?text=No+Image'}
                    src={imgSrc}
                    alt={product.name}
                    width={800}
                    height={448}
                    className="w-full h-full object-cover"
                    sizes="(min-width:1280px) 33vw, (min-width:640px) 50vw, 100vw"
                    onError={() => {
                        // If the original fails (404/invalid), swap to the local placeholder once.
                        if (imgSrc !== placeholder) setImgSrc(placeholder);
                    }}
                />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>

        </div>

    );
};