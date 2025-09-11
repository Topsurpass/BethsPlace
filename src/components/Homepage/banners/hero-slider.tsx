'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface BannerItem {
	id: string | number;
	image: string;
	title: string;
	subtitle?: string;
	description?: string;
	ctaText: string;
	ctaLink: string;
	theme?: 'light' | 'dark';
	badge?: string;
}

interface HeroBannerProps {
	banners: BannerItem[];
	autoRotate?: boolean;
	rotateInterval?: number;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
	banners,
	autoRotate = true,
	rotateInterval = 5000,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);

	// Handle auto-rotation
	useEffect(() => {
		if (!autoRotate || banners.length <= 1) return;

		const interval = setInterval(() => {
			setIsTransitioning(true);
			setTimeout(() => {
				setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
				setIsTransitioning(false);
			}, 300);
		}, rotateInterval);

		return () => clearInterval(interval);
	}, [autoRotate, banners.length, rotateInterval]);

	const goToPrevSlide = () => {
		if (banners.length <= 1) return;
		setIsTransitioning(true);
		setTimeout(() => {
			setCurrentIndex(prevIndex => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
			setIsTransitioning(false);
		}, 300);
	};

	const goToNextSlide = () => {
		if (banners.length <= 1) return;
		setIsTransitioning(true);
		setTimeout(() => {
			setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
			setIsTransitioning(false);
		}, 300);
	};

	if (banners.length === 0) return null;

	const currentBanner = banners[currentIndex];

	return (
		<section className="relative flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0 ">
				<Image
					src={currentBanner.image}
					alt={currentBanner.title}
					fill
					className="object-cover"
					priority
				/>
			</div>

			<div
				className={`relative z-10 text-center p-4 max-w-4xl transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
			>
				{/* Badge */}
				{currentBanner.badge && (
					<span className="inline-block bg-gold-deep text-black text-sm font-bold px-4 py-2 rounded-full mb-6">
						{currentBanner.badge}
					</span>
				)}

				<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
					{currentBanner.theme === 'light' ? (
						<span className="text-backgroud">{currentBanner.title}</span>
					) : (
						<span className="text-gold-deep">{currentBanner.title}</span>
					)}
				</h1>

				{currentBanner.subtitle && (
					<h2 className="text-xl md:text-2xl text-foreground mb-6">
						{currentBanner.subtitle}
					</h2>
				)}

				{currentBanner.description && (
					<p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
						{currentBanner.description}
					</p>
				)}

				<Link
					href={currentBanner.ctaLink}
					className="inline-block bg-gold-deep hover:bg-gold-deep-light text-black font-bold py-1 px-2 rounded-lg transition-all duration-300 text-lg"
				>
					{currentBanner.ctaText}
				</Link>
			</div>

			{banners.length > 1 && (
				<>
					<button
						onClick={goToPrevSlide}
						className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-gold-deep p-3 rounded-full hover:bg-opacity-70 transition-all duration-300"
						aria-label="Previous slide"
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
								d="M15 19l-7-7 7-7"
							/>
						</svg>
					</button>

					<button
						onClick={goToNextSlide}
						className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-gold-deep p-3 rounded-full hover:bg-opacity-70 transition-all duration-300 "
						aria-label="Next slide"
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
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				</>
			)}
		</section>
	);
};

export default HeroBanner;
