import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, X } from 'lucide-react';
import { addOrder, generateOrderPDF, Order } from '../services/orderService';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    paymentSlip: '',
    shippingAddress: ''
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showOrderModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showOrderModal]);

  const handleQuantityChange = (id: string, currentQty: number, change: number) => {
    const newQty = currentQty + change;
    if (newQty > 0) {
      updateQuantity(id, newQty);
    }
  };

  const handleProcessOrder = () => {
    if (state.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowOrderModal(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email || !customerInfo.paymentSlip || !customerInfo.shippingAddress) {
      alert('Please fill in all customer information including payment slip and shipping address');
      return;
    }

    // Calculate order totals
    const subtotal = state.totalAmount;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    // Create order
    const order = addOrder({
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerEmail: customerInfo.email,
      paymentSlip: customerInfo.paymentSlip,
      shippingAddress: customerInfo.shippingAddress,
      items: state.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
        image: item.image
      })),
      subtotal,
      tax,
      total,
      status: 'pending'
    });

    // Generate and download PDF
    generateOrderPDF(order);

    // Show success message
    alert(`Order ${order.orderNumber} has been placed successfully! Your order receipt has been downloaded.`);

    // Clear cart and close modal
    clearCart();
    setShowOrderModal(false);
    setCustomerInfo({ name: '', phone: '', email: '', paymentSlip: '', shippingAddress: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          {state.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium transition"
            >
              Clear Cart
            </button>
          )}
        </div>

        {state.items.length === 0 ? (
          /* Empty Cart */
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-main text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-6 flex gap-6 items-center hover:shadow-lg transition"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                    {item.color && (
                      <p className="text-sm text-gray-600 mb-2">Color: {item.color}</p>
                    )}
                    <p className="text-xl font-bold text-main">RS {item.price.toFixed(2)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm transition"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total</p>
                    <p className="text-xl font-bold text-gray-900">
                      RS {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>RS {state.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>RS {(state.totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>RS {(state.totalAmount + state.totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleProcessOrder}
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition mb-3"
                >
                  Process Order
                </button>

                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Modal */}
        {showOrderModal && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-5 relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Customer Information</h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1.5 transition"
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction ID / Reference Number *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.paymentSlip}
                    onChange={(e) => setCustomerInfo({...customerInfo, paymentSlip: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter your transaction ID or reference number"
                    required
                  />
                  <div className="mt-3 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-blue-900 mb-2">📱 Important: Send Payment Proof via WhatsApp</p>
                    <p className="text-sm text-blue-800 mb-2">
                      After placing your order, please send your payment slip/screenshot to:
                    </p>
                    <a 
                      href="https://wa.me/94778381200" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                      <span className="text-xl">💬</span>
                      WhatsApp: +94 77 838 1200
                    </a>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Shipping Address *
                  </label>
                  <textarea
                    value={customerInfo.shippingAddress}
                    onChange={(e) => setCustomerInfo({...customerInfo, shippingAddress: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Complete address with postal code"
                    rows={2}
                    required
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 border border-gray-200">
                  <div className="flex justify-between text-xs">
                    <span>Subtotal:</span>
                    <span>RS {state.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Tax (10%):</span>
                    <span>RS {(state.totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-1.5">
                    <span>Total:</span>
                    <span>RS {(state.totalAmount + state.totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
                  >
                    Confirm Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-300 transition border border-gray-300 hover:border-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;