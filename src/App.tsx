import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Product from './pages/Product';
import Cart from './pages/Cart';
import AboutUs from './pages/Aboutus';
import Services from './pages/Services';
import Female from './pages/Female';
import Male from './pages/Male';
import Kids from './pages/Kids';
import Feedback from './pages/Feedback';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CustomDesign from './pages/CustomDesign';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Admin Routes - No Header/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Public Routes - With Header/Footer */}
          <Route path="*" element={
            <>
              <Header appName={''} />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/female" element={<Female />} />
                  <Route path="/male" element={<Male />} />
                  <Route path="/kids" element={<Kids />} />
                  <Route path="/custom-design" element={<CustomDesign />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
};

export default App;