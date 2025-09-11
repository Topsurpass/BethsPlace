export function formatDateTime(isoDate: string): string {
	const date = new Date(isoDate);
	const now = new Date();
	const diffInMs = date.getTime() - now.getTime();
	const isFuture = diffInMs > 0;

	const diffInSec = Math.floor(Math.abs(diffInMs) / 1000);
	const diffInMin = Math.floor(diffInSec / 60);
	const diffInHours = Math.floor(diffInMin / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	if (isFuture) {
		if (diffInSec < 60) return 'In a few seconds';
		if (diffInMin < 60) return `In ${diffInMin} minute${diffInMin > 1 ? 's' : ''}`;
		if (diffInHours < 24) return `In ${diffInHours} hour${diffInHours > 1 ? 's' : ''}`;
		if (diffInDays === 1) return 'Tomorrow';
		if (diffInDays <= 7) return `In ${diffInDays} days`;
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	}

	if (diffInSec < 60) return 'Just now';
	if (diffInMin < 60) return `${diffInMin} minute${diffInMin > 1 ? 's' : ''} ago`;
	if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
	if (diffInDays === 1) return 'Yesterday';
	if (diffInDays <= 7) return `${diffInDays} days ago`;

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export function formatShortDateTime(isoDate: string): string {
	const date = new Date(isoDate);

	return date.toLocaleString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});
}

export const formatCurrency = (amount: number, symbol: string = '₦') => {
	if (amount == null || isNaN(amount)) return `${symbol}0`;
	return `${symbol}${amount.toLocaleString()}`;
};

export const formatKey = (key: string) =>
	key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

export const formatPaymentMethod = (method: string) => {
	return method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const getPercentStyle = (value: number) => {
	if (value > 50) return { className: 'text-green-600', icon: '↑' };
	if (value === 50) return { className: 'text-yellow-500', icon: '→' };
	return { className: 'text-red-500', icon: '↓' };
};

export const getStatusVariant = (status: string) => {
	switch (status.toLowerCase()) {
		case 'pending':
			return 'bg-yellow-400 text-black';
		case 'processing':
			return 'bg-sky-500 text-foreground';
		case 'shipped':
			return 'bg-indigo-500 text-foreground';
		case 'delivered':
			return 'bg-green-600 text-foreground';
		case 'cancelled':
			return 'bg-red-500 text-foreground';
		case 'returned':
			return 'bg-orange-500 text-foreground';
		case 'completed':
			return 'bg-emerald-600 text-foreground';
		case 'confirmed':
			return 'bg-emerald-600 text-foreground';
		case 'supplied':
			return 'bg-cyan-600 text-foreground';
		case 'upcoming':
			return 'bg-blue-300 text-black';
		case 'paid':
			return 'bg-lime-600 text-foreground';
		case 'ongoing':
			return 'bg-blue-600 text-foreground';
		case 'overdue':
			return 'bg-red-700 text-foreground';
		case 'on_the_move':
			return 'bg-violet-500 text-foreground';
		case 'delayed':
			return 'bg-rose-600 text-foreground';
		case 'in_transit':
			return 'bg-teal-500 text-foreground';
		case 'awaiting_pickup':
			return 'bg-amber-500 text-black';
		case 'awaiting_payment':
			return 'bg-amber-500 text-black';
		default:
			return 'bg-gray-400 text-foreground';
	}
};

/**
 * Converts a number to its written word representation
 * @param num - The number to convert
 * @returns The number as written words
 */
export function numberToWords(num: number): string {
	if (num === 0) return 'Zero';

	const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
	const teens = [
		'Ten',
		'Eleven',
		'Twelve',
		'Thirteen',
		'Fourteen',
		'Fifteen',
		'Sixteen',
		'Seventeen',
		'Eighteen',
		'Nineteen',
	];
	const tens = [
		'',
		'',
		'Twenty',
		'Thirty',
		'Forty',
		'Fifty',
		'Sixty',
		'Seventy',
		'Eighty',
		'Ninety',
	];
	const thousands = ['', 'Thousand', 'Million', 'Billion'];

	function convertHundreds(n: number): string {
		let result = '';

		if (n >= 100) {
			result += ones[Math.floor(n / 100)] + ' Hundred ';
			n %= 100;
		}

		if (n >= 20) {
			result += tens[Math.floor(n / 10)] + ' ';
			n %= 10;
		} else if (n >= 10) {
			result += teens[n - 10] + ' ';
			n = 0;
		}

		if (n > 0) {
			result += ones[n] + ' ';
		}

		return result.trim();
	}

	if (num < 0) return 'Negative ' + numberToWords(-num);

	// Handle decimal numbers by rounding to nearest whole number
	num = Math.round(num);

	let result = '';
	let thousandIndex = 0;

	while (num > 0) {
		const chunk = num % 1000;
		if (chunk !== 0) {
			const chunkWords = convertHundreds(chunk);
			result =
				chunkWords +
				(thousands[thousandIndex] ? ' ' + thousands[thousandIndex] : '') +
				(result ? ' ' + result : '');
		}
		num = Math.floor(num / 1000);
		thousandIndex++;
	}

	return result.trim();
}

/**
 * Formats currency amount in words for Nigerian Naira
 * @param amount - The amount to convert
 * @returns Formatted string like "One Thousand Five Hundred Naira Only"
 */
export function formatAmountInWords(amount: number): string {
	return `${numberToWords(amount)}`;
}

export const fileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});
};
