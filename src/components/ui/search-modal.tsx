'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetProductGrid } from '@/app/api/request-hooks';
import { ProductProps } from '@/types/products';
import { formatCurrency } from '@/lib/helpers';

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedSearch(search), 500);
		return () => clearTimeout(timeout);
	}, [search]);

	const { data, isLoading } = useGetProductGrid({
		search: debouncedSearch,
	});

	const products: ProductProps[] = data?.data || [];

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50">
			<div
				className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
				onClick={onClose}
			/>

			<div className="flex items-start justify-center min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
				<div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
					<div className="p-6 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
								Search Products
							</h2>
							<button
								onClick={onClose}
								className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 group"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200"
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

						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<svg
									className="h-5 w-5 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<input
								ref={inputRef}
								type="text"
								placeholder="Search for products, categories..."
								value={search}
								onChange={e => setSearch(e.target.value)}
								className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
							/>
							{search && (
								<button
									onClick={() => setSearch('')}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
								>
									<svg
										className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							)}
						</div>
					</div>

					<div className="max-h-96 overflow-y-auto">
						{isLoading ? (
							<div className="p-8 text-center">
								<div className="inline-flex items-center justify-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
									<span className="ml-3 text-gray-600 dark:text-gray-400">
										Searching...
									</span>
								</div>
							</div>
						) : products.length > 0 ? (
							<div className="divide-y divide-gray-200 dark:divide-gray-700">
								{products.map(product => (
									<Link
										key={product.id}
										href={`/${product.id}`}
										onClick={onClose}
										className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 group"
									>
										<div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
											<Image
												src={product.images?.[0]?.url || '/placeholder.svg'}
												alt={product.name}
												fill
												className="object-cover group-hover:scale-105 transition-transform duration-200"
												sizes="64px"
											/>
										</div>
										<div className="ml-4 flex-1 min-w-0">
											<div className="flex items-start justify-between">
												<div className="flex-1 min-w-0">
													<h3 className="text-gray-900 dark:text-white font-medium truncate">
														{product.name}
													</h3>
													<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
														{product.category?.name || 'Uncategorized'}
													</p>
												</div>
												<div className="ml-4 flex-shrink-0">
													<p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
														{formatCurrency(product.price)}
													</p>
												</div>
											</div>
											{product.description && (
												<p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
													{product.description}
												</p>
											)}
										</div>
									</Link>
								))}
							</div>
						) : debouncedSearch ? (
							<div className="p-8 text-center">
								<div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-8 w-8 text-gray-400"
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
								</div>
								<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
									No products found
								</h3>
								<p className="text-gray-500 dark:text-gray-400">
									No results for "
									<span className="text-gray-700 dark:text-gray-300">
										{debouncedSearch}
									</span>
									"
								</p>
								<p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
									Try different keywords or check for typos
								</p>
							</div>
						) : (
							<div className="p-8 text-center">
								<div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
									<svg
										className="h-8 w-8 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
									Start searching
								</h3>
								<p className="text-gray-500 dark:text-gray-400">
									Type to search through our product catalog
								</p>
							</div>
						)}
					</div>

					<div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
						<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
							<span>Press ESC to close</span>
							<span>{products.length} products found</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchModal;
