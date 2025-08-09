import { useContext } from 'react';
import { CartContext } from '@/app/context/CartContext';

// This is a custom hook to use the CartContext 
export const useCart = () => {
    const context = useContext(CartContext);
    if(context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context;
};