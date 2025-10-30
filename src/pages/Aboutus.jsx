import React from 'react';
import { Heart, Users, Sparkles, ShieldCheck, Shirt, Smile } from 'lucide-react';

const AboutUs = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-main to-primary py-16 relative overflow-hidden">
				<style>
					{`
						@keyframes rgb-animation {
							0% { color: #000000; }
							33.33% { color: #0000ff; }
							66.66% { color: #ff69b4; }
							100% { color: #000000; }
						}
						.rgb-text {
							animation: rgb-animation 3s linear infinite;
							text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
						}
					`}
				</style>
				<div className="max-w-6xl mx-auto px-6 text-center">
					<h1 className="text-5xl font-bold mb-4 animate-bounce rgb-text">Welcome to HYPE WEAR! 🎉</h1>
					<p className="text-2xl rgb-text">Fashion for Everyone - Kids, Teens & Parents!</p>
				</div>
			</div>

			<div className="max-w-6xl mx-auto px-6 py-12">
				{/* Our Story */}
				<section className="mb-16">
					<div className="bg-white rounded-3xl shadow-xl p-8">
						<div className="flex items-center gap-3 mb-6">
							<Heart size={40} className="text-red-500" />
							<h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
						</div>
						<p className="text-lg text-gray-700 leading-relaxed mb-4">
							HYPE WEAR started with a simple dream - to create <span className="font-bold text-main">awesome clothes</span> that everyone loves! 
							Whether you're a kid who loves colors, a teen looking for trendy styles, or a parent wanting quality and comfort, 
							we've got something special just for you! ✨
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							We believe fashion should be <span className="font-bold text-primary">fun, affordable, and friendly</span> for the whole family. 
							That's why we carefully design each piece with love and care!
						</p>
					</div>
				</section>

				{/* Why Choose Us */}
				<section className="mb-16">
					<h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Why Families Love Us! 💙</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition">
							<Shirt size={48} className="mb-4" />
							<h3 className="text-2xl font-bold mb-3">Quality Clothes</h3>
							<p className="text-blue-100">
								Super comfortable fabrics that are soft on skin and built to last through all your adventures!
							</p>
						</div>
						<div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition">
							<Users size={48} className="mb-4" />
							<h3 className="text-2xl font-bold mb-3">For Everyone</h3>
							<p className="text-purple-100">
								From tiny tots to cool teens and stylish parents - we have collections that fit every age and style!
							</p>
						</div>
						<div className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition">
							<Sparkles size={48} className="mb-4" />
							<h3 className="text-2xl font-bold mb-3">Trendy Designs</h3>
							<p className="text-pink-100">
								Stay ahead with our latest collections! Fresh designs that make you look and feel amazing!
							</p>
						</div>
					</div>
				</section>

				{/* For Kids Section */}
				<section className="mb-16">
					<div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-3xl shadow-xl p-8 text-gray-900">
						<div className="flex items-center gap-3 mb-6">
							<Smile size={48} />
							<h2 className="text-4xl font-bold">Hey Kids! 👋</h2>
						</div>
						<p className="text-xl leading-relaxed mb-4">
							We make <span className="font-bold">super cool clothes</span> in all your favorite colors! 
							🌈 From bright reds to ocean blues, sunshine yellows to forest greens!
						</p>
						<p className="text-xl leading-relaxed">
							Our clothes are perfect for playing, learning, and having fun! Plus, they're really comfy so you can move around freely! 🎈
						</p>
					</div>
				</section>

				{/* For Teens Section */}
				<section className="mb-16">
					<div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-8 text-white">
						<h2 className="text-4xl font-bold mb-6">For Teens 🔥</h2>
						<p className="text-xl leading-relaxed mb-4">
							Express yourself with our <span className="font-bold">trendy and stylish</span> collection! 
							We know you want to look good and feel confident - that's exactly what we deliver!
						</p>
						<p className="text-xl leading-relaxed">
							Whether you're heading to school, hanging with friends, or chilling at home, 
							our outfits help you showcase your unique personality! 😎✨
						</p>
					</div>
				</section>

				{/* For Parents Section */}
				<section className="mb-16">
					<div className="bg-gradient-to-r from-teal-400 to-cyan-600 rounded-3xl shadow-xl p-8">
						<div className="flex items-center gap-3 mb-6">
							<ShieldCheck size={48} className="text-gray-900" />
							<h2 className="text-4xl font-bold text-gray-900">For Parents 👨‍👩‍👧‍👦</h2>
						</div>
						<p className="text-xl leading-relaxed mb-4 text-gray-900">
							We understand what matters to you - <span className="font-bold">quality, safety, and value</span>. 
							That's why all our clothes are carefully selected and tested for comfort and durability.
						</p>
						<p className="text-xl leading-relaxed mb-4 text-gray-900">
							<strong>What We Promise:</strong>
						</p>
						<ul className="text-lg space-y-2 ml-6 text-gray-900">
							<li>✅ Safe, non-toxic materials</li>
							<li>✅ Affordable prices for every budget</li>
							<li>✅ Easy care - machine washable</li>
							<li>✅ Excellent customer service</li>
							<li>✅ Hassle-free returns & exchanges</li>
						</ul>
					</div>
				</section>

				{/* Our Mission */}
				<section className="mb-16">
					<div className="bg-white rounded-3xl shadow-xl p-8 border-4 border-main">
						<h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Our Mission 🎯</h2>
						<p className="text-xl text-gray-700 text-center leading-relaxed mb-6">
							To make fashion <span className="font-bold text-main">accessible, fun, and sustainable</span> for families everywhere! 
							We believe everyone deserves to look and feel great without breaking the bank.
						</p>
						<div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 text-white">
							<p className="text-lg font-semibold text-center">
								🌍 We're committed to sustainable practices and supporting eco-friendly production whenever possible. 
								Together, we can make fashion better for our planet!
							</p>
						</div>
					</div>
				</section>

				{/* Contact CTA */}
				<section className="text-center">
					<div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl shadow-xl p-12 text-white">
						<h2 className="text-4xl font-bold mb-4">Got Questions? We're Here! 💬</h2>
						<p className="text-xl mb-6">
							We love hearing from our customers! Feel free to reach out anytime.
						</p>
						<div className="flex flex-wrap gap-4 justify-center">
							<a 
								href="/feedback" 
								className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition"
							>
								Share Feedback
							</a>
							<a 
								href="/contact" 
								className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition"
							>
								Contact Us
							</a>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default AboutUs;
