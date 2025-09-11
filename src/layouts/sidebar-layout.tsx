'use client';

import { useState, useEffect, type ReactNode, type ComponentType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

type SidebarItem = {
	title: string;
	url: string;
	icon: ComponentType<any>;
};

interface SidebarLayoutProps {
	items: SidebarItem[];
	children: ReactNode;
}

const SidebarLayout = ({ items, children }: SidebarLayoutProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const checkIsMobile = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
		};

		checkIsMobile();
		window.addEventListener('resize', checkIsMobile);

		return () => {
			window.removeEventListener('resize', checkIsMobile);
		};
	}, []);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const isActive = (url: string) => {
		return pathname === url;
	};

	return (
		<div className="flex flex-col md:flex-row">
			<header className="p-4 md:hidden flex justify-between items-center">
				<button
					onClick={toggleSidebar}
					className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
				>
					{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</header>
			<div className="hidden md:block md:w-64 border border-card-foreground shadow-lg md:rounded-xl h-full overflow-y-auto">
				<nav className="p-4">
					<ul className="space-y-2">
						{items.map((item, index) => {
							const IconComponent = item.icon;
							const active = isActive(item.url);

							return (
								<li key={index}>
									<Link
										href={item.url}
										className={`
                      w-full flex items-center px-4 py-3 rounded-lg transition-colors
                      ${active ? 'text-gold-deep' : 'text-foreground hover:bg-gray-400'}
                    `}
										onClick={() => {
											if (isMobile) {
												setIsOpen(false);
											}
										}}
									>
										<IconComponent className="w-5 h-5 mr-3" />
										<span>{item.title}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>

			{isOpen && (
				<div className="md:w-64 md:hidden bg-white shadow-lg md:rounded-xl h-full overflow-y-auto">
					<nav className="p-4">
						<ul className="space-y-2">
							{items.map((item, index) => {
								const IconComponent = item.icon;
								const active = isActive(item.url);

								return (
									<li key={index}>
										<Link
											href={item.url}
											className={`
                      w-full flex items-center px-4 py-3 rounded-lg transition-colors
                      ${active ? 'text-gold-deep' : 'text-gray-600 hover:bg-gray-100'}
                    `}
											onClick={() => {
												if (isMobile) {
													setIsOpen(false);
												}
											}}
										>
											<IconComponent className="w-5 h-5 mr-3" />
											<span>{item.title}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			)}
			<div className="flex-1 flex flex-col overflow-hidden">
				<main className="flex-1 overflow-y-auto md:px-6 mt-2 md:mt-0">{children}</main>
			</div>
		</div>
	);
};

export default SidebarLayout;
