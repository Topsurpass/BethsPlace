'use client';

import { createContext, useEffect, useLayoutEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem('theme');
		if (stored === 'dark' || stored === 'light') {
			setTheme(stored);
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setTheme(prefersDark ? 'dark' : 'light');
		}
		setMounted(true);
	}, []);

	useLayoutEffect(() => {
		if (!theme) return;
		const root = document.documentElement;
		root.classList.toggle('dark', theme === 'dark');
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
	};

	if (!mounted || !theme) {
		return <div className="w-full h-full bg-white dark:bg-black transition-colors"></div>;
	}

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
