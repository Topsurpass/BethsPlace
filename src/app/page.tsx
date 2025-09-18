'use client';

import { useState, useEffect } from 'react';
import ProductGrid from '@/components/Homepage/products/product-grid';
import useCart from '@/hooks/use-cart';
import { mockProducts } from '@/data/mock-products';
import { ProductProps } from '@/types/products';
import HorizontalFilterBar from '@/components/Homepage/products/horizontal-fllter-bar';
import HeroBanner from '@/components/Homepage/banners/hero-slider';
import { bannerData } from '@/data/mock-banner';
import { PushNotificationManager } from '@/components/pwa/push-notification';
import { InstallPrompt } from '@/components/pwa/ios-install-prompt';

const categories = [
	{ id: 'all', name: 'All Bags' },
	{ id: 'evening', name: 'Evening Bags' },
	{ id: 'everyday', name: 'Everyday Bags' },
	{ id: 'casual', name: 'Casual Bags' },
	{ id: 'professional', name: 'Professional Bags' },
];

export default function ShopPage() {
	const [products, ] = useState(mockProducts);
	const [filteredProducts, setFilteredProducts] = useState(mockProducts);
	const [selectedCategory, setSelectedCategory] = useState<string | number>('all');
	const [sortOption, setSortOption] = useState('featured');
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
	const { addToCart } = useCart();

	useEffect(() => {
		let filtered = products;

		if (selectedCategory !== 'all') {
			filtered = filtered.filter(product => product.category === selectedCategory);
		}

		filtered = filtered.filter(
			product => product.price >= priceRange[0] && product.price <= priceRange[1],
		);

		switch (sortOption) {
			case 'price-low':
				filtered = [...filtered].sort((a, b) => a.price - b.price);
				break;
			case 'price-high':
				filtered = [...filtered].sort((a, b) => b.price - a.price);
				break;
			case 'rating':
				filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
				break;
			default:
				break;
		}

		setFilteredProducts(filtered);
	}, [selectedCategory, sortOption, priceRange, products]);

	const handleAddToCart = (product: ProductProps) => {
		addToCart(product);
	};

	return (
		<div className="min-h-screen pt-28">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				<div className="">
					<HeroBanner banners={bannerData} autoRotate={true} rotateInterval={10000} />
				</div>

				<HorizontalFilterBar
					categories={categories}
					selectedCategory={selectedCategory}
					onCategoryChange={setSelectedCategory}
					priceRange={priceRange}
					onPriceRangeChange={setPriceRange}
					maxPrice={50000}
					sortOption={sortOption}
					onSortChange={setSortOption}
				/>

				<div className="flex justify-between items-center mb-8">
					<p className="text-gray-400">
						Showing {filteredProducts.length} of {products.length} products
					</p>
				</div>

				<ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
			</div>
			<PushNotificationManager />
			<InstallPrompt />
		</div>
	);
}
