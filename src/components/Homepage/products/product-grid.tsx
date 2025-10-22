'use client';

import React from 'react';
import ProductCard from './product-card';
import { ProductProps } from '@/types/products';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type ProductGridProps = {
	products?: ProductProps[];
	isLoading?: boolean;
	error?: unknown;
	onAddToCart?: (product: ProductProps) => void;
	currentPage?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
};

const ProductGrid: React.FC<ProductGridProps> = ({
	products = [],
	isLoading = false,
	error,
	onAddToCart,
	currentPage = 1,
	totalPages = 1,
	onPageChange,
}) => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="flex flex-col space-y-3">
						<Skeleton className="w-full h-64 rounded-lg" />
						<Skeleton className="w-3/4 h-6 rounded-md" />
						<Skeleton className="w-1/2 h-5 rounded-md" />
						<Skeleton className="w-1/3 h-5 rounded-md" />
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-500 text-lg font-medium">
					⚠️ Failed to load products. Please try again.
				</p>
				<Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
					Retry
				</Button>
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-400 text-lg">No products found matching your criteria.</p>
			</div>
		);
	}

	return (
		<div className="space-y-10">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{products?.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						onAddToCart={onAddToCart ?? (() => {})}
					/>
				))}
			</div>

			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-4 mt-10">
					<Button
						variant="outline"
						disabled={currentPage === 1}
						onClick={() => onPageChange?.(currentPage - 1)}
					>
						Previous
					</Button>

					<p className="text-gray-400">
						Page <span className="font-semibold">{currentPage}</span> of {totalPages}
					</p>

					<Button
						variant="outline"
						disabled={currentPage === totalPages}
						onClick={() => onPageChange?.(currentPage + 1)}
					>
						Next
					</Button>
				</div>
			)}
		</div>
	);
};

export default ProductGrid;
