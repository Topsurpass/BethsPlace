'use client';

import { CartProvider } from '@/context/cart-context';
import { ThemeProvider } from '@/context/theme-context';
import ReactQueryProvider from './react-query-provider';
import { SessionProvider } from 'next-auth/react';

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<ReactQueryProvider>
				<CartProvider>
					<ThemeProvider>{children}</ThemeProvider>
				</CartProvider>
			</ReactQueryProvider>
		</SessionProvider>
	);
}
