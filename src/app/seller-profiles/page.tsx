import Image from 'next/image';
import Link from 'next/link';
import prisma  from '@/app/lib/prisma';

export default async function SellerProfilesPage() {
  const sellers = await prisma.user.findMany({
    where: { role: 'seller' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Our Artisans
      </h1>

      {/* 3 cols → responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {sellers.map(seller => (
          <div
            key={seller.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col"
          >
            {/* Avatar container */}
            <div className="w-full h-28 flex items-center justify-center bg-gray-100 rounded-t-xl">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-300">
                <Image
                  src={seller.profileImage || '/avatar-placeholder.jpg'}
                  alt={seller.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="pt-4 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-gray-900 truncate">
                {seller.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {seller.bio || 'Tagline Tagline Tagline Tagline'}
              </p>

              <Link
                href={`/seller/${seller.id}`}
                className="mt-auto w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-2 rounded-lg text-sm font-medium transition"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}