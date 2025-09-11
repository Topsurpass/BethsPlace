import { CartProvider } from '@/context/cart-context';
import { ThemeProvider } from '@/context/theme-context';

export default function Provider({ children }: { children: React.ReactNode }) {
	return (
		<CartProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</CartProvider>
	);
}
