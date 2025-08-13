// app/seller/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/app/components/ProductCard';
import prisma from '@/app/lib/prisma';

export default async function SellerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const seller = await prisma.user.findUnique({
    where: { id: params.id, role: 'seller' },
    include: { products: { orderBy: { createdAt: 'desc' } } },
  });

  if (!seller) notFound();

  const joinedYear = new Date(seller.createdAt).getFullYear();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero banner */}
      <section className="bg-amber-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        {/* Avatar */}
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-amber-200 flex-shrink-0">
          <Image
            src={seller.profileImage || '/avatar-placeholder.jpg'}
            alt={seller.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-amber-900">{seller.name}</h1>
          <p className="text-amber-700 mt-2">
            Joined in {joinedYear} • {seller.products.length} Products
          </p>
          <p className="text-gray-700 mt-4 max-w-prose">
            {seller.bio || 'No bio provided yet.'}
          </p>

          {/* Social links example */}
          <div className="mt-4 flex gap-4 justify-center md:justify-start">
            <a href="#" className="text-amber-600 hover:underline">Instagram</a>
            <a href="#" className="text-amber-600 hover:underline">Website</a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-8">Products by {seller.name}</h2>

        {seller.products.length === 0 ? (
          <p className="text-gray-600">This seller hasn’t listed any products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {seller.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Back link */}
      <div className="mt-12">
        <Link
          href="/seller-profiles"
          className="inline-flex items-center text-amber-600 hover:underline"
        >
          ← Back to All Artisans
        </Link>
      </div>
    </main>
  );
}