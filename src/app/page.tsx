'use client';

import { useState } from 'react';
import ProductGrid from '@/components/Homepage/products/product-grid';
import useCart from '@/hooks/use-cart';
import { ProductProps } from '@/types/products';
import HorizontalFilterBar from '@/components/Homepage/products/horizontal-fllter-bar';
import HeroBanner from '@/components/Homepage/banners/hero-slider';
import { bannerData } from '@/data/mock-banner';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { noticeMessages } from '@/data/mock-notice';
import TopNoticeBanner from '@/components/Homepage/banners/quick-update-scroll';
import { useGetProductGrid, useGetProductCategory } from './api/request-hooks';

export default function ShopPage() {
	const { addToCart } = useCart();

	const [page, setPage] = useState(1);
	const [category, setCategory] = useState<string | undefined>('');

	const { data, isLoading, isError } = useGetProductGrid({
		page,
		category: category,
		limit: 9,
	});

	const { data: allCategories, isLoading: isLoadingCategories } = useGetProductCategory();

	const handleAddToCart = (product: ProductProps) => addToCart(product);

	return (
		<div className="min-h-screen pt-28">
			<div className="fixed top-0 left-0 right-0 z-50 bg-gold-deep">
				<TopNoticeBanner messages={noticeMessages} scrollSpeed={4} autoDismiss={false} />
				<Header />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
				<HeroBanner banners={bannerData} autoRotate rotateInterval={10000} />

				{!isLoadingCategories && allCategories && (
					<HorizontalFilterBar
						categories={[...allCategories]}
						selectedCategory={category}
						onCategoryChange={name => {
							setCategory(name);
							setPage(1);
						}}
						productCount={data?.pagination?.total}
					/>
				)}

				<ProductGrid
					products={data?.data || []}
					isLoading={isLoading}
					error={isError}
					onAddToCart={handleAddToCart}
					currentPage={data?.pagination?.currentPage || 1}
					totalPages={data?.pagination?.totalPages || 1}
					onPageChange={newPage => setPage(newPage)}
				/>
			</div>

			<Footer />
		</div>
	);
}
