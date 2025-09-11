import { BannerItem } from '@/components/Homepage/banners/hero-slider';

export const bannerData: BannerItem[] = [
	{
		id: 1,
		image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhhbmRtYWRlJTIwYmFnc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80',
		title: 'Premium Handmade Nigerian Bags',
		subtitle: 'Discover Our Exclusive Collection',
		description:
			'Crafted with tradition, designed for modernity. Each piece tells a story of Nigerian heritage.',
		ctaText: 'Shop Now',
		ctaLink: '/shop',
		badge: 'New Collection',
		theme: 'light',
	},
	{
		id: 2,
		image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFua2FyYSUyMGJhZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80',
		title: 'Summer Sale',
		subtitle: 'Up to 30% Off Selected Items',
		description:
			'Limited time offer on our most popular Ankara and Adire designs. Hurry while stocks last!',
		ctaText: 'View Offers',
		ctaLink: '/shop?discount=true',
		badge: 'Limited Time',
		theme: 'dark',
	},
	{
		id: 3,
		image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYWRlZCUyMGJhZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80',
		title: 'Artisan Collection',
		subtitle: 'Meet Our Talented Craftspeople',
		description:
			'Each bag is meticulously crafted by skilled Nigerian artisans supporting local communities.',
		ctaText: 'Meet The Artisans',
		ctaLink: '/artisans',
		badge: 'Behind The Scenes',
		theme: 'light',
	},
];
