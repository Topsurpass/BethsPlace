import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const search = searchParams.get('search') || '';

	const where = search
		? {
				name: {
					contains: search,
				},
			}
		: undefined;

	const categories = await prisma.category.findMany({
		where,
		orderBy: { name: 'asc' },
	});

	return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
	const { name } = await req.json();

	if (!name) return NextResponse.json({ error: 'Category name required' }, { status: 400 });

	const existing = await prisma.category.findUnique({
		where: { name },
	});

	if (existing) {
		return NextResponse.json(existing);
	}

	const newCategory = await prisma.category.create({
		data: { name },
	});

	return NextResponse.json(newCategory);
}
