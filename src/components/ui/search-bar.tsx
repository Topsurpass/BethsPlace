// components/ui/search-bar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockProducts } from '@/data/mock-products';
import { ProductProps } from '@/types/products';

const SearchBar: React.FC = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<ProductProps[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [debouncedQuery, setDebouncedQuery] = useState('');

	// Debounce the query
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(query);
		}, 300);

		return () => clearTimeout(timer);
	}, [query]);

	useEffect(() => {
		if (debouncedQuery.length > 0) {
			const filtered = mockProducts.filter(product =>
				product.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
			);
			setResults(filtered);
		} else {
			setResults([]);
		}
	}, [debouncedQuery]);

	return (
		<div className="relative">
			<input
				type="text"
				placeholder="Search products..."
				value={query}
				onChange={e => setQuery(e.target.value)}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setTimeout(() => setIsOpen(false), 200)}
				className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
			/>
			{isOpen && results.length > 0 && (
				<div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50 mt-2 max-h-96 overflow-y-auto">
					{results.map(product => (
						<Link
							key={product.id}
							href={`/shop/${product.id}`}
							className="flex items-center p-4 hover:bg-gray-800 transition-colors"
						>
							<div className="relative w-16 h-16 mr-4">
								<Image
									src={product.images[0]}
									alt={product.name}
									fill
									className="object-cover rounded-md"
								/>
							</div>
							<div>
								<h4 className="text-white font-medium">{product.name}</h4>
								<p className="text-gold">₦{product.price.toLocaleString()}</p>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
