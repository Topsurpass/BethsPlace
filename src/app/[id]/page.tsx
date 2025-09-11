'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useCart from '@/hooks/use-cart';
import ProductGallery from '@/components/Homepage/products/product-gallery';
import ProductInfo from '@/components/Homepage/products/product-info';
import ProductReviews from '@/components/Homepage/products/product-review';
import RelatedProducts from '@/components/Homepage/products/related-products';
import { mockProducts } from '@/data/mock-products';
import Link from 'next/link';

export default function ProductDetailPage() {
	const params = useParams();
	const productId = params.id;
	const [product, setProduct] = useState<(typeof mockProducts)[number] | null>(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState('description');
	const { addToCart } = useCart();

	useEffect(() => {
		// In a real app, you would fetch product data from an API
		const foundProduct = mockProducts.find(p => p.id.toString() === productId);
		// convert undefined to null to match the state type
		setProduct(foundProduct ?? null);
	}, [productId]);

	const handleAddToCart = () => {
		if (product) {
			// Add the product to cart with the selected quantity
			for (let i = 0; i < quantity; i++) {
				addToCart(product);
			}
			// Show success message (you could use a toast notification here)
			// alert(`${quantity} ${product.name}(s) added to cart!`);
		}
	};

	if (!product) {
		return (
			<div className="min-h-screen bg-background pt-20 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
					<p className="text-gray-400 mt-4">Loading product...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pt-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Breadcrumb */}
				<nav className="text-sm text-gray-400 mb-8">
					<ol className="flex space-x-2">
						<li>
							<Link href="/" className="hover:text-gold transition-colors">
								Home
							</Link>
						</li>
						<li className="before:content-['/'] before:mx-2">
							<span className="text-gold-deep">{product.name}</span>
						</li>
					</ol>
				</nav>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
					{/* Product Gallery */}
					<ProductGallery
						images={product.images}
						selectedImage={selectedImage}
						onSelectImage={setSelectedImage}
						productName={product.name}
					/>

					{/* Product Info */}
					<ProductInfo
						product={product}
						quantity={quantity}
						onQuantityChange={setQuantity}
						onAddToCart={handleAddToCart}
					/>
				</div>

				{/* Product Tabs */}
				<div className="border-b  mb-8">
					<nav className="flex space-x-8">
						{['description', 'features', 'reviews'].map(tab => (
							<button
								key={tab}
								className={`py-4 px-1 text-sm font-medium border-b-2 ${
									activeTab === tab
										? 'border-gold-deep text-gold-deep'
										: 'border-transparent text-foreground hover:text-gray-600'
								}`}
								onClick={() => setActiveTab(tab)}
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</button>
						))}
					</nav>
				</div>

				{/* Tab Content */}
				<div className="mb-16">
					{activeTab === 'description' && (
						<div>
							<h3 className="text-2xl font-bold text-foreground mb-4">
								Product Description
							</h3>
							<p className="text-foreground leading-relaxed">{product.description}</p>
						</div>
					)}

					{activeTab === 'features' && (
						<div>
							<h3 className="text-2xl font-bold text-foreground mb-4">
								Features & Details
							</h3>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{product.features.map((feature, index) => (
									<li key={index} className="flex items-start">
										<svg
											className="h-5 w-5 text-gold-deep mt-0.5 mr-3 flex-shrink-0"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										<span className="text-gray-300">{feature}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{activeTab === 'reviews' && <ProductReviews product={product} />}
				</div>

				{/* Related Products */}
				<RelatedProducts currentProductId={product.id} />
			</div>
		</div>
	);
}
