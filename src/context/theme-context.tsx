'use client';

import { createContext, useLayoutEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('theme');
			if (stored === 'dark' || stored === 'light') return stored;
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			return prefersDark ? 'dark' : 'light';
		}
		return 'light';
	});

	useLayoutEffect(() => {
		const root = document.documentElement;
		root.classList.toggle('dark', theme === 'dark');
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
