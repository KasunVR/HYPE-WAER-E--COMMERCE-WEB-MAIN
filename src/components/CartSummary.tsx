import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartSummary: React.FC = () => {
    const { cartItems, totalAmount } = useContext(CartContext);

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Cart Summary</h2>
            <ul className="mt-2">
                {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-4 font-bold">
                Total: ${totalAmount.toFixed(2)}
            </div>
        </div>
    );
};

export default CartSummary;