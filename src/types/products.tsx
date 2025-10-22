
export interface ProductImage {
	id: string;
	url: string;
	altText?: string | null;
}

export interface ProductFeature {
	id: string;
	feature: string;
}

export interface ProductTag {
	id: string;
	tag: string;
}

export interface ProductCategory {
	id: string;
	name: string;
}

export interface ProductProps {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	originalPrice?: number | null;
	inStock: boolean;
	inventory: number;
	rating: number;
	reviewCount: number;
	createdAt: string;
	updatedAt: string;
	category: ProductCategory;
	images: ProductImage[];
	features: ProductFeature[];
	tags: ProductTag[];
	reviews?: any[];
}
