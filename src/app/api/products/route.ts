import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateUniqueSlug } from '@/lib/helpers';



export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '10');
		const search = searchParams.get('search')?.trim() || '';
		const category = searchParams.get('category')?.trim() || '';

		const where: any = {};

		if (search) {
			where.name = {
				contains: search,
			};
		}

		if (category) {
			where.category = {
				name: {
					equals: category,
				},
			};
		}

		const [products, total] = await Promise.all([
			prisma.product.findMany({
				where,
				include: {
					images: true,
					tags: true,
					features: true,
					category: true,
				},
				skip: (page - 1) * limit,
				take: limit,
				orderBy: { createdAt: 'desc' },
			}),
			prisma.product.count({ where }),
		]);

		if (!products.length) {
			return NextResponse.json(
				{
					message: 'No products found.',
					data: [],
					pagination: {
						total: 0,
						totalPages: 0,
						currentPage: page,
					},
				},
				{ status: 200 },
			);
		}

		return NextResponse.json({
			data: products,
			pagination: {
				total,
				totalPages: Math.ceil(total / limit),
				currentPage: page,
			},
		});
	} catch (error: any) {
		console.error('❌ Error fetching products:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch products', details: error.message },
			{ status: 500 },
		);
	}
}


export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, description, price, categoryId, inventory, images, features, tags, slug } =
			body;

		if (!name || !description || price === undefined) {
			return NextResponse.json(
				{ error: 'Name, description, and price are required.' },
				{ status: 400 },
			);
		}

		if (typeof price !== 'number' || price <= 0) {
			return NextResponse.json(
				{ error: 'Price must be a positive number.' },
				{ status: 400 },
			);
		}

		const finalSlug = slug && slug.trim().length > 0 ? slug : await generateUniqueSlug(name);

		const stockCount = inventory ?? 0;
		const inStock = stockCount > 0;

		const product = await prisma.product.create({
			data: {
				name,
				description,
				price,
				categoryId,
				inventory: stockCount,
				inStock,
				slug: finalSlug,
				images: {
					create:
						Array.isArray(images) && images.length > 0
							? images.map((img: any) => ({
									url: img.url,
									altText: img.altText || null,
								}))
							: [],
				},
				features: {
					create:
						Array.isArray(features) && features.length > 0
							? features.map((f: string) => ({ feature: f }))
							: [],
				},
				tags: {
					create:
						Array.isArray(tags) && tags.length > 0
							? tags.map((t: string) => ({ tag: t }))
							: [],
				},
			},
			include: { category: true, images: true, features: true, tags: true },
		});

		return NextResponse.json(product, { status: 201 });
	} catch (error: any) {
		console.error('Error creating product:', error);
		return NextResponse.json(
			{ error: 'Failed to create product', details: error.message },
			{ status: 500 },
		);
	}
}


export async function PUT(req: NextRequest) {
	try {
		const body = await req.json();
		const { id, name, description, price, inStock, category, slug } = body;

		let updatedSlug = slug;
		if (!slug && name) {
			updatedSlug = await generateUniqueSlug(name);
		}

		const updated = await prisma.product.update({
			where: { id },
			data: {
				name,
				description,
				price,
				inStock,
				category,
				slug: updatedSlug,
			},
		});

		return NextResponse.json(updated);
	} catch (error: any) {
		console.error('Error updating product:', error);
		return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
	}
}


export async function DELETE(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get('id');
	if (!id) return NextResponse.json({ error: 'Missing product id' }, { status: 400 });

	await prisma.product.delete({ where: { id } });

	return NextResponse.json({ message: 'Product deleted successfully' });
}
