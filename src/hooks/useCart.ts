import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const useCart = () => {
    const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    };
};

export default useCart;