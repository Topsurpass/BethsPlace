'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
	images: string[];
	selectedImage: number;
	onSelectImage: (index: number) => void;
	productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
	images = [],
	selectedImage,
	onSelectImage,
	productName,
}) => {
	const hasImages = Array.isArray(images) && images.length > 0;

	const [mainImageError, setMainImageError] = useState(false);
	const [thumbErrors, setThumbErrors] = useState<Record<number, boolean>>({});

	const handleThumbError = (index: number) => {
		setThumbErrors(prev => ({ ...prev, [index]: true }));
	};

	const mainImage =
		hasImages && !mainImageError && images[selectedImage]
			? images[selectedImage]
			: '/placeholder.svg';

	return (
		<div>
			<div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-4 bg-gray-900">
				<Image
					src={mainImage}
					alt={`${productName} - View ${selectedImage + 1}`}
					fill
					className="object-cover"
					onError={() => setMainImageError(true)}
					sizes="(max-width: 768px) 100vw, 50vw"
					priority
				/>
			</div>

			<div className="grid grid-cols-4 gap-4">
				{hasImages ? (
					images.map((image, index) => {
						const thumbnailSrc =
							thumbErrors[index] || !image ? '/placeholder.svg' : image;

						return (
							<button
								key={index}
								className={`relative h-24 rounded-md overflow-hidden transition-all ${
									selectedImage === index
										? 'ring-2 ring-gold-deep opacity-100'
										: 'opacity-70 hover:opacity-100'
								}`}
								onClick={() => onSelectImage(index)}
							>
								<Image
									src={thumbnailSrc}
									alt={`${productName} thumbnail ${index + 1}`}
									fill
									className="object-cover"
									sizes="100px"
									onError={() => handleThumbError(index)}
								/>
							</button>
						);
					})
				) : (
					<div className="col-span-4 flex items-center justify-center text-gray-400 border border-gray-700 rounded-md py-8">
						No images available
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductGallery;
