// components/product/ProductReviews.tsx
import { useState } from 'react';
import { ProductProps } from '@/types/products';
import { mockReviews } from '@/data/mock-reviews';
import { Button } from '@/components/ui/button';

interface Review {
	id: number;
	user: string;
	rating: number;
	comment: string;
	date: string;
}

interface ProductReviewsProps {
	product: ProductProps;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
	const [reviews, setReviews] = useState<Review[]>(mockReviews);

	const [newReview, setNewReview] = useState({
		rating: 5,
		comment: '',
		user: '',
	});

	const handleSubmitReview = (e: React.FormEvent) => {
		e.preventDefault();
		const review: Review = {
			id: reviews.length + 1,
			user: newReview.user || 'Anonymous',
			rating: newReview.rating,
			comment: newReview.comment,
			date: new Date().toISOString().split('T')[0],
		};

		setReviews([...reviews, review]);
		setNewReview({ rating: 5, comment: '', user: '' });
	};

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
				{/* Review Summary */}
				<div className="bg-background border p-6 rounded-lg">
					<h4 className="text-xl font-bold text-foreground mb-4">Customer Reviews</h4>
					<div className="flex items-center mb-4">
						<div className="text-4xl font-bold text-gold-deep mr-4">
							{product.rating}
						</div>
						<div>
							<div className="flex text-gold-deep mb-1">
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
							<p className="text-gray-400 text-sm">
								Based on {product.reviewCount} reviews
							</p>
						</div>
					</div>
				</div>

				{/* Add Review Form */}
				<div className="bg-background border p-6 rounded-lg">
					<h4 className="text-xl font-bold text-foreground mb-4">Add Your Review</h4>
					<form onSubmit={handleSubmitReview}>
						<div className="mb-4">
							<label className="block text-gray-400 mb-2">Your Rating</label>
							<div className="flex">
								{[1, 2, 3, 4, 5].map(star => (
									<button
										key={star}
										type="button"
										onClick={() => setNewReview({ ...newReview, rating: star })}
										className="text-gold-deep focus:outline-none"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className={`h-6 w-6 ${star <= newReview.rating ? 'fill-current' : 'stroke-current'}`}
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
											/>
										</svg>
									</button>
								))}
							</div>
						</div>
						<div className="mb-4">
							<label htmlFor="name" className="block text-gray-400 mb-2">
								Your Name (optional)
							</label>
							<input
								type="text"
								id="name"
								value={newReview.user}
								onChange={e => setNewReview({ ...newReview, user: e.target.value })}
								className="w-full bg-foreground border border-gray-700 rounded-lg px-4 py-2 text-background focus:ring-gold-deep focus:border-gold-deep"
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="comment" className="block text-gray-400 mb-2">
								Your Review
							</label>
							<textarea
								id="comment"
								rows={4}
								value={newReview.comment}
								onChange={e =>
									setNewReview({ ...newReview, comment: e.target.value })
								}
								className="w-full bg-foreground border border-gray-700 rounded-lg px-4 py-2 text-background focus:ring-gold-deep focus:border-gold-deep"
								required
							></textarea>
						</div>
						<Button
							type="submit"
							className="bg-gold-deep text-black hover:bg-gold-deep-light transition-colors"
						>
							Submit Review
						</Button>
					</form>
				</div>
			</div>

			{/* Reviews List */}
			<div>
				<h4 className="text-xl font-bold text-foreground mb-6">Customer Reviews</h4>
				{reviews.length === 0 ? (
					<p className="text-gray-400">
						No reviews yet. Be the first to review this product!
					</p>
				) : (
					<div className="space-y-6">
						{reviews.map(review => (
							<div key={review.id} className="bg-background border p-6 rounded-lg">
								<div className="flex justify-between items-start mb-2">
									<h5 className="font-bold text-foreground">{review.user}</h5>
									<span className="text-foreground text-sm">{review.date}</span>
								</div>
								<div className="flex text-gold-deep mb-3">
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											xmlns="http://www.w3.org/2000/svg"
											className={`h-5 w-5 ${i < review.rating ? 'fill-current' : 'stroke-current'}`}
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
								<p className="text-foreground">{review.comment}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductReviews;
