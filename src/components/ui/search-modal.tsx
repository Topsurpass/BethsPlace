'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockProducts } from '@/data/mock-products';
import { ProductProps } from '@/types/products';

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<ProductProps[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	useEffect(() => {
		if (!query.trim()) {
			setResults([]);
			return;
		}

		setIsLoading(true);

		// Simulate API call delay
		const timer = setTimeout(() => {
			const filteredProducts = mockProducts.filter(
				product =>
					product.name.toLowerCase().includes(query.toLowerCase()) ||
					product.description.toLowerCase().includes(query.toLowerCase()) ||
					product.category.toLowerCase().includes(query.toLowerCase()),
			);

			setResults(filteredProducts);
			setIsLoading(false);
		}, 300);

		return () => clearTimeout(timer);
	}, [query]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-opacity-70 transition-opacity"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="flex items-start justify-center min-h-screen pt-20 px-4">
				<div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
					{/* Search input */}
					<div className="relative p-4 border-b border-gray-800">
						<input
							ref={inputRef}
							type="text"
							placeholder="Search products..."
							value={query}
							onChange={e => setQuery(e.target.value)}
							className="w-full px-4 py-3 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
						/>
						<button
							onClick={onClose}
							className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					{/* Results */}
					<div className="max-h-96 overflow-y-auto">
						{isLoading ? (
							<div className="p-8 text-center">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-deep mx-auto"></div>
								<p className="text-gray-400 mt-2">Searching...</p>
							</div>
						) : results.length > 0 ? (
							<div className="divide-y divide-gray-800">
								{results.map(product => (
									<Link
										key={product.id}
										href={`/${product.id}`}
										onClick={onClose}
										className="flex items-center p-4 hover:bg-gray-800 transition-colors duration-200"
									>
										<div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
											<Image
												src={product.images[0]}
												alt={product.name}
												fill
												className="object-cover"
											/>
										</div>
										<div className="ml-4 flex-1 min-w-0">
											<h3 className="text-white font-medium truncate">
												{product.name}
											</h3>
											<p className="text-gold-deep font-bold">
												₦{product.price.toLocaleString()}
											</p>
											<p className="text-gray-400 text-sm truncate">
												{product.category}
											</p>
										</div>
									</Link>
								))}
							</div>
						) : query ? (
							<div className="p-8 text-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-12 w-12 text-gray-600 mx-auto"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
									/>
								</svg>
								<p className="text-gray-400 mt-2">
									No products found for {query}
								</p>
							</div>
						) : (
							<div className="p-8 text-center">
								<p className="text-gray-400">Type to search for products</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchModal;
