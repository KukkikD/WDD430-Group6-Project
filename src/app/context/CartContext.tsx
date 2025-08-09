'use client'; 

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@prisma/client';

// Define the shape of the cart item 
export interface CartItem extends Product {
    quantity: number;
}

// Define the value of the CartContext
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    clearCart: () => void;

}

// Create the CartContext with default value
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the Provider component 
export const CartProvider = ( { children } : { children: ReactNode }) => {
    const [ cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Load cart items from localStorage on initial render
    useEffect( () => {
        try{
            const storedCart = localStorage.getItem('cart');
            if(storedCart) {
                setCartItems(JSON.parse(storedCart));
            }

        }catch(error) {
            console.error('Failed to load cart from localStorage: ', error);
        }
        setIsInitialLoad(false);
    }, []);

    // Save cart items to localStorage whenever they change
    useEffect( () => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems?.find(item => item.id === product.id);
            if(existingItem) {
                return prevItems.map( item => 
                    item.id === product.id ? { ...item, quantity: item.quantity +1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1}];
            }
        });
    }

    const removeFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId.toString()));
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if(newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId.toString() ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([])
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );

};