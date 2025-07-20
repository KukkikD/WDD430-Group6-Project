'use client';

import Image from 'next/image';

const featuredProducts = [
  { id: 1, name: 'Handmade Vase', price: '$45', rating: 4.5, image: '/images/vase.jpg' },
  { id: 2, name: 'Wool Scarf', price: '$30', rating: 4.0, image: '/images/scarf.jpg' },
  { id: 3, name: 'Wooden Bowl', price: '$25', rating: 4.2, image: '/images/bowl.jpg' },
  { id: 4, name: 'Silver Necklace', price: '$55', rating: 4.8, image: '/images/necklace.jpg' },
 // { id: 5, name: 'Sweaters', price: '$14.95', rating: 4.1, image: '/placeholder.png' },
 // { id: 6, name: 'Earrings', price: '$10.95', rating: 4.3, image: '/placeholder.png' },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12 px-8 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts.map(({ id, name, price, rating, image }) => (
          <div key={id || name} className="bg-white border rounded-lg p-4 shadow-md">
            <Image
              src={image}
              alt={name}
              width={400}
              height={160}
              className="rounded-md mb-4 object-cover w-full h-40"
            />
            <h3 className="font-semibold">{name}</h3>
            <p className="text-yellow-600 font-bold">{price}</p>
            <p className="text-sm">⭐ {rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
