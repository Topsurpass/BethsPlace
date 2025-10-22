'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export type Slide = {
	title?: string;
	description?: string;
	bgImage?: string;
	bgColor?: string;
	textColor?: string;
	overlayClass?: string;
	customContent?: ReactNode; // full custom render
};

interface SlideShowProps {
	slides: Slide[];
	interval?: number; // autoplay interval
	transitionDuration?: number; // in ms
	renderSlide?: (slide: Slide, isActive: boolean) => ReactNode;
}

export function SlideShow({
	slides,
	interval = 5000,
	transitionDuration = 1000,
	renderSlide,
}: SlideShowProps) {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent(prev => (prev + 1) % slides.length);
		}, interval);
		return () => clearInterval(timer);
	}, [slides.length, interval]);

	return (
		<div className="relative flex-1 overflow-hidden hidden md:block">
			{slides.map((slide, i) => (
				<div
					key={i}
					className={`absolute inset-0 transition-opacity duration-${transitionDuration} ${
						i === current ? 'opacity-100' : 'opacity-0'
					}`}
					style={{
						backgroundImage: slide.bgImage ? `url(${slide.bgImage})` : undefined,
						backgroundColor: slide.bgColor,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					{renderSlide ? (
						renderSlide(slide, i === current)
					) : (
						<div
							className={`absolute bottom-0 left-0 right-0 p-6 md:min-h-[200px] ${
								slide.overlayClass || 'bg-black/40'
							}`}
						>
							<h1 className={`text-4xl font-bold ${slide.textColor || 'text-white'}`}>
								{slide.title}
							</h1>
							{slide.description && <p className="text-lg">{slide.description}</p>}
						</div>
					)}
				</div>
			))}

			{/* Indicators */}
			<div className="absolute bottom-4 left-6 flex space-x-3">
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrent(i)}
						className={`w-3 h-3 rounded-full ${
							i === current ? 'bg-white scale-125' : 'bg-white/40'
						}`}
					/>
				))}
			</div>

			{/* Nav buttons */}
			<div className="absolute bottom-4 right-6 flex space-x-2">
				<Button
					variant="outline"
					onClick={() => setCurrent(prev => (prev - 1 + slides.length) % slides.length)}
				>
					<ArrowLeft />
				</Button>
				<Button
					variant="outline"
					onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
				>
					<ArrowRight />
				</Button>
			</div>
		</div>
	);
}
