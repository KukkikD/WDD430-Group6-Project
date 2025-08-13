// src/app/LandingPage/SellerSpotlight.tsx
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/app/lib/prisma';

// ✅ Force this component to be dynamic on every request (avoid build-time static output)
export const dynamic = 'force-dynamic'; // or: export const revalidate = 0;

// ✅ Type for rendering
interface Seller {
  id: string;
  name: string;
  bio?: string;
  profileImage?: string;
}

export default async function SellerSpotlight() {
  // ✅ 1) Don’t hide DB by default. If you still want the flag, default it to true.
  const enableDb =
    process.env.NEXT_PUBLIC_ENABLE_SELLER_SPOTLIGHT_DB === 'false' ? false : true;

  let sellers: Seller[] = [];

  if (enableDb) {
    try {
      // ✅ 2) Case-insensitive role match in case some rows are 'Seller' / 'SELLER'
      const raw = await prisma.user.findMany({
        where: {
          role: { equals: 'seller', mode: 'insensitive' },
        },
        select: {
          id: true,
          name: true,
          bio: true,
          profileImage: true,
        },
        // ⚠️ Prisma don't have orderBy random directly: fetch somegroup then random from JS
        take: 50,
      });

      sellers = raw.map((u) => ({
        id: u.id,
        name: u.name,
        bio: u.bio ?? undefined,
        profileImage: u.profileImage ?? undefined,
      }));
    } catch (error) {
      console.error('[SellerSpotlight] DB error -> fallback to mock:', error);
    }
  } else {
    console.warn('[SellerSpotlight] DB flag disabled -> using mock');
  }

  // ✅ 3) Fallback if DB close or not found seller 
  if (sellers.length === 0) {
    sellers = [
      {
        id: '1',
        name: 'Anna Smith',
        bio: 'Handcrafted jewelry and accessories',
        profileImage: '/images/sellers/anna.png',
      },
      {
        id: '2',
        name: 'Tom Johnson',
        bio: 'Wooden furniture and home decor',
        profileImage: '/images/sellers/tom.png',
      },
    ];
  }

  // ✅ Random from JS
  const shuffled = [...sellers].sort(() => 0.5 - Math.random());
  const randomSellers = shuffled.slice(0, 2);

  return (
    <section className="bg-white py-4 px-4 md:min-w-[200px] md:w-[25%] h-full">
      <h2 className="text-2xl font-bold text-center mb-8">Seller Spotlight</h2>

      <div className="flex justify-center gap-8 flex-wrap h-full">
        {randomSellers.map(({ id, name, bio, profileImage }) => (
          <div
            key={id}
            className="bg-gray-100 p-6 rounded-lg shadow-md w-72 text-center"
          >
            <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
              <Image
                src={profileImage || '/images/sellers/anna.png'}
                alt={name}
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-lg font-semibold mb-2">{name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {bio || 'No bio available.'}
            </p>

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
