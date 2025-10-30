import React from 'react';

// Product page - displays product details
const Product: React.FC = () => {
    // Sample product data
    const product = {
        id: 1,
        name: 'Stylish T-Shirt',
        description: 'A stylish t-shirt made from 100% cotton.',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/400x300/313178/ffffff?text=Product+Image',
    };

    return (
        <div className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow-lg">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded" />
            <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="text-xl font-semibold mt-4">${product.price.toFixed(2)}</p>
            <button className="mt-6 w-full bg-main text-white py-2 rounded hover:opacity-90">
                Add to Cart
            </button>
        </div>
    );
};

export default Product;