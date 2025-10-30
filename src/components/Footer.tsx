import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-main text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} HYPE WERE Cloth Shop. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="/about" className="hover:underline">About Us</a>
                    <a href="/feedback" className="hover:underline">Feedback</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;