import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
	try {
		const { slug } = params;

		if (!slug || typeof slug !== 'string') {
			return NextResponse.json({ error: 'Product slug is required.' }, { status: 400 });
		}

		const product = await prisma.product.findUnique({
			where: { slug },
			include: {
				category: true,
				images: true,
				features: true,
				tags: true,
				reviews: {
					include: {
						user: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
								avatar: true,
							},
						},
					},
					orderBy: { createdAt: 'desc' },
				},
			},
		});

		if (!product) {
			return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
		}

		return NextResponse.json(product, { status: 200 });
	} catch (error: any) {
		console.error('❌ Error fetching product by slug:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch product', details: error.message },
			{ status: 500 },
		);
	}
}
