import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Send, ArrowLeft } from 'lucide-react';
import { addFeedback } from '../services/feedbackService';

function Feedback() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        title: '',
        message: '',
        rating: 0
    });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.customerName || !formData.customerEmail || !formData.title || !formData.message || formData.rating === 0) {
            alert('Please fill in all fields and select a rating!');
            return;
        }

        setIsSubmitting(true);

        try {
            addFeedback({
                customerName: formData.customerName,
                customerEmail: formData.customerEmail,
                title: formData.title,
                message: formData.message,
                rating: formData.rating
            });

            alert('Thank you for your feedback! 🎉');
            setFormData({
                customerName: '',
                customerEmail: '',
                title: '',
                message: '',
                rating: 0
            });
            navigate('/');
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">

            <div className="flex-1 container mx-auto px-6 py-12">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-main hover:text-primary transition mb-6"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </button>

                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Share Your Experience</h1>
              <p className="text-blue-100">We value your feedback and would love to hear from you!</p>
            </div>                        {/* Form Section */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                                    <input
                                        type="text"
                                        value={formData.customerName}
                                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition"
                                        placeholder="John Doe"
                                        required />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email *</label>
                                    <input
                                        type="email"
                                        value={formData.customerEmail}
                                        onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition"
                                        placeholder="john@example.com"
                                        required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition"
                                    placeholder="Great products and service!"
                                    required />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Your Rating *</label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="transform transition-all hover:scale-110"
                                        >
                                            <Star
                                                size={40}
                                                className={star <= (hoveredRating || formData.rating)
                                                    ? 'text-yellow-500 fill-yellow-500'
                                                    : 'text-gray-300'} />
                                        </button>
                                    ))}
                                    {formData.rating > 0 && (
                                        <span className="ml-3 text-2xl font-bold text-main">
                                            {formData.rating}.0 / 5.0
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Your Feedback *</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition resize-none"
                                    rows={6}
                                    placeholder="Tell us about your experience with HYPE WEAR..."
                                    required />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={24} />
                                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                            </button>
                        </form>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <div className="text-3xl mb-2">🎯</div>
                            <p className="text-sm text-gray-600">Your feedback helps us improve</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <div className="text-3xl mb-2">⭐</div>
                            <p className="text-sm text-gray-600">Rate your experience honestly</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <div className="text-3xl mb-2">💬</div>
                            <p className="text-sm text-gray-600">Share your thoughts with us</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feedback;
