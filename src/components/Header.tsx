// src/components/Header.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, Search } from 'lucide-react'; // Using lucide-react for icons
import HypeLogo from '../image/HYPELOGO.png';
import { getProductsByCategory } from '../services/productService';

// Define props for the component (optional, but good practice)
interface HeaderProps {
  appName?: string;
}

const Header: React.FC<HeaderProps> = ({ appName = 'HYPE WEAR' }) => {
  const navigate = useNavigate();
  const { state } = useCart();
  
  // Calculate total items in cart
  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  
  // Navigation links data
  const navLinks = [
    { name: 'Female', href: '/female' },
    { name: 'Male', href: '/male' },
    { name: 'Kids', href: '/kids' },
    { name: 'Custom Design', href: '/custom-design' },
  ];

  // Auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'otp'>('login');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Handle login button click
  const handleLoginClick = () => {
    // If not on homepage, navigate to homepage first
    if (window.location.pathname !== '/') {
      navigate('/');
      // Set a flag in sessionStorage to open modal after navigation
      sessionStorage.setItem('openLoginModal', 'true');
    } else {
      // Already on homepage, open modal directly
      setAuthView('login');
      setShowAuthModal(true);
    }
  };

  // Check if we need to open modal after navigation
  useEffect(() => {
    const shouldOpenModal = sessionStorage.getItem('openLoginModal');
    if (shouldOpenModal === 'true') {
      sessionStorage.removeItem('openLoginModal');
      setAuthView('login');
      setShowAuthModal(true);
    }
  }, []);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim().length < 2) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    // Get all products from all categories
    const femaleProducts = getProductsByCategory('female');
    const maleProducts = getProductsByCategory('male');
    const kidsProducts = getProductsByCategory('kids');
    const allProducts = [...femaleProducts, ...maleProducts, ...kidsProducts];

    // Search by name or color (case-insensitive)
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.color.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchResults(true);
  };

  // Handle clicking outside search results
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAuthModal]);

  // Form states
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [otpCode, setOtpCode] = useState('');

  // Admin credentials
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'admin123';

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Check if admin credentials
    if (loginData.username === ADMIN_USERNAME && loginData.password === ADMIN_PASSWORD) {
      // Set admin session
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminToken', 'admin_' + Date.now());
      localStorage.setItem('adminUsername', loginData.username);
      
      // Close modal and redirect to admin dashboard
      setShowAuthModal(false);
      navigate('/admin/dashboard');
    } else if (loginData.username && loginData.password) {
      // Regular customer login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', loginData.username);
      setShowAuthModal(false);
      console.log('Customer Login:', loginData);
    } else {
      setLoginError('Please enter both username and password');
    }
  };

  // Handle register - move to OTP
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Send OTP to phone
    console.log('Sending OTP to:', registerData.phone);
    setAuthView('otp');
  };

  // Handle OTP verification
  const handleOTPVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Verify OTP
    console.log('Verifying OTP:', otpCode);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setAuthView('login');
      setShowAuthModal(false);
      // Reset forms
      setRegisterData({ email: '', phone: '', password: '', confirmPassword: '' });
      setOtpCode('');
    }, 3000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo/App Name */}
            <div className="flex items-center">
              {/* Hamburger menu for mobile (not visible in image but good for responsiveness) */}
            <button className="lg:hidden p-2 mr-3 text-gray-700">
              <Menu size={24} />
            </button>
            <a href="/" className="flex items-center space-x-2">
              {/* Use the provided HYPELOGO.png image if available */}
              <img src={HypeLogo} alt="HYPE Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-900">HYPE WEAR</span>
            </a>
          </div>

          {/* Primary Navigation Links (Desktop) */}
          <nav className="hidden lg:flex flex-grow justify-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Side: Search, Cart, and Login Button */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative hidden md:block search-container">
              <input
                type="text"
                placeholder="Search by name or color..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery.length >= 2 && setShowSearchResults(true)}
                className="w-64 py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-main focus:border-main transition"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-y-auto z-50">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                        <p className="text-sm font-semibold text-gray-700">
                          Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                        </p>
                      </div>
                      <div className="py-2">
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => {
                              navigate(`/product/${product.id}`);
                              setShowSearchResults(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
                          >
                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                              <p className="text-sm text-gray-600">
                                Color: <span className="font-medium">{product.color}</span>
                              </p>
                              <p className="text-sm font-bold text-main">RS {product.price}</p>
                            </div>
                            <div className="flex-shrink-0">
                              {product.stock > 0 ? (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  In Stock
                                </span>
                              ) : (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                  Out of Stock
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Search size={48} className="mx-auto text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">No products found</p>
                      <p className="text-sm text-gray-400 mt-1">Try searching with different keywords or colors</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Icon */}
            <div 
              className="relative p-2 cursor-pointer"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={24} className="text-gray-700 hover:text-gray-900" />
              {/* Cart Counter */}
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleLoginClick}
              className="px-6 py-2 bg-main text-white rounded-lg font-medium hover:opacity-90 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Auth Modal with Blurred Background */}
    {showAuthModal && (
      <div 
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-lg"
        onClick={() => {setShowAuthModal(false); setAuthView('login');}}
        style={{ pointerEvents: 'auto' }}
      >
        <style>{`
          @keyframes borderGlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animated-border {
            position: relative;
            background: white;
            border-radius: 1rem;
            z-index: 1;
          }
          .animated-border::before {
            content: '';
            position: absolute;
            inset: -3px;
            border-radius: 1rem;
            padding: 3px;
            background: linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6, #60a5fa);
            background-size: 300% 100%;
            animation: borderGlow 3s ease infinite;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            z-index: -1;
          }
        `}</style>

        <div 
          className="animated-border w-full max-w-md mx-4 p-8 bg-white rounded-2xl relative z-[210] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          style={{ pointerEvents: 'auto' }}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => {setShowAuthModal(false); setAuthView('login');}}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center text-4xl font-bold z-[30] cursor-pointer transition-all"
          >
            ×
          </button>

          {/* Login View */}
          {authView === 'login' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login to HYPE WEAR</h2>
              
              {loginError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {loginError}
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Login
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button onClick={() => setAuthView('register')} className="text-[#1e3a8a] font-semibold hover:underline">
                  Register
                </button>
              </p>
            </div>
          )}

          {/* Register View */}
          {authView === 'register' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register</h2>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Send OTP
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={() => setAuthView('login')} className="text-[#1e3a8a] font-semibold hover:underline">
                  Login
                </button>
              </p>
            </div>
          )}

          {/* OTP Verification View */}
          {authView === 'otp' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Verify OTP</h2>
              <p className="text-sm text-gray-600 text-center mb-6">
                We've sent a code to {registerData.phone}
              </p>
              <form onSubmit={handleOTPVerify} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP Code</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-main text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Verify & Register
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Success Message Popup */}
    {showSuccess && (
      <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/50 backdrop-blur-md">
        <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to HYPE WEAR!</h3>
          <p className="text-gray-600">
            Hi, you are successfully registered to our site.
          </p>
        </div>
      </div>
    )}
    </>
  );
};

// Default appName is handled via destructuring default in the component signature.

export default Header;