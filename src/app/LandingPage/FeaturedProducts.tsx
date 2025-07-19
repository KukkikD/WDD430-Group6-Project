'use client';

import Image from 'next/image';

const featuredProducts = [
  { id: 1, name: 'Handmade Vase', price: '$45', rating: 4.5, image: '/images/vase.jpg' },
  { id: 2, name: 'Wool Scarf', price: '$30', rating: 4.0, image: '/images/scarf.jpg' },
  { id: 3, name: 'Wooden Bowl', price: '$25', rating: 4.2, image: '/images/bowl.jpg' },
  { id: 4, name: 'Silver Necklace', price: '$55', rating: 4.8, image: '/images/necklace.jpg' },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 px-8 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {featuredProducts.map(({ id, name, price, rating, image }) => (
          <div key={id} className="border rounded-lg p-4 shadow-sm bg-white">
            <Image
              src={image}
              alt={name}
              width={400}
              height={160}
              className="rounded-md mb-4 object-cover"
            />
            <h3 className="font-semibold">{name}</h3>
            <p className="text-yellow-600 font-bold">{price}</p>
            <p>⭐ {rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
