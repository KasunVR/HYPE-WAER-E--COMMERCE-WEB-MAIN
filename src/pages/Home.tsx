// Home.jsx

import React from 'react';
import MainPhoto from '../image/MAINPHO.png';
// Assuming you have a reusable Button component
// import Button from './Button'; 

/**
 * A simple component to display the main content from the provided image.
 * Uses Tailwind CSS for styling.
 */
const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Section */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          {/* Left Content Column (Text and Button) */}
          <div className="w-full md:w-1/2 lg:w-5/12 mb-10 md:mb-0">
            {/* Sale Tag */}
            <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 rounded-full mb-6">
              Sale 70%
            </span>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
              An Industrial Take on Streetwear
            </h1>

            {/* Subtext */}
            <p className="text-lg text-gray-600 mb-10 max-w-lg">
              Anyone can beat you but no one can beat your outfit as long as you wear -HYPE WEAR-.
            </p>

            {/* Call to Action Button */}
            <button
              onClick={() => console.log('Start Shopping clicked')}
              className="flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-black hover:bg-gray-800 rounded-lg shadow-lg transition duration-300 ease-in-out"
            >
              {/* Shopping Cart Icon (using a simple text placeholder here, you'd use an SVG icon like from Heroicons) */}
              <span className="mr-2 text-xl">&#128722;</span> 
              Start Custom Design
            </button>
          </div>

          {/* Right Content Column (Image) */}
          <div className="w-full md:w-1/2 lg:w-5/12 flex justify-center md:justify-end">
            {/* Main Image */}
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-none">
              {/* Main photo that grabs visitor attention */}
              <img 
                src={MainPhoto}
                alt="HYPE WEAR main collection"
                className="w-full h-[500px] sm:h-[600px] lg:h-[700px] object-cover rounded-t-full shadow-2xl"
                style={{
                  transform: 'translateY(-10px)' 
                }}
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* --- Footer/Brand Section (The BUSTLE, VERSACE, InStyle part) --- */}
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-100 mt-12">
        <div className="flex justify-center items-center space-x-8 sm:space-x-12 opacity-60">
          <p className="text-xl sm:text-2xl font-serif font-bold text-gray-800 tracking-wider">BAZAAR</p>
          <p className="text-xl sm:text-2xl font-serif font-bold text-gray-800 tracking-wider">BUSTLE</p>
          <p className="text-xl sm:text-2xl font-serif font-bold text-gray-800 tracking-wider">VERSACE</p>
          <p className="text-xl sm:text-2xl font-serif font-bold text-gray-800 tracking-wider hidden sm:block">InStyle</p>
        </div>
      </footer>
    </div>
  );
};

export default Home