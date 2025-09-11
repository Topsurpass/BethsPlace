export type ProductProps = {
	id: string | number;
	name: string;
	description?: string;
	category: string;
	images: string[];
	features: string[];
	price: number;
	originalPrice?: number;
	inStock: boolean;
	tags?: string[];
	rating?: number | string;
	reviewCount?: number | string;
};
