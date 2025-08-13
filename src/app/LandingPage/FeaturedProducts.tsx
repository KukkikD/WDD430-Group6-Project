'use client';

import Image from 'next/image';

const featuredProducts = [
  { id: 1, name: 'Handmade Vase', price: '$45', rating: 4.5, image: '/images/products/vase.png' },
  { id: 2, name: 'Wool Scarf', price: '$30', rating: 4.0, image: '/images/products/scarf.webp' },
  { id: 3, name: 'Wooden Bowl', price: '$25', rating: 4.2, image: '/images/products/bowl.webp' },
  { id: 4, name: 'Silver Necklace', price: '$55', rating: 4.8, image: '/images/products/silver-necklace.jpeg' },
 // { id: 5, name: 'Sweaters', price: '$14.95', rating: 4.1, image: '/placeholder.png' },
 // { id: 6, name: 'Earrings', price: '$10.95', rating: 4.3, image: '/placeholder.png' },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-gray-50 p-3">
      <h2 className="text-2xl font-semibold text-left mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts.map(({ id, name, price, rating, image }) => (
          <div key={id || name} className="bg-white border rounded-lg p-4 shadow-md">
            <Image
              src={image || "/images/products/placeholder.jpeg"}
              alt={name}
              width={400}
              height={160}
              className="rounded-md mb-4 object-contain w-full h-40 bg-white"
            />
            <h3 className="font-semibold">{name}</h3>
            <p className="text-amber-800 font-bold">{price}</p>
            <p className="text-sm">⭐ {rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
