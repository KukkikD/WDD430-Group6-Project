'use client';

import { useCart } from '@/app/shop/hooks/useCart';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const shipping = cartItems.length > 0 ? 5.99 : 0;
    const total = subtotal + shipping;

    // Empty Cart State
    if(cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <ShoppingBag size={64} className="text-purple-300 mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
                <p className="text-gray-600">Looks like you haven't added anything to your cart yet.</p>
                <Link 
                href="/shop" 
                className="bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                >
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // Cart with Items 
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Your Shopping Cart</h1>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Cart Items List */}
                    <div className="w-full lg:w-2/3">
                        <div className="">
                            {cartItems.map( (item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 last:border-b-0">
                                    <Image 
                                        src={item.image}
                                        alt={item.name}
                                        width={96}
                                        height={96}
                                    />
                                </div>
                            ))};

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}