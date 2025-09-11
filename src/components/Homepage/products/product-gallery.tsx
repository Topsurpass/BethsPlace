import Image from 'next/image';

interface ProductGalleryProps {
	images: string[];
	selectedImage: number;
	onSelectImage: (index: number) => void;
	productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
	images,
	selectedImage,
	onSelectImage,
	productName,
}) => {
	return (
		<div>
			{/* Main Image */}
			<div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-4">
				<Image
					src={images[selectedImage]}
					alt={`${productName} - View ${selectedImage + 1}`}
					fill
					className="object-cover"
				/>
			</div>

			{/* Thumbnails */}
			<div className="grid grid-cols-4 gap-4">
				{images.map((image, index) => (
					<button
						key={index}
						className={`relative h-24 rounded-md overflow-hidden ${
							selectedImage === index
								? 'ring-2 ring-gold-deep'
								: 'opacity-70 hover:opacity-100'
						}`}
						onClick={() => onSelectImage(index)}
					>
						<Image
							src={image}
							alt={`${productName} thumbnail ${index + 1}`}
							fill
							className="object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	);
};

export default ProductGallery;
