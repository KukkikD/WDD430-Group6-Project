import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/app/lib/prisma'; 

export default async function SellerSpotlight() {
  // fetch all sellers are role = 'seller'
  const sellers = await prisma.user.findMany({
    where: { role: 'seller' },
    select: {
      id: true,
      name: true,
      bio: true,
      profileImage: true,
    },
  });

  // random 3 sellers
  const shuffled = sellers.sort(() => 0.5 - Math.random());
  const randomSellers = shuffled.slice(0, 3);

  return (
    <section className="bg-white py-4 px-4 min-w-[200px] w-[25%] h-[500px]">
      <h2 className="text-2xl font-bold text-center mb-8">Seller Spotlight</h2>

      <div className="flex justify-center gap-8 flex-wrap h-[500px]">
        {randomSellers.map(({ id, name, bio, profileImage }) => (
          <div
            key={id}
            className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xs text-center"
          >
            <Image
              src={profileImage || '@/public/images/seller/placeholder.png'} //fallback seller image
              alt={name}
              width={120}
              height={120}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />

            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="text-sm text-gray-600 mb-4">{bio || 'No bio available.'}</p>

            <Link href={`/seller-profile/${id}`}>
              <button className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900 transition">
                View Shop
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
