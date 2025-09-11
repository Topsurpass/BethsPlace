import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { WiDayLightWind } from 'react-icons/wi';
import { GiNightSleep } from 'react-icons/gi';

export default function ThemeToggleButton() {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className="rounded-full cursor-pointer"
		>
			{theme === 'dark' ? (
				<div className="border rounded-full p-1 border-gold-deep flex justify-center items-center">
					<GiNightSleep className="dark:text-gold-deep" size={22} />
				</div>
			) : (
				<div className="border rounded-full p-1 flex justify-center items-center">
					<WiDayLightWind className="text-foreground" size={22} />
				</div>
			)}
		</Button>
	);
}
