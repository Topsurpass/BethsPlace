'use client';

import SidebarLayout from '@/layouts/sidebar-layout';
import { CircleUserRound, Truck, CreditCard, Bell, Flag } from 'lucide-react';

const items = [
	{
		title: 'My Profile',
		url: '/account/profile',
		icon: CircleUserRound,
	},
	{
		title: 'Track Order',
		url: '/account/orders',
		icon: Truck,
	},
	{
		title: 'My Wallet',
		url: '/account/wallet',
		icon: CreditCard,
	},
	{
		title: 'Notifications',
		url: '/account/notifications',
		icon: Bell,
	},
	{
		title: 'Help & Support',
		url: '/account/support',
		icon: Flag,
	},
];

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="md:px-6 py-32 md:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
			<SidebarLayout items={items}>{children}</SidebarLayout>
		</main>
	);
}
