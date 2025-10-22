// app/order-success/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function OrderSuccessPage() {
	const searchParams = useSearchParams();
	const orderId =
		searchParams.get('orderId') || 'BP' + Math.random().toString(36).substr(2, 9).toUpperCase();

	const [orderDetails, setOrderDetails] = useState({
		id: orderId,
		estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
		items: 3, // This would come from the order data
		total: '₦89,500', // This would come from the order data
	});

	return (
		<div className="min-h-screen  pt-28 pb-12">
			<div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				{/* Success Icon */}
				<div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-12 w-12 text-white"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>

				{/* Success Message */}
				<h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
				<p className="text-gray-400 text-lg mb-8">
					Thank you for your purchase. Your order has been confirmed and is being
					processed.
				</p>

				{/* Order Details Card */}
				<div className=" rounded-2xl p-8 border border-gray-800 mb-8 text-left">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-gold font-bold mb-2">Order Number</h3>
							<p className="text-white text-lg">{orderDetails.id}</p>
						</div>
						<div>
							<h3 className="text-gold font-bold mb-2">Estimated Delivery</h3>
							<p className="text-white text-lg">{orderDetails.estimatedDelivery}</p>
						</div>
						<div>
							<h3 className="text-gold font-bold mb-2">Items</h3>
							<p className="text-white text-lg">{orderDetails.items} items</p>
						</div>
						<div>
							<h3 className="text-gold font-bold mb-2">Total Amount</h3>
							<p className="text-white text-lg">{orderDetails.total}</p>
						</div>
					</div>
				</div>

				{/* Next Steps */}
				<div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
					<h3 className="text-white font-bold mb-4 text-lg">What's Next?</h3>
					<div className="space-y-4 text-gray-400">
						<div className="flex items-start space-x-3">
							<div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
								<span className="text-black text-sm font-bold">1</span>
							</div>
							<p>You'll receive an order confirmation email shortly</p>
						</div>
						<div className="flex items-start space-x-3">
							<div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
								<span className="text-black text-sm font-bold">2</span>
							</div>
							<p>We'll notify you when your order ships with tracking information</p>
						</div>
						<div className="flex items-start space-x-3">
							<div className="w-6 h-6 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
								<span className="text-black text-sm font-bold">3</span>
							</div>
							<p>Your handmade bags will arrive in 2-4 business days</p>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/shop"
						className="bg-gold text-black font-bold py-3 px-8 rounded-lg hover:bg-gold-light transition-colors duration-300"
					>
						Continue Shopping
					</Link>
					<Link
						href="/account/orders"
						className="border-2 border-gold text-gold font-bold py-3 px-8 rounded-lg hover:bg-gold hover:bg-opacity-10 transition-colors duration-300"
					>
						View Order Details
					</Link>
				</div>
			</div>
		</div>
	);
}
