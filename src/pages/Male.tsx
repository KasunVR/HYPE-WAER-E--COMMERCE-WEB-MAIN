import React, { useState, useEffect } from 'react';
import { getProductsByCategory, Product } from '../services/productService';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';

const Male: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    // Load male products
    const maleProducts = getProductsByCategory('male');
    setProducts(maleProducts);
  }, []);

  const addToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      color: product.color,
      category: product.category
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Men's Collection
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-2">
              Elevate Your Style
            </p>
            <p className="text-lg text-gray-600">
              Premium quality menswear for the modern gentleman
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
              <ShoppingCart size={48} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Products Available</h2>
            <p className="text-lg text-gray-600">Check back soon for amazing men's clothing!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Product Image */}
                  <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-lg font-medium">No Image</span>
                      </div>
                    )}
                    {/* Stock Badge */}
                    {product.stock < 5 && product.stock > 0 && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Only {product.stock} left!
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[40px]">{product.description}</p>
                    
                    {/* Color Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-gray-700">Color:</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        {product.color}
                      </span>
                    </div>
                    
                    {/* Price and Stock */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">RS {product.price}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">In Stock</span>
                        <p className="text-lg font-semibold text-gray-700">{product.stock}</p>
                      </div>
                    </div>

                    {/* Add to Cart Button - Denim Blue */}
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        product.stock === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg transform hover:scale-105'
                      }`}
                    >
                      <ShoppingCart size={20} />
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Male;
