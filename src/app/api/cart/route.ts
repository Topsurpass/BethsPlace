import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		// Guests handled client-side
		return NextResponse.json([]);
	}

	const cart = await prisma.cart.findFirst({
		where: { userId: session.user.id },
		include: { items: { include: { product: true } } },
	});

	const items = cart
		? cart.items.map(item => ({
				id: item.id,
				productId: item.productId,
				quantity: item.quantity,
				price: item.price,
				product: item.product,
			}))
		: [];

	return NextResponse.json(items);
}

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	const { productId, quantity } = await req.json();

	if (!session?.user?.id) {
		return NextResponse.json({ message: 'guest user' });
	}

	let cart = await prisma.cart.findFirst({
		where: { userId: session.user.id },
	});

	if (!cart) {
		cart = await prisma.cart.create({
			data: { userId: session.user.id },
		});
	}

	const existingItem = await prisma.cartItem.findFirst({
		where: { cartId: cart.id, productId },
	});

	if (existingItem) {
		await prisma.cartItem.update({
			where: { id: existingItem.id },
			data: { quantity: existingItem.quantity + (quantity || 1) },
		});
	} else {
		const product = await prisma.product.findUnique({
			where: { id: productId },
		});
		if (!product) return NextResponse.json({ message: 'Product not found' }, { status: 404 });

		await prisma.cartItem.create({
			data: {
				cartId: cart.id,
				productId,
				quantity: quantity || 1,
				price: product.price,
			},
		});
	}

	const updatedCart = await prisma.cart.findFirst({
		where: { userId: session.user.id },
		include: { items: { include: { product: true } } },
	});

	return NextResponse.json(updatedCart?.items || []);
}

export async function PATCH(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) return NextResponse.json({ message: 'guest user' });

	const { productId, quantity } = await req.json();

	const cart = await prisma.cart.findFirst({
		where: { userId: session.user.id },
	});

	if (!cart) return NextResponse.json({ message: 'Cart not found' }, { status: 404 });

	const item = await prisma.cartItem.findFirst({
		where: { cartId: cart.id, productId },
	});

	if (!item) return NextResponse.json({ message: 'Item not found' }, { status: 404 });

	if (quantity <= 0) {
		await prisma.cartItem.delete({ where: { id: item.id } });
	} else {
		await prisma.cartItem.update({
			where: { id: item.id },
			data: { quantity },
		});
	}

	const updatedCart = await prisma.cart.findFirst({
		where: { userId: session.user.id },
		include: { items: { include: { product: true } } },
	});

	return NextResponse.json(updatedCart?.items || []);
}

export async function DELETE(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) return NextResponse.json({ message: 'guest user' });

	const { productId } = await req.json();

	const cart = await prisma.cart.findFirst({
		where: { userId: session.user.id },
	});

	if (!cart) return NextResponse.json({ message: 'Cart not found' }, { status: 404 });

	await prisma.cartItem.deleteMany({
		where: { cartId: cart.id, productId },
	});

	const updatedCart = await prisma.cart.findFirst({
		where: { userId: session.user.id },
		include: { items: { include: { product: true } } },
	});

	return NextResponse.json(updatedCart?.items || []);
}
