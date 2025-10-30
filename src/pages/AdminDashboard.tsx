import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Users, MessageSquare, Palette, LogOut, Plus, Edit, Trash2, X, ShoppingBag, Eye, TrendingUp, Calendar, Clock, Star } from 'lucide-react';
import { 
  getProductsByCategory, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  Product 
} from '../services/productService';
import { getAllOrders, updateOrderStatus, deleteOrder, Order } from '../services/orderService';
import { getAllFeedback, deleteFeedback, Feedback } from '../services/feedbackService';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'overview' | 'products' | 'orders' | 'custom' | 'feedback'>('overview');
  const [activeProductCategory, setActiveProductCategory] = useState<'female' | 'male' | 'kids'>('female');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    color: '',
    stock: '',
    image: ''
  });

  useEffect(() => {
    // Check if user is admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Load products when category changes
    if (activeSection === 'products') {
      loadProducts();
    } else if (activeSection === 'orders') {
      loadOrders();
    } else if (activeSection === 'feedback') {
      loadFeedback();
    }
  }, [activeProductCategory, activeSection]);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadProducts = () => {
    const categoryProducts = getProductsByCategory(activeProductCategory);
    setProducts(categoryProducts);
  };

  const loadOrders = () => {
    try {
      const allOrders = getAllOrders();
      console.log('Loaded orders:', allOrders); // Debug log
      setOrders(allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    }
  };

  const loadFeedback = () => {
    try {
      const allFeedback = getAllFeedback();
      setFeedback(allFeedback.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error loading feedback:', error);
      setFeedback([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    loadOrders();
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      deleteOrder(orderId);
      loadOrders();
      setShowOrderModal(false);
    }
  };

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({ name: '', price: '', description: '', color: '', stock: '', image: '' });
    setShowProductModal(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      color: product.color,
      stock: product.stock.toString(),
      image: product.image
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.stock || !productForm.color) {
      alert('Please fill in all required fields (Name, Price, Color, Stock)!');
      return;
    }

    if (editingProduct) {
      // Update existing product
      updateProduct(editingProduct.id, {
        name: productForm.name,
        price: parseFloat(productForm.price),
        description: productForm.description,
        color: productForm.color,
        stock: parseInt(productForm.stock),
        image: productForm.image
      });
    } else {
      // Add new product
      addProduct({
        name: productForm.name,
        category: activeProductCategory,
        price: parseFloat(productForm.price),
        description: productForm.description,
        color: productForm.color,
        stock: parseInt(productForm.stock),
        image: productForm.image
      });
    }

    setShowProductModal(false);
    loadProducts();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      loadProducts();
    }
  };

  const handleDeleteFeedback = (id: string) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      deleteFeedback(id);
      loadFeedback();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-main text-white shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">HYPE WEAR Admin Panel</h1>
            <p className="text-sm text-primary">Shop Owner Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
              <button
                onClick={() => setActiveSection('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeSection === 'overview' ? 'bg-main text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Package size={20} />
                Overview
              </button>
              
              <button
                onClick={() => setActiveSection('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeSection === 'products' ? 'bg-main text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Users size={20} />
                Products
              </button>
              
              <button
                onClick={() => setActiveSection('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeSection === 'orders' ? 'bg-main text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Package size={20} />
                Customer Orders
              </button>
              
              <button
                onClick={() => setActiveSection('custom')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeSection === 'custom' ? 'bg-main text-white' : 'hover:bg-gray-100'
                }`}
              >
                <Palette size={20} />
                Custom Designs
              </button>
              
              <button
                onClick={() => setActiveSection('feedback')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeSection === 'feedback' ? 'bg-main text-white' : 'hover:bg-gray-100'
                }`}
              >
                <MessageSquare size={20} />
                Customer Feedback
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-6">
              {activeSection === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                  
                  {/* Date, Time & Calendar Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Live Clock */}
                    <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <Clock size={28} />
                        <h3 className="text-xl font-semibold">Current Time</h3>
                      </div>
                      <p className="text-5xl font-bold tracking-wider">
                        {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </p>
                      <p className="text-sm mt-2 opacity-90">
                        {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}
                      </p>
                    </div>

                    {/* Calendar */}
                    <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar size={28} className="drop-shadow-lg" />
                        <h3 className="text-xl font-semibold drop-shadow-md">Today's Date</h3>
                      </div>
                      <p className="text-5xl font-bold drop-shadow-lg text-white">
                        {currentTime.getDate()}
                      </p>
                      <p className="text-xl mt-2 font-semibold drop-shadow-md text-white">
                        {currentTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Total Products</h3>
                        <Package size={24} />
                      </div>
                      <p className="text-4xl font-bold">
                        {(() => {
                          const femaleProducts = getProductsByCategory('female');
                          const maleProducts = getProductsByCategory('male');
                          const kidsProducts = getProductsByCategory('kids');
                          return femaleProducts.length + maleProducts.length + kidsProducts.length;
                        })()}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Total Orders</h3>
                        <ShoppingBag size={24} />
                      </div>
                      <p className="text-4xl font-bold">{orders.length}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Pending Orders</h3>
                        <TrendingUp size={24} />
                      </div>
                      <p className="text-4xl font-bold">
                        {orders.filter(order => order.status === 'pending').length}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold drop-shadow-md">Total Revenue</h3>
                        <TrendingUp size={24} className="drop-shadow-lg" />
                      </div>
                      <p className="text-4xl font-bold drop-shadow-lg text-white">
                        RS {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Monthly Orders Chart */}
                  <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
                    <div className="flex items-center gap-3 mb-6">
                      <TrendingUp size={28} />
                      <h3 className="text-2xl font-bold">Monthly Order Statistics</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {(() => {
                        // Calculate orders per month
                        const monthlyOrders = orders.reduce((acc, order) => {
                          const date = new Date(order.createdAt);
                          const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                          acc[monthYear] = (acc[monthYear] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>);

                        const maxOrders = Math.max(...Object.values(monthlyOrders), 1);

                        return Object.entries(monthlyOrders)
                          .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
                          .slice(-6) // Show last 6 months
                          .map(([month, count]) => (
                            <div key={month} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{month}</span>
                                <span className="text-2xl font-bold">{count}</span>
                              </div>
                              <div className="w-full bg-slate-600 rounded-full h-4 overflow-hidden">
                                <div
                                  className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all"
                                  style={{ width: `${(count / maxOrders) * 100}%` }}
                                />
                              </div>
                            </div>
                          ));
                      })()}
                      
                      {orders.length === 0 && (
                        <p className="text-center text-slate-300 py-8">No orders yet. Start selling to see statistics!</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'products' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Products</h2>
                  
                  {/* Sub-category Tabs */}
                  <div className="flex gap-2 mb-6 border-b border-gray-200">
                    <button
                      onClick={() => setActiveProductCategory('female')}
                      className={`px-6 py-3 font-medium transition-all ${
                        activeProductCategory === 'female'
                          ? 'text-main border-b-2 border-main'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Female Products
                    </button>
                    <button
                      onClick={() => setActiveProductCategory('male')}
                      className={`px-6 py-3 font-medium transition-all ${
                        activeProductCategory === 'male'
                          ? 'text-main border-b-2 border-main'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Male Products
                    </button>
                    <button
                      onClick={() => setActiveProductCategory('kids')}
                      className={`px-6 py-3 font-medium transition-all ${
                        activeProductCategory === 'kids'
                          ? 'text-main border-b-2 border-main'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Kids Products
                    </button>
                  </div>

                  {/* Add Product Button */}
                  <div className="flex justify-end mb-6">
                    <button 
                      onClick={openAddProductModal}
                      className="flex items-center gap-2 px-4 py-2 bg-main text-white rounded-lg hover:opacity-90 transition"
                    >
                      <Plus size={20} />
                      Add New Product
                    </button>
                  </div>

                  {/* Product List */}
                  <div className="space-y-4">
                    {products.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        No products in this category yet. Click "Add New Product" to get started!
                      </div>
                    ) : (
                      products.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:border-main transition">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{product.name}</h3>
                              <p className="text-sm text-gray-600">Price: RS {product.price} | Color: {product.color} | Stock: {product.stock}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => openEditProductModal(product)}
                              className="p-2 text-[#1e3a8a] hover:bg-[#e0e7ff] rounded-lg transition"
                            >
                              <Edit size={20} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeSection === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Orders</h2>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">No orders yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:border-black transition">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{order.orderNumber}</h3>
                              <p className="text-sm text-gray-600">Customer: {order.customerName}</p>
                              <p className="text-sm text-gray-600">Phone: {order.customerPhone}</p>
                              <p className="text-sm text-gray-600">Email: {order.customerEmail}</p>
                              <p className="text-sm text-gray-600">
                                Transaction ID: <span className="font-mono text-blue-600">{order.paymentSlip}</span>
                              </p>
                              <p className="text-sm text-gray-600">Address: {order.shippingAddress.substring(0, 50)}{order.shippingAddress.length > 50 ? '...' : ''}</p>
                              <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                              <p className="text-lg font-bold text-gray-900">RS {order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-3 mt-3">
                            <p className="text-sm text-gray-600 mb-2">Items: {order.items.length}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {order.items.slice(0, 3).map((item, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {item.name} x{item.quantity}
                                </span>
                              ))}
                              {order.items.length > 3 && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  +{order.items.length - 3} more
                                </span>
                              )}
                            </div>
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewOrder(order)}
                                className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition text-sm"
                              >
                                <Eye size={16} />
                                View Details
                              </button>
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                                className="px-3 py-1 border border-gray-300 rounded text-sm"
                              >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'custom' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Custom Design Requests</h2>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">Custom T-Shirt Design</h3>
                          <p className="text-sm text-gray-600">Customer: John Doe</p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Pending</span>
                      </div>
                      <p className="text-gray-700 mb-3">I want a custom hoodie with my brand logo...</p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                          Accept
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'feedback' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Customer Feedback</h2>
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-md">
                        <div className="flex items-center gap-2">
                          <Star size={20} fill="white" />
                          <span className="font-bold">
                            {feedback.length > 0 
                              ? (feedback.reduce((sum, fb) => sum + fb.rating, 0) / feedback.length).toFixed(1)
                              : '0.0'
                            }
                          </span>
                          <span className="text-sm opacity-90">({feedback.length} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {feedback.length === 0 ? (
                    <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                      <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg font-medium">No customer feedback yet</p>
                      <p className="text-gray-400 text-sm mt-2">Feedback from customers will appear here</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {feedback.map((fb) => (
                        <div 
                          key={fb.id} 
                          className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-main transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-gradient-to-br from-main to-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                                  {fb.customerName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900 text-lg">{fb.title}</h3>
                                  <p className="text-sm text-gray-600">by {fb.customerName}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                {[...Array(5)].map((_, index) => (
                                  <Star 
                                    key={index}
                                    size={20} 
                                    className={index < fb.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                  />
                                ))}
                                <span className="text-sm font-semibold text-gray-600 ml-2">
                                  {fb.rating}.0 / 5.0
                                </span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDeleteFeedback(fb.id)}
                              className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all transform hover:scale-110"
                              title="Delete feedback"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                          
                          <div className="bg-white rounded-lg p-4 border border-gray-200 mb-3">
                            <p className="text-gray-700 leading-relaxed">{fb.message}</p>
                          </div>
                          
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MessageSquare size={14} />
                              {fb.customerEmail}
                            </span>
                            <span>{new Date(fb.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowProductModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 w-full max-w-lg mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (RS) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
                <input
                  type="text"
                  value={productForm.color}
                  onChange={(e) => setProductForm({...productForm, color: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  placeholder="e.g., Red, Blue, Black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  rows={3}
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 bg-main text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedOrder.orderNumber}</h2>
                <p className="text-sm text-gray-600">Order Details</p>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm"><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                  <p className="text-sm"><span className="font-medium">Phone:</span> {selectedOrder.customerPhone}</p>
                  <p className="text-sm"><span className="font-medium">Email:</span> {selectedOrder.customerEmail}</p>
                  <div className="text-sm">
                    <span className="font-medium">Transaction ID / Reference Number:</span>
                    <p className="mt-1 font-mono text-blue-600 bg-blue-50 px-3 py-2 rounded border border-blue-200">
                      {selectedOrder.paymentSlip}
                    </p>
                    <div className="mt-3 bg-green-50 border border-green-300 rounded-lg p-3">
                      <p className="text-xs font-semibold text-green-900 mb-1">💬 Payment Proof via WhatsApp</p>
                      <p className="text-xs text-green-800">
                        Customer should send payment slip/screenshot to: <span className="font-bold">+94 77 838 1200</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Shipping Address:</span>
                    <p className="mt-1 whitespace-pre-line">{selectedOrder.shippingAddress}</p>
                  </div>
                  <p className="text-sm"><span className="font-medium">Date:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 border border-gray-200 rounded-lg p-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                      <div className="flex-grow">
                        <p className="font-medium">{item.name}</p>
                        {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}
                        <p className="text-sm text-gray-600">Qty: {item.quantity} × RS {item.price.toFixed(2)}</p>
                      </div>
                      <p className="font-semibold">RS {(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>RS {selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (10%):</span>
                    <span>RS {selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>RS {selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Update Status</h3>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value as Order['status'])}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDeleteOrder(selectedOrder.id)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
