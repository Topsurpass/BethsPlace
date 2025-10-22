import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
	hashPassword,
	validateEmail,
	validatePassword,
	generateToken,
	AuthError,
} from '@/lib/auth';

export async function POST(request: NextRequest) {
	try {
		const { email, password, firstName, lastName, role } = await request.json();

		// Validate input
		if (!email || !password || !firstName || !lastName) {
			return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
		}

		if (!validateEmail(email)) {
			return NextResponse.json(
				{ error: 'Please provide a valid email address' },
				{ status: 400 },
			);
		}

		const passwordValidation = validatePassword(password);
		if (!passwordValidation.isValid) {
			return NextResponse.json(
				{
					error: 'Password does not meet requirements',
					details: passwordValidation.errors,
				},
				{ status: 400 },
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: 'User with this email already exists' },
				{ status: 409 },
			);
		}

		const hashedPassword = await hashPassword(password);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				firstName,
				lastName,
				role,
			},
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				role: true,
				createdAt: true,
			},
		});

		const token = generateToken({
			userId: user.id,
			email: user.email,
			role: user.role,
		});

		const response = NextResponse.json(
			{
				message: 'User registered successfully',
				user,
				token,
			},
			{ status: 201 },
		);

		response.cookies.set('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 3 * 24 * 60 * 60,
		});

		return response;
	} catch (error) {
		console.error('Registration error:', error);

		if (error instanceof AuthError) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
