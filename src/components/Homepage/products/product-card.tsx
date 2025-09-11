import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { ProductProps } from '@/types/products';

type ProductCardProps = {
	product: ProductProps;
	onAddToCart: (product: ProductProps) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
	const [imageError, setImageError] = useState(false);
	const hasDiscount =
		typeof product.originalPrice === 'number' && product.originalPrice > product.price;

	// Fallback image in case the product image fails to load
	const fallbackImage =
		'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

	return (
		<div className="group bg-card border rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
			<Link href={`/${product.id}`}>
				<div className="h-80 relative overflow-hidden">
					<Image
						src={imageError ? fallbackImage : product.images[0]}
						alt={product.name}
						fill
						className="object-cover group-hover:scale-110 transition-transform duration-500"
						onError={() => setImageError(true)}
					/>
					{!product.inStock && (
						<div className="absolute inset-0 bg-black/80 bg-opacity-70 flex items-center justify-center">
							<span className="text-foreground font-bold text-lg bg-red-600 px-4 py-2 rounded">
								Out of Stock
							</span>
						</div>
					)}
					{product.tags && product.tags.includes('new') && (
						<div className="absolute top-4 left-4 bg-gold-deep text-black text-xs font-bold px-3 py-1 rounded border dark:border-black">
							NEW
						</div>
					)}
				</div>
			</Link>

			<div className="p-6">
				<div className="flex justify-between items-start mb-2">
					<Link href={`/${product.id}`}>
						<h3 className="text-xl font-semibold text-foreground hover:text-gold-deep transition-colors duration-300">
							{product.name}
						</h3>
					</Link>
					<div className="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4 text-gold-deep"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<span className="text-gray-400 text-sm ml-1">{product.rating}</span>
					</div>
				</div>

				<div className="flex items-center mb-4">
					<span className="text-gold-deep text-lg font-bold">
						₦{product.price.toLocaleString()}
					</span>
					{hasDiscount && (
						<span className="text-gray-500 text-sm line-through ml-2">
							₦{(product.originalPrice as number).toLocaleString()}
						</span>
					)}
				</div>

				<Button
					onClick={() => onAddToCart(product)}
					disabled={!product.inStock}
					className={`w-full py-3 rounded-lg font-bold transition-colors duration-300 ${
						product.inStock
							? 'bg-gold-deep text-foreground hover:bg-gold-light'
							: 'bg-gray-700 text-gray-500 cursor-not-allowed'
					}`}
					label={product.inStock ? 'Add to Cart' : 'Out of Stock'}
				/>
			</div>
		</div>
	);
};

export default ProductCard;
