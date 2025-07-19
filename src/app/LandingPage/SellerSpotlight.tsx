'use client';

import Link from 'next/link';
import Image from 'next/image';

const sellers = [
  { id: 1, name: 'Anna Craft', bio: 'Passionate ceramic artist from Italy.', image: '/images/sellers/anna.png' },
  { id: 2, name: 'Tom Weaver', bio: 'Expert woodworker crafting fine furniture.', image: '/images/sellers/tom.png' },
];

export default function SellerSpotlight() {
  return (
    <section className="py-12 px-8">
      <h2 className="text-2xl font-semibold mb-6">Seller Spotlight</h2>
      <div className="flex gap-8 justify-center flex-wrap">
        {sellers.map(({ id, name, bio, image }) => (
          <div key={id} className="border rounded-lg p-6 max-w-xs text-center shadow-md">
            <Image
              src={image}
              alt={name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="font-semibold mb-2">{name}</h3>
            <p className="text-gray-600 mb-4">{bio}</p>
            <Link href={`/seller-profile/${id}`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-semibold">
                View Shop
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
