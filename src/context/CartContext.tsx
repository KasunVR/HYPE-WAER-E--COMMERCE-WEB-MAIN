import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    color?: string;
    category?: string;
}

interface CartState {
    items: CartItem[];
    totalAmount: number;
}

interface CartContextType {
    state: CartState;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
    try {
        const savedCart = localStorage.getItem('hype_wear_cart');
        if (savedCart) {
            return JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Error loading cart from storage:', error);
    }
    return { items: [], totalAmount: 0 };
};

const initialState: CartState = loadCartFromStorage();

export const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: { type: string; payload?: any }): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            const existingItem = state.items[existingItemIndex];

            let updatedItems;
            if (existingItem) {
                const updatedItem = { ...existingItem, quantity: existingItem.quantity + action.payload.quantity };
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = updatedItem;
            } else {
                updatedItems = state.items.concat(action.payload);
            }

            const updatedTotalAmount = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

            return { items: updatedItems, totalAmount: updatedTotalAmount };

        case 'UPDATE_QUANTITY':
            const itemsWithUpdatedQty = state.items.map(item => 
                item.id === action.payload.id 
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            const totalAfterUpdate = itemsWithUpdatedQty.reduce((total, item) => total + item.price * item.quantity, 0);
            return { items: itemsWithUpdatedQty, totalAmount: totalAfterUpdate };

        case 'REMOVE_ITEM':
            const filteredItems = state.items.filter(item => item.id !== action.payload);
            const newTotalAmount = filteredItems.reduce((total, item) => total + item.price * item.quantity, 0);
            return { items: filteredItems, totalAmount: newTotalAmount };

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('hype_wear_cart', JSON.stringify(state));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }, [state]);

    const addItem = (item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id);
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
        }
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};