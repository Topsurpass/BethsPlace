import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id)
		return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

	const { guestCart } = await req.json();

	if (!guestCart || !Array.isArray(guestCart) || guestCart.length === 0)
		return NextResponse.json({ message: 'No guest items to merge' });

	let userCart = await prisma.cart.findFirst({
		where: { userId: session.user.id },
		include: { items: true },
	});

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: { userId: session.user.id },
			include: { items: true },
		});
	}

	for (const guestItem of guestCart) {
		const existingItem = userCart.items.find(item => item.productId === guestItem.productId);

		if (existingItem) {
			await prisma.cartItem.update({
				where: { id: existingItem.id },
				data: {
					quantity: existingItem.quantity + guestItem.quantity,
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productId: guestItem.productId,
					quantity: guestItem.quantity,
					price: guestItem.price,
				},
			});
		}
	}

	const updatedCart = await prisma.cart.findFirst({
		where: { userId: session.user.id },
		include: { items: { include: { product: true } } },
	});

	return NextResponse.json(updatedCart?.items || []);
}
