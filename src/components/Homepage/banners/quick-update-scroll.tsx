'use client';

import React, { useState, useEffect } from 'react';

interface TopNoticeBannerProps {
	messages: string[];
	scrollSpeed?: number;
	autoDismiss?: boolean;
	dismissTimeout?: number;
}

const TopNoticeBanner: React.FC<TopNoticeBannerProps> = ({
	messages,
	scrollSpeed = 50,
	autoDismiss = false,
	dismissTimeout = 10,
}) => {
	const [isVisible, setIsVisible] = useState(true);
	const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

	// Handle auto-dismissal
	useEffect(() => {
		if (autoDismiss && isVisible) {
			const timer = setTimeout(() => {
				setIsVisible(false);
			}, dismissTimeout);

			return () => clearTimeout(timer);
		}
	}, [autoDismiss, dismissTimeout, isVisible]);

	// Handle message rotation
	useEffect(() => {
		if (messages.length <= 1) return;

		const interval = setInterval(() => {
			setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
		},10); 

		return () => clearInterval(interval);
	}, [messages.length]);

	if (!isVisible) return null;

	return (
		<div className="bg-gold-deep text-black  overflow-hidden">
			<div className="relative flex items-center justify-center py-2 px-8">
				<div className="flex-1 overflow-hidden">
					<div
						className="whitespace-nowrap animate-scroll"
						style={{
							animationDuration: `${(messages[currentMessageIndex].length * 1000) / scrollSpeed}ms`,
						}}
					>
						<span className="font-medium mr-4">{messages[currentMessageIndex]}</span>
					</div>
				</div>

				<button
					onClick={() => setIsVisible(false)}
					className="ml-4 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors duration-200"
					aria-label="Dismiss notice"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default TopNoticeBanner;
