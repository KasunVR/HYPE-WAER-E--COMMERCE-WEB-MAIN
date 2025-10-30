import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Admin credentials (In production, this should be handled by backend)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123';
    
    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      // Set admin session
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminToken', 'admin_' + Date.now());
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-main to-primary">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-main mb-2">Admin Login</h1>
          <p className="text-gray-600">HYPE WEAR - Admin Panel</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
              placeholder="Enter admin username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-main text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105"
          >
            Login as Admin
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-primary hover:text-main transition"
          >
            ← Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
