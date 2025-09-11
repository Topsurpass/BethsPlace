// components/product/RelatedProducts.tsx
import Link from 'next/link';
import Image from 'next/image';
import { mockProducts } from '@/data/mock-products';
import { ProductProps } from '@/types/products';

interface RelatedProductsProps {
	currentProductId: string | number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId }) => {
	// Filter out the current product and get related products (by category in a real app)
	const relatedProducts = mockProducts
		.filter(product => product.id !== currentProductId)
		.slice(0, 4);

	if (relatedProducts.length === 0) return null;

	return (
		<div>
			<h3 className="text-2xl font-bold text-foreground mb-8">You Might Also Like</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{relatedProducts.map((product: ProductProps) => (
					<div
						key={product.id}
						className="group bg-card border rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
					>
						<Link href={`/${product.id}`}>
							<div className="h-60 relative overflow-hidden">
								<Image
									src={product.images[0]}
									alt={product.name}
									fill
									className="object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								{!product.inStock && (
									<div className="absolute inset-0 bg-black/50 bg-opacity-70 flex items-center justify-center">
										<span className="text-foreground font-bold text-sm bg-red-600 px-2 py-1 rounded">
											Out of Stock
										</span>
									</div>
								)}
							</div>
						</Link>

						<div className="p-4">
							<Link href={`/${product.id}`}>
								<h4 className="text-lg font-semibold text-foreground hover:text-gold-deep transition-colors duration-300 mb-2">
									{product.name}
								</h4>
							</Link>

							<div className="flex items-center justify-between">
								<span className="text-gold-deep font-bold">
									₦{product.price.toLocaleString()}
								</span>
								<div className="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 text-gold-deep"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
									<span className="text-gray-400 text-sm ml-1">
										{product.rating}
									</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RelatedProducts;
