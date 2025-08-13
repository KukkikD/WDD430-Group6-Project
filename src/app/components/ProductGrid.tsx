'use client';

import { Product } from '@prisma/client';
import { ProductCard } from '../components/ProductCard';

interface ProductGridProps {
    products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <main className="w-full lg:w-3/4">
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <p className="text-xl font-semibold text-gray-600">No products found</p>
                    <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                </div>
            )}
            {products.length > 0 && (
                <div className="mt-8 text-center">
                    <p className="text-gray-600">Showing {products.length} products</p>
                </div>
            )}
            {products.length === 0 && (
                <div className="mt-8 text-center">
                    <p className="text-gray-600">No products match your criteria.</p>
                </div>
            )}
            {products.length > 0 && (
                <div className="mt-8 text-center">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Load More
                    </button>
                </div>
            )}
            {products.length === 0 && (
                <div className="mt-8 text-center">
                    <button className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed" disabled>
                        Load More
                    </button>
                </div>
            )}
            {products.length > 0 && (
                <div className="mt-8 text-center">
                </div>
            )}
        </main>
    );
};