import React from 'react';
import ProductCard from './product-card';
import { ProductProps } from '@/types/products';

type ProductGridProps = {
	products: ProductProps[];
	onAddToCart?: (product: ProductProps) => void;
};



const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
	if (!products || products.length === 0) {
		return (
			<div className="text-center py-12">
				<p className="text-gray-400 text-lg">No products found matching your criteria.</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{products.map(product => (
				<ProductCard
					key={product.id}
					product={product}
					onAddToCart={onAddToCart ?? ((product: ProductProps) => {})}
				/>
			))}
		</div>
	);
};

export default ProductGrid;
