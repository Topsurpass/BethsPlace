'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import useCart from '@/hooks/use-cart';
import ProductGallery from '@/components/Homepage/products/product-gallery';
import ProductInfo from '@/components/Homepage/products/product-info';
import ProductReviews from '@/components/Homepage/products/product-review';
import { useGetSingleProduct } from '@/app/api/request-hooks';
import { Button } from '@/components/ui/button';

export default function ProductDetailPage() {
	const params = useParams();
	const slug = params.slug as string;

	const [product, setProduct] = useState<any>(null);
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>(
		'description',
	);

	const { addToCart } = useCart();

	const { data, isLoading, isError, error, refetch } = useGetSingleProduct(slug);

	useEffect(() => {
		if (data) {
			const normalizedProduct = {
				...data,
				images: data.images?.map((img: any) => img.url) || [],
				features: data.features?.map((f: any) => f.feature) || [],
				tags: data.tags?.map((t: any) => t.tag) || [],
				category: data.category?.name || 'Uncategorized',
				reviews:
					data.reviews?.map((r: any) => ({
						id: r.id,
						comment: r.comment,
						rating: r.rating,
						user: r.user
							? {
									name: `${r.user.firstName ?? ''} ${r.user.lastName ?? ''}`.trim(),
									avatar: r.user.avatar ?? null,
								}
							: { name: 'Anonymous', avatar: null },
					})) || [],
			};
			setProduct(normalizedProduct);
		}
	}, [data]);

	const handleAddToCart = () => {
		if (product) {
			for (let i = 0; i < quantity; i++) {
				addToCart(product);
			}
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen bg-background pt-28">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
					<div className="h-8 w-40 bg-gray-800 rounded mb-6"></div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						<div className="space-y-2">
							<div className="h-[250px] md:h-[500px] bg-gray-800 rounded-lg"></div>
							<div className="h-18 w-18 md:h-28 md:w-40 bg-gray-800 rounded mb-6"></div>
						</div>
						<div className="space-y-6">
							<div className="h-6 w-2/3 bg-gray-800 rounded"></div>
							<div className="h-4 w-1/2 bg-gray-800 rounded"></div>
							<div className="h-4 w-3/4 bg-gray-800 rounded"></div>
							<div className="h-12 w-32 bg-gold/20 rounded mt-4"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
				<p className="text-red-500 text-lg font-semibold mb-2">
					Failed to load product details
				</p>
				<p className="text-gray-400 mb-4">
					{(error as any)?.message || 'Something went wrong. Please try again.'}
				</p>
				<Button onClick={() => refetch()}>Retry</Button>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-400">
				Product not found.
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background pt-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
					<ProductGallery
						images={product.images}
						selectedImage={selectedImage}
						onSelectImage={setSelectedImage}
						productName={product.name}
					/>

					<ProductInfo
						product={product}
						quantity={quantity}
						onQuantityChange={setQuantity}
						onAddToCart={handleAddToCart}
					/>
				</div>

				<div className="border-b mb-8">
					<nav className="flex space-x-8">
						{['description', 'features', 'reviews'].map(tab => (
							<button
								key={tab}
								className={`py-4 px-1 text-sm font-medium border-b-2 ${
									activeTab === tab
										? 'border-gold-deep text-gold-deep'
										: 'border-transparent text-foreground hover:text-gray-600'
								}`}
								onClick={() => setActiveTab(tab as typeof activeTab)}
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)}
							</button>
						))}
					</nav>
				</div>

				<div className="mb-16">
					{activeTab === 'description' && (
						<section>
							<h3 className="text-2xl font-bold text-foreground mb-4">
								Product Description
							</h3>
							<p className="text-foreground leading-relaxed">{product.description}</p>
						</section>
					)}

					{activeTab === 'features' && (
						<section>
							<h3 className="text-2xl font-bold text-foreground mb-4">
								Features & Details
							</h3>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{product.features.length > 0 ? (
									product.features.map((feature: string, index: number) => (
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
									))
								) : (
									<p className="text-gray-400">No features listed.</p>
								)}
							</ul>
						</section>
					)}

					{activeTab === 'reviews' && <ProductReviews product={product} />}
				</div>
			</div>
		</div>
	);
}
