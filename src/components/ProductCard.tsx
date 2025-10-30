import React from 'react';

interface ProductCardProps {
    image: string;
    title: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-gray-700">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default ProductCard;