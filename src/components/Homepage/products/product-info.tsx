import { ProductProps } from '@/types/products';
import { Button } from '@/components/ui/button';

interface ProductInfoProps {
	product: ProductProps;
	quantity: number;
	onQuantityChange: (quantity: number) => void;
	onAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
	product,
	quantity,
	onQuantityChange,
	onAddToCart,
}) => {
	const hasDiscount = product.originalPrice && product.originalPrice > product.price;

	return (
		<div>
			<h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>

			<div className="flex items-center mb-6">
				<div className="flex text-gold-deep">
					{[...Array(5)].map((_, i) => (
						<svg
							key={i}
							xmlns="http://www.w3.org/2000/svg"
							className={`h-5 w-5 ${i < Math.floor(Number(product.rating)) ? 'fill-current' : 'stroke-current'}`}
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
							/>
						</svg>
					))}
				</div>
				<span className="text-gray-400 ml-2">
					{product.rating} ({product.reviewCount} reviews)
				</span>
			</div>

			<div className="mb-6">
				<div className="flex items-center">
					<span className="text-2xl font-bold text-gold-deep">
						₦{product.price.toLocaleString()}
					</span>
					{hasDiscount && (
						<span className="text-lg text-gray-500 line-through ml-3">
							₦{product.originalPrice!.toLocaleString()}
						</span>
					)}
				</div>
				{hasDiscount && (
					<div className="text-green-500 text-sm mt-1">
						Save ₦{(product.originalPrice! - product.price).toLocaleString()} (
						{Math.round(
							((product.originalPrice! - product.price) / product.originalPrice!) *
								100,
						)}
						%)
					</div>
				)}
			</div>

			<p className="text-gray-300 mb-8">{product.description}</p>

			<div className="mb-8">
				<label htmlFor="quantity" className="block text-gray-400 mb-2">
					Quantity
				</label>
				<div className="flex items-center">
					<Button
						onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
						className="bg-foreground text-background w-10 h-10 rounded-l-md flex items-center justify-center rounded-none"
						label="-"
					/>
					<input
						type="number"
						id="quantity"
						min="1"
						value={quantity}
						onChange={e => onQuantityChange(parseInt(e.target.value) || 1)}
						className="bg-foreground text-background w-16 h-10 text-center border-l border-r border-gray-700"
					/>
					<Button
						onClick={() => onQuantityChange(quantity + 1)}
						className="bg-foreground text-background w-10 h-10 rounded-r-md flex items-center justify-center rounded-none"
						label="+"
					/>
				</div>
			</div>

			<Button
				onClick={onAddToCart}
				disabled={!product.inStock}
				className={`w-full py-4 rounded-lg font-bold text-lg transition-colors duration-300 mb-4 ${
					product.inStock
						? 'bg-gold-deep text-black hover:bg-gold-light'
						: 'bg-gray-700 text-gray-500 cursor-not-allowed'
				}`}
				label={product.inStock ? 'Add to Cart' : 'Out of Stock'}
			/>

			{/* <Button
				className="w-full py-4 border-2 bg-gray border-gold-deep text-gold-deep rounded-lg font-bold text-lg hover:bg-gold hover:bg-opacity-10 transition-colors duration-300"
				label="Buy Now"
				disabled={!product.inStock}
			/> */}

			{product.tags && product.tags.length > 0 && (
				<div className="mt-8">
					<span className="text-gray-400 mr-2">Tags:</span>
					{product.tags.map((tag, index) => (
						<span
							key={index}
							className="inline-block bg-gray-800 text-gold-deep text-sm px-3 py-1 rounded-full mr-2 mb-2"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductInfo;
