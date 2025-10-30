export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
};

export type CartItem = {
    product: Product;
    quantity: number;
};

export type Cart = {
    items: CartItem[];
    totalAmount: number;
};

export type User = {
    id: string;
    name: string;
    email: string;
};