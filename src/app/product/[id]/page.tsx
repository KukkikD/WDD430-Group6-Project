// app/product/[id]/page.tsx
import Image from 'next/image';
import { notFound } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import AddToCartButton from '@/app/components/AddToCartButton';
import Link from 'next/link';

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { seller: true },
  });

  if (!product) notFound();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-purple-600 mb-4">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <p className="text-sm text-gray-500">
              Category: <span className="font-medium">{product.category}</span>
            </p>
            <p className="text-sm text-gray-500">
              Sold by{' '}
              <Link
                href={`/seller/${product.seller.id}`}
                className="text-purple-600 underline"
              >
                {product.seller.name}
              </Link>
            </p>
          </div>

          {/* Add-to-Cart */}
          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}