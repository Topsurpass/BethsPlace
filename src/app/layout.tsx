import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import Provider from '@/providers';
import { noticeMessages } from '@/data/mock-notice';
import TopNoticeBanner from '@/components/Homepage/banners/quick-update-scroll';

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
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning
			>
				<Provider>
					<div className="fixed top-0 left-0 right-0 z-50 bg-gold-deep ">
						<TopNoticeBanner
							messages={noticeMessages}
							scrollSpeed={4}
							autoDismiss={false}
						/>
						<Header />
					</div>

					{children}

					<Footer />
				</Provider>
			</body>
		</html>
	);
}
