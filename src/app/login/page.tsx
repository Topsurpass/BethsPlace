'use client';

import { SlideShow } from '@/components/ui/slideshow';
import { LoginForm } from './login-form';
import { SubmitHandler } from 'react-hook-form';
import { LoginInputs } from '@/validations';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const callbackUrl = decodeURIComponent(searchParams.get('callbackUrl') || '/');
	const [loginError, setLoginError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleCredentialsLogin: SubmitHandler<LoginInputs> = async data => {
		setIsLoading(true);
		setLoginError(null);

		const res = await signIn('credentials', {
			redirect: false,
			callbackUrl,
			email: data.email,
			password: data.password,
		});

		setIsLoading(false);

		if (res?.error) {
			setLoginError(res.error);
		} else if (res?.url) {
			router.push(res.url);
		}
	};

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		setLoginError(null);

		const res = await signIn('google', { redirect: false, callbackUrl });
		setIsLoading(false);

		if (res?.error) setLoginError(res.error);
		else if (res?.url) router.push(res.url);
	};

	const handleFacebookSignIn = async () => {
		setIsLoading(true);
		setLoginError(null);

		const res = await signIn('facebook', { redirect: false, callbackUrl });
		setIsLoading(false);

		if (res?.error) setLoginError(res.error);
		else if (res?.url) router.push(res.url);
	};

	const slides = [
		{
			title: 'Shop Premium Handmade Bags',
			description:
				'Sign in to explore our exclusive collection and own a bag that speaks elegance.',
			bgImage: '/lady-with-bag2.jpg',
			textColor: 'text-yellow-400',
		},
		{
			title: 'Cultural Craft, Modern Fashion',
			description:
				'Login to shop authentic Nigerian handmade bags designed for today’s bold look.',
			bgImage: '/guy-with-bag1.jpg',
			textColor: 'text-yellow-400',
		},
		{
			title: 'Your Classy Style Awaits',
			description:
				'Join BethsPlace and start shopping for premium bags that elevate your everyday look.',
			bgImage: '/lady-with-bag3.jpg',
			textColor: 'text-yellow-400',
		},
	];

	return (
		<div className="min-h-screen flex">
			<SlideShow slides={slides} />
			<div className="flex-1 flex items-center justify-center p-4">
				<div className="max-w-md w-full">
					<LoginForm
						isLoading={isLoading}
						onLogin={handleCredentialsLogin}
						onGoogleSignIn={handleGoogleSignIn}
						onFaceBookSignIn={handleFacebookSignIn}
						isError={!!loginError}
						error={loginError}
					/>
				</div>
			</div>
		</div>
	);
}
