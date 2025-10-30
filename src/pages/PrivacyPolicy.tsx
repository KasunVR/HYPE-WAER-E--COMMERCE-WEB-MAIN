import React from 'react';
import { Shield, Lock, Eye, UserCheck, Cookie, Bell, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
			{/* Hero Section */}
			<div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
				<div className="max-w-6xl mx-auto px-6 text-center">
					<Shield size={80} className="mx-auto mb-4" />
					<h1 className="text-5xl font-bold mb-4">Privacy Policy 🔒</h1>
					<p className="text-2xl opacity-90">Your Privacy Matters to Us!</p>
					<p className="text-lg mt-2 opacity-80">Last Updated: October 26, 2025</p>
				</div>
			</div>

			<div className="max-w-5xl mx-auto px-6 py-12">
				{/* Kid-Friendly Introduction */}
				<div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-3xl p-8 mb-8 shadow-xl">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">Hey There! 👋</h2>
					<p className="text-xl text-gray-900 leading-relaxed">
						We know reading privacy policies can be boring! 😴 So we made this one <span className="font-bold">easy to understand</span> for everyone - 
						kids, teens, and parents! We promise to keep your information <span className="font-bold">safe and secure</span>, just like a treasure chest! 🔐✨
					</p>
				</div>

				{/* What We Collect */}
				<section className="bg-white rounded-3xl shadow-xl p-8 mb-8">
					<div className="flex items-center gap-3 mb-6">
						<FileText size={40} className="text-blue-600" />
						<h2 className="text-3xl font-bold text-gray-900">What Information Do We Collect? 📝</h2>
					</div>
					
					<div className="space-y-4">
						<div className="bg-blue-50 rounded-2xl p-6">
							<h3 className="text-2xl font-bold text-gray-900 mb-3">When You Shop With Us:</h3>
							<ul className="space-y-2 text-lg text-gray-700">
								<li className="flex items-start gap-2">
									<span className="text-2xl">👤</span>
									<span><strong>Your Name:</strong> So we know who to say hello to!</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-2xl">📧</span>
									<span><strong>Email Address:</strong> To send you order updates and cool news</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-2xl">📱</span>
									<span><strong>Phone Number:</strong> In case we need to call about your order</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-2xl">🏠</span>
									<span><strong>Delivery Address:</strong> So we can send your awesome clothes!</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-2xl">💳</span>
									<span><strong>Payment Info:</strong> To complete your purchase safely</span>
								</li>
							</ul>
						</div>

						<div className="bg-purple-50 rounded-2xl p-6">
							<h3 className="text-2xl font-bold text-gray-900 mb-3">Automatic Information:</h3>
							<ul className="space-y-2 text-lg text-gray-700">
								<li className="flex items-start gap-2">
									<span className="text-2xl">🖥️</span>
									<span><strong>Device Info:</strong> What type of device you're using</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-2xl">🌐</span>
									<span><strong>Browsing Data:</strong> What pages you visit on our site</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-2xl">🍪</span>
									<span><strong>Cookies:</strong> Small files that help remember your preferences</span>
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* How We Use Info */}
				<section className="bg-white rounded-3xl shadow-xl p-8 mb-8">
					<div className="flex items-center gap-3 mb-6">
						<UserCheck size={40} className="text-green-600" />
						<h2 className="text-3xl font-bold text-gray-900">How Do We Use Your Information? 🎯</h2>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-2xl p-6">
							<h3 className="text-2xl font-bold mb-3">✅ We Use It To:</h3>
							<ul className="space-y-2">
								<li>🛍️ Process your orders</li>
								<li>📦 Deliver your clothes</li>
								<li>💌 Send you updates</li>
								<li>🎁 Offer you special deals</li>
								<li>🛡️ Keep your account safe</li>
								<li>📞 Answer your questions</li>
							</ul>
						</div>

						<div className="bg-gradient-to-br from-red-400 to-rose-600 text-white rounded-2xl p-6">
							<h3 className="text-2xl font-bold mb-3">❌ We Never:</h3>
							<ul className="space-y-2">
								<li>🚫 Sell your information</li>
								<li>🚫 Share without permission</li>
								<li>🚫 Send spam emails</li>
								<li>🚫 Give it to strangers</li>
								<li>🚫 Use it for bad things</li>
								<li>🚫 Make you feel unsafe</li>
							</ul>
						</div>
					</div>
				</section>

				{/* How We Protect Info */}
				<section className="bg-white rounded-3xl shadow-xl p-8 mb-8">
					<div className="flex items-center gap-3 mb-6">
						<Lock size={40} className="text-purple-600" />
						<h2 className="text-3xl font-bold text-gray-900">How We Keep Your Info Safe 🔐</h2>
					</div>
					
					<div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-8">
						<p className="text-xl leading-relaxed mb-6">
							Think of your information like a treasure! 💎 We use <span className="font-bold">super strong locks</span> (encryption) 
							and <span className="font-bold">security guards</span> (firewalls) to keep it safe from bad guys!
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="bg-white/20 rounded-lg p-4 text-center">
								<div className="text-4xl mb-2">🔒</div>
								<p className="font-semibold">Secure Encryption</p>
							</div>
							<div className="bg-white/20 rounded-lg p-4 text-center">
								<div className="text-4xl mb-2">🛡️</div>
								<p className="font-semibold">Protected Servers</p>
							</div>
							<div className="bg-white/20 rounded-lg p-4 text-center">
								<div className="text-4xl mb-2">👮</div>
								<p className="font-semibold">24/7 Monitoring</p>
							</div>
						</div>
					</div>
				</section>

				{/* Cookies */}
				<section className="bg-white rounded-3xl shadow-xl p-8 mb-8">
					<div className="flex items-center gap-3 mb-6">
						<Cookie size={40} className="text-orange-600" />
						<h2 className="text-3xl font-bold text-gray-900">About Cookies 🍪</h2>
					</div>
					
					<div className="bg-orange-50 rounded-2xl p-6">
						<p className="text-xl text-gray-800 leading-relaxed mb-4">
							No, not the yummy kind! 😄 These are tiny files that help our website remember you, 
							like remembering what's in your shopping cart or your favorite colors!
						</p>
						<p className="text-lg text-gray-700 leading-relaxed">
							You can turn cookies off in your browser settings, but some parts of our website might not work as well. 
							It's like trying to play a video game without a controller!
						</p>
					</div>
				</section>

				{/* Your Rights */}
				<section className="bg-blue rounded-3xl shadow-xl p-8 mb-8">
					<div className="flex items-center gap-3 mb-6">
						<Eye size={40} className="text-teal-600" />
						<h2 className="text-3xl font-bold text-gray-900">Your Rights! 💪</h2>
					</div>
					
					<div className="bg-gradient-to-r from-teal-400 to-cyan-600 text-white rounded-2xl p-8">
						<p className="text-xl mb-6">You're the boss of your information! Here's what you can do:</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="bg-white/20 rounded-lg p-4">
								<h4 className="font-bold text-lg mb-2">👀 See Your Info</h4>
								<p>Ask us what information we have about you</p>
							</div>
							<div className="bg-white/20 rounded-lg p-4">
								<h4 className="font-bold text-lg mb-2">✏️ Update It</h4>
								<p>Change your information if it's wrong</p>
							</div>
							<div className="bg-white/20 rounded-lg p-4">
								<h4 className="font-bold text-lg mb-2">🗑️ Delete It</h4>
								<p>Ask us to remove your information</p>
							</div>
							<div className="bg-white/20 rounded-lg p-4">
								<h4 className="font-bold text-lg mb-2">🚫 Stop Emails</h4>
								<p>Unsubscribe from our newsletter anytime</p>
							</div>
						</div>
					</div>
				</section>

				{/* For Parents */}
				<section className="bg-gradient-to-r from-pink-400 to-rose-600 text-white rounded-3xl shadow-xl p-8 mb-8">
					<h2 className="text-3xl font-bold mb-4">📢 Special Note for Parents</h2>
					<p className="text-xl leading-relaxed mb-4">
						We take children's privacy very seriously! We do not knowingly collect information from children under 13 
						without parental consent.
					</p>
					<p className="text-lg leading-relaxed">
						If you're a parent and think your child has shared information with us, please contact us immediately at 
						<span className="font-bold"> privacy@hypewear.com</span>, and we'll delete it right away!
					</p>
				</section>

				{/* Changes to Policy */}
				<section className="bg-white rounded-3xl shadow-xl p-8 mb-8">
					<div className="flex items-center gap-3 mb-6">
						<Bell size={40} className="text-yellow-600" />
						<h2 className="text-3xl font-bold text-gray-900">Changes to This Policy 📢</h2>
					</div>
					
					<p className="text-lg text-gray-700 leading-relaxed">
						Sometimes we need to update this policy (like when we add cool new features!). 
						We'll let you know if anything important changes by posting it here and sending you an email. 
						Make sure to check back once in a while! 📅
					</p>
				</section>

				{/* Contact */}
				<section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-xl p-12 text-center">
					<h2 className="text-4xl font-bold mb-4">Questions? We're Here! 💬</h2>
					<p className="text-xl mb-6">
						If you have any questions about this privacy policy or how we handle your information, 
						we'd love to hear from you!
					</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<a href="mailto:privacy@hypewear.com" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition">
							📧 Email Us
						</a>
						<a href="/contact" className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition">
							💬 Contact Page
						</a>
					</div>
					<p className="text-sm mt-6 opacity-80">
						Email: privacy@hypewear.com | Phone: +94 77 838 1200
					</p>
				</section>

				{/* Trust Badge */}
				<div className="text-center mt-12">
					<div className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-8 py-4 rounded-full text-xl font-bold">
						<Shield size={32} />
						Your Privacy is Protected with HYPE WEAR ✅
					</div>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;
