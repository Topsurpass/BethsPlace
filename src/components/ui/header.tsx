'use client';

import Link from 'next/link';
import useCart from '@/hooks/use-cart';
import Image from 'next/image';
import ThemeToggleButton from './theme-toggle';
import { useState } from 'react';
import SearchModal from './search-modal';

export default function Header() {
	const { getCartItemsCount } = useCart();
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<header className=" w-full bg-background bg-opacity-90 border-b border">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center space-y-2">
					<Link href="/" className="flex items-start">
						<div className="relative w-16 h-16 md:w-25 md:h-18">
							<Image
								src="/logo-name-gold.png"
								alt="Nigerian Artisan Bags Logo"
								fill
								className="object-contain"
							/>
						</div>
					</Link>

					<div className="flex items-center space-x-4">
						<button
							className=" transition-colors duration-300"
							onClick={() => setIsSearchOpen(true)}
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
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
						<Link
							href="/account/profile"
							className="text-foreground hover:text-gold transition-colors duration-300 relative"
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
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</Link>
						<Link
							href="/cart"
							className="text-foreground hover:text-gold transition-colors duration-300 relative"
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
									d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								/>
							</svg>
							{getCartItemsCount() > 0 && (
								<span className="absolute -top-2 -right-2 bg-gold-deep text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
									{getCartItemsCount()}
								</span>
							)}
						</Link>
						<ThemeToggleButton />
					</div>
				</div>
				<SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
			</div>
		</header>
	);
}
