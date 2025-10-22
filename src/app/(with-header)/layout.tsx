'use client';

import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { noticeMessages } from '@/data/mock-notice';
import TopNoticeBanner from '@/components/Homepage/banners/quick-update-scroll';

export default function WithHeaderLayout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<div className="fixed top-0 left-0 right-0 z-50 bg-gold-deep ">
				<TopNoticeBanner messages={noticeMessages} scrollSpeed={4} autoDismiss={false} />
				<Header />
			</div>

			{children}

		</main>
	);
}
