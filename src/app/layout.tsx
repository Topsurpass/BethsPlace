import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import Provider from '@/providers';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'BethsPlace | Premium Handmade Bags',
	description:
		'Discover exquisite handmade Nigerian bags that celebrate our rich cultural heritage and artisan traditions.',
	manifest: '/manifest.json',
	icons: {
		icon: '/android-chrome-192x192.png',
		apple: '/ios/87.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#000000" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
