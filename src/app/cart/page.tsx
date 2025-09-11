'use client';

import { useState } from 'react';
import useCart from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CartPage() {
	const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
	const [isCheckingOut, setIsCheckingOut] = useState(false);

	const handleCheckout = () => {
		setIsCheckingOut(true);
		// In a real app, this would integrate with a payment processor
		setTimeout(() => {
			alert('Order placed successfully!');
			clearCart();
			setIsCheckingOut(false);
		}, 2000);
	};

	if (items.length === 0) {
		return (
			<div className="min-h-screen pt-20">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center">
						<div className="mx-auto w-24 h-24 mb-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<h2 className="text-3xl font-bold text-foreground mb-4">
							Your cart is empty
						</h2>
						<p className="text-gray-400 mb-8">
							Looks like you haven't added any items to your cart yet.
						</p>
						<Link
							href="/"
							className="bg-gold-deep text-black font-bold py-3 px-8 rounded-lg hover:bg-gold-light transition-colors duration-300"
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-28">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Cart Items */}
					<div className="lg:col-span-2 ">
						<div className="rounded-lg p-6 bg-background border">
							<div className="border-b  pb-4 mb-6">
								<h2 className="text-xl font-semibold text-foreground">
									Cart Items ({items.length})
								</h2>
							</div>

							<div className="space-y-6">
								{items.map(item => (
									<div
										key={item.id}
										className="flex flex-col sm:flex-row gap-4 py-4 border-b  last:border-0"
									>
										<div className="relative w-full sm:w-24 h-24 rounded-md overflow-hidden">
											<Image
												src={item.images[0]}
												alt={item.name}
												fill
												className="object-cover"
											/>
										</div>

										<div className="flex-grow">
											<h3 className="text-lg font-medium text-foreground">
												{item.name}
											</h3>
											<p className="text-gold-deep font-bold mb-2">
												₦{item.price.toLocaleString()}
											</p>

											<div className="flex items-center justify-between">
												<div className="flex items-center gap-1">
													<Button
														onClick={() =>
															updateQuantity(
																item.id,
																item.quantity - 1,
															)
														}
														className="w-8 h-8 bg-foreground   text-background rounded-none flex items-center justify-center"
													>
														-
													</Button>
													<span className="w-10 h-8 bg-foreground   text-background text-center flex items-center justify-center">
														{item.quantity}
													</span>
													<Button
														onClick={() =>
															updateQuantity(
																item.id,
																item.quantity + 1,
															)
														}
														className="w-8 h-8 bg-foreground   text-background rounded-none flex items-center justify-center"
													>
														+
													</Button>
												</div>

												<Button
													onClick={() => removeFromCart(item.id)}
													className="text-red-500 hover:bg-red-500 hover:text-foreground transition-colors duration-300 bg-gray-200 cursor-pointer"
													size={'icon'}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
															clipRule="evenodd"
														/>
													</svg>
												</Button>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="mt-8 flex justify-between">
								<Link
									href="/"
									className="text-gold-deep hover:text-gold-light flex items-center transition-colors duration-300"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 mr-2"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
											clipRule="evenodd"
										/>
									</svg>
									Continue Shopping
								</Link>

								<button
									onClick={clearCart}
									className="text-gold-deep font-medium border-0 bg-transparent cursor-pointer transition-colors duration-300 hover:text-gold-light"
								>
									Clear Cart
								</button>
							</div>
						</div>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="bg-background border rounded-lg p-6 sticky top-24">
							<h2 className="text-xl font-semibold text-foreground mb-6">
								Order Summary
							</h2>

							<div className="space-y-4 mb-6">
								<div className="flex justify-between">
									<span className="text-gray-400">Subtotal</span>
									<span className="text-foreground">
										₦{getCartTotal().toLocaleString()}
									</span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-400">Shipping</span>
									<span className="text-foreground">₦2,500</span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-400">Tax</span>
									<span className="text-foreground">
										₦{(getCartTotal() * 0.075).toLocaleString()}
									</span>
								</div>

								<div className="border-t border-gray-800 pt-4 flex justify-between text-lg font-semibold">
									<span className="text-foreground">Total</span>
									<span className="text-gold-deep">
										₦
										{(
											getCartTotal() +
											2500 +
											getCartTotal() * 0.075
										).toLocaleString()}
									</span>
								</div>
							</div>

							<Button
								onClick={handleCheckout}
								disabled={isCheckingOut}
								className={`w-full py-3 rounded-lg font-bold text-lg transition-colors duration-300 ${
									isCheckingOut
										? 'bg-gray-700 text-gray-500 cursor-not-allowed'
										: 'bg-gold-deep text-black hover:bg-gold-light'
								}`}
							>
								{isCheckingOut ? (
									<div className="flex items-center justify-center">
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Processing...
									</div>
								) : (
									'Proceed to Checkout'
								)}
							</Button>

							<p className="text-gray-400 text-sm mt-4 text-center">
								Your personal data will be used to process your order, support your
								experience throughout this website, and for other purposes described
								in our privacy policy.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
