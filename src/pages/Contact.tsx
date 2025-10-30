import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: ''
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		
		// Simulate form submission
		setTimeout(() => {
			alert('Thank you for contacting us! We\'ll get back to you soon! 📧');
			setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
			setIsSubmitting(false);
		}, 1000);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
				<div className="max-w-6xl mx-auto px-6 text-center">
					<h1 className="text-5xl font-bold mb-4">Get In Touch! 📞</h1>
					<p className="text-2xl opacity-90">We'd Love to Hear From You!</p>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
					{/* Contact Info Cards */}
					<div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition">
						<Phone size={40} className="mb-4" />
						<h3 className="text-2xl font-bold mb-3">Call Us</h3>
						<p className="text-blue-100 mb-2">We're here to help!</p>
						<p className="text-xl font-semibold">+94 77 838 1200</p>
						<p className="text-sm mt-2 opacity-90">Mon-Sat: 9 AM - 8 PM</p>
					</div>

					<div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition">
						<Mail size={40} className="mb-4" />
						<h3 className="text-2xl font-bold mb-3">Email Us</h3>
						<p className="text-purple-100 mb-2">Drop us a message anytime!</p>
						<p className="text-xl font-semibold">info@hypewear.com</p>
						<p className="text-sm mt-2 opacity-90">We reply within 24 hours</p>
					</div>

					<div className="bg-gradient-to-br from-pink-500 to-rose-700 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition">
						<MapPin size={40} className="mb-4" />
						<h3 className="text-2xl font-bold mb-3">Visit Us</h3>
						<p className="text-pink-100 mb-2">Come say hi!</p>
						<p className="text-lg font-semibold">Wanamal Uyana Street</p>
						<p className="text-lg">Gampaha, Sri Lanka</p>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Contact Form */}
					<div className="bg-white rounded-3xl shadow-2xl p-8">
						<div className="flex items-center gap-3 mb-6">
							<MessageCircle size={40} className="text-main" />
							<h2 className="text-3xl font-bold text-gray-900">Send Us a Message</h2>
						</div>
						
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
								<input
									type="text"
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition"
									placeholder="John Doe"
									required
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
									<input
										type="email"
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
										className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition"
										placeholder="john@example.com"
										required
									/>
								</div>

								<div>
									<label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
									<input
										type="tel"
										value={formData.phone}
										onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
										className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition"
										placeholder="+94 77 838 1200"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
								<input
									type="text"
									value={formData.subject}
									onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
									className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition"
									placeholder="How can we help you?"
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
								<textarea
									value={formData.message}
									onChange={(e) => setFormData({ ...formData, message: e.target.value })}
									className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-main transition resize-none"
									rows={6}
									placeholder="Tell us what's on your mind..."
									required
								/>
							</div>

							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50"
							>
								<Send size={24} />
								{isSubmitting ? 'Sending...' : 'Send Message'}
							</button>
						</form>
					</div>

					{/* Additional Info */}
					<div className="space-y-6">
						{/* Business Hours */}
						<div className="bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-2xl p-8 shadow-xl">
							<div className="flex items-center gap-3 mb-4">
								<Clock size={40} />
								<h3 className="text-3xl font-bold">Business Hours</h3>
							</div>
							<div className="space-y-3 text-lg">
								<div className="flex justify-between">
									<span className="font-semibold">Monday - Friday:</span>
									<span>9:00 AM - 8:00 PM</span>
								</div>
								<div className="flex justify-between">
									<span className="font-semibold">Saturday:</span>
									<span>10:00 AM - 6:00 PM</span>
								</div>
								<div className="flex justify-between">
									<span className="font-semibold">Sunday:</span>
									<span>Closed</span>
								</div>
							</div>
						</div>

						{/* Social Media */}
						<div className="bg-white rounded-2xl p-8 shadow-xl">
							<h3 className="text-3xl font-bold text-gray-900 mb-6">Follow Us! 🌟</h3>
							<p className="text-gray-600 mb-6">Stay connected on social media for latest updates, deals, and fashion tips!</p>
							<div className="flex gap-4">
								<a href="https://www.facebook.com/profile.php?id=100079865601154&mibextid=kFxxJD" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition transform hover:scale-110">
									<Facebook size={28} />
								</a>
								<a href="#" className="bg-pink-600 text-white p-4 rounded-full hover:bg-pink-700 transition transform hover:scale-110">
									<Instagram size={28} />
								</a>
								<a href="#" className="bg-blue-400 text-white p-4 rounded-full hover:bg-blue-500 transition transform hover:scale-110">
									<Twitter size={28} />
								</a>
							</div>
						</div>

						{/* FAQ Quick Links */}
						<div className="bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl p-8 shadow-xl">
							<h3 className="text-3xl font-bold mb-4 text-gray-900">Quick Help 🚀</h3>
							<p className="mb-4 text-gray-900">Looking for quick answers?</p>
							<ul className="space-y-3 text-gray-900">
								<li className="flex items-start gap-2">
									<span className="text-2xl">📦</span>
									<span>Shipping usually takes 3-5 business days</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-2xl">🔄</span>
									<span>Easy returns within 14 days</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-2xl">💳</span>
									<span>We accept all major payment methods</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-2xl">🎁</span>
									<span>Free shipping on orders over RS 5,000</span>
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Bottom CTA */}
				<div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-12 text-white text-center">
					<h2 className="text-4xl font-bold mb-4">Need Help Right Away? 🤝</h2>
					<p className="text-xl mb-6">
						Our friendly customer service team is ready to assist you!
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<a href="tel:+94778381200" className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition">
							📞 Call Now
						</a>
						<a href="/feedback" className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition">
							💬 Send Feedback
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
