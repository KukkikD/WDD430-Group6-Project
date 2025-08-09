'use client';

import { Product } from '@prisma/client';
import { useCart } from '@/app/shop/hooks/useCart';

export const ProductCard = ( { product }: { product: Product}) => {
    const { addToCart } = useCart();

    const handleAddToCart = () =>{
        addToCart(product);
        alert(`${product.name} has been added to the cart.`);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-x1 p-4 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="w-full h-56 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img
                    src={product.image || 'https://placehold.co/400x400/EEE/333?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            </div>

        </div>

    );
};