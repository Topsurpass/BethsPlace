'use client';

import { useState } from 'react';
import useCart from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddressForm, AddressInputs } from './address-form';

interface Address {
	id: string;
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	isDefault: boolean;
}

export default function CheckoutPage() {
	const { items, getCartTotal, clearCart } = useCart();
	const [isProcessing, setIsProcessing] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState<string>('');
	const [addresses, setAddresses] = useState<Address[]>([
		{
			id: '1',
			street: '123 Fashion Street',
			city: 'Lagos',
			state: 'Lagos',
			postalCode: '100001',
			country: 'Nigeria',
			isDefault: true,
		},
	]);

	// ✅ handle address submission from AddressForm
	const handleSaveAddress = (data: AddressInputs) => {
		const newAddress: Address = {
			id: Date.now().toString(),
			...data,
			isDefault: data.isDefault ?? false,
		};

		setAddresses(prev => [...prev, newAddress]);
		setSelectedAddress(newAddress.id);
		setShowAddressForm(false);
	};

	const handleCheckout = async () => {
		if (!selectedAddress) {
			alert('Please select a delivery address');
			return;
		}

		setIsProcessing(true);
		setTimeout(() => {
			alert('Order placed successfully!');
			clearCart();
			setIsProcessing(false);
		}, 3000);
	};

	const shippingFee = 2500;
	const taxRate = 0.075;
	const taxAmount = getCartTotal() * taxRate;
	const totalAmount = getCartTotal() + shippingFee + taxAmount;
	const fallbackImage = '/placeholder.svg';

	if (items.length === 0) {
		return (
			<div className="min-h-screen pt-28 bg-gradient-to-b from-background to-muted/20">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
					<h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
						No items to checkout
					</h2>
					<p className="text-muted-foreground mb-8">
						Your cart is empty. Add some beautiful handbags to proceed.
					</p>
					<Link
						href="/"
						className="bg-gold-deep text-black font-bold py-3 px-8 rounded-lg hover:bg-gold-light transition-all duration-300 transform hover:scale-105"
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen pt-28 bg-gradient-to-b from-background to-muted/20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-foreground mb-4">Checkout</h1>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Left Column - Address + Payment */}
					<div className="space-y-8">
						<Card className="border-0 shadow-lg">
							<CardHeader className="bg-muted/30">
								<CardTitle className="flex items-center text-xl">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5 mr-2 text-gold-deep"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
											clipRule="evenodd"
										/>
									</svg>
									Delivery Address
								</CardTitle>
							</CardHeader>

							<CardContent className="pt-6">
								{/* Existing addresses */}
								{addresses.length > 0 && !showAddressForm && (
									<RadioGroup
										value={selectedAddress}
										onValueChange={setSelectedAddress}
										className="space-y-4"
									>
										{addresses.map(address => (
											<div
												key={address.id}
												className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
													selectedAddress === address.id
														? 'border-gold-deep bg-gold-deep/5'
														: 'border-muted hover:border-gold-deep/50'
												}`}
											>
												<RadioGroupItem
													value={address.id}
													id={address.id}
												/>
												<Label
													htmlFor={address.id}
													className="flex-1 cursor-pointer"
												>
													<div className="flex justify-between items-start">
														<div>
															<p className="text-muted-foreground">
																{address.street}, {address.city},{' '}
																{address.state} {address.postalCode}
															</p>
															<p className="text-muted-foreground">
																{address.country}
															</p>
														</div>
														{address.isDefault && (
															<span className="bg-gold-deep text-black text-xs px-2 py-1 rounded-full">
																Default
															</span>
														)}
													</div>
												</Label>
											</div>
										))}
									</RadioGroup>
								)}

								{showAddressForm ? (
									<div className="">
										<AddressForm
											isLoading={isProcessing}
											isError={false}
											onSaveAddress={handleSaveAddress}
										/>

										<div className="flex px-6">
											<Button
												type="button"
												variant="outline"
												onClick={() => setShowAddressForm(false)}
												className="border-gold-deep text-gold-deep hover:bg-gold-deep hover:text-black w-full"
											>
												Cancel
											</Button>
										</div>
									</div>
								) : (
									<Button
										variant="outline"
										onClick={() => setShowAddressForm(true)}
										className="w-full mt-4 border-gold-deep text-gold-deep hover:bg-gold-deep hover:text-black"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4 mr-2"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
												clipRule="evenodd"
											/>
										</svg>
										Add New Address
									</Button>
								)}
							</CardContent>
						</Card>
					</div>

					{/* Right Column - Order Summary */}
					<div className="space-y-6">
						<Card className="border-0 shadow-lg sticky top-32">
							<CardHeader className="bg-muted/30">
								<CardTitle className="text-xl">Order Summary</CardTitle>
							</CardHeader>
							<CardContent className="pt-6">
								{/* Items */}
								<div className="space-y-4 mb-6">
									{items.map((item: any) => (
										<div
											key={item.productId}
											className="flex items-center space-x-4"
										>
											<div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
												<Image
													src={
														!imageError && item?.images?.length
															? item?.images?.[0].url
															: fallbackImage
													}
													alt={item.name}
													fill
													className="object-cover"
													onError={() => setImageError(true)}
												/>
												<div className="absolute -top-1 -right-1 bg-gold-deep text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
													{item.quantity}
												</div>
											</div>
											<div className="flex-1">
												<h4 className="font-medium text-foreground line-clamp-1">
													{item.name}
												</h4>
												<p className="text-gold-deep font-semibold">
													₦{item.price.toLocaleString()}
												</p>
											</div>
										</div>
									))}
								</div>

								{/* Pricing */}
								<div className="space-y-3 border-t border-muted pt-4">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Subtotal</span>
										<span>₦{getCartTotal().toLocaleString()}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Shipping</span>
										<span>₦{shippingFee.toLocaleString()}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">Tax (7.5%)</span>
										<span>₦{taxAmount.toLocaleString()}</span>
									</div>
									<div className="flex justify-between font-bold text-lg border-t border-muted pt-4">
										<span>Total</span>
										<span className="text-gold-deep">
											₦{totalAmount.toLocaleString()}
										</span>
									</div>
								</div>

								{/* Checkout Button */}
								<Button
									onClick={handleCheckout}
									disabled={isProcessing || !selectedAddress}
									className={`w-full mt-6 py-3 text-lg font-bold transition-all ${
										isProcessing || !selectedAddress
											? 'bg-muted text-muted-foreground cursor-not-allowed'
											: 'bg-gold-deep hover:bg-gold-light text-black hover:scale-105'
									}`}
								>
									{isProcessing
										? 'Processing Your Order...'
										: `Place Order - ₦${totalAmount.toLocaleString()}`}
								</Button>

								<Link
									href="/cart"
									className="inline-flex items-center justify-center w-full mt-3 text-gold-deep hover:text-gold-light transition-colors"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 mr-2"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
											clipRule="evenodd"
										/>
									</svg>
									Return to Cart
								</Link>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
