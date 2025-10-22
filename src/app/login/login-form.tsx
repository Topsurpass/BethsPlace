'use client';

import { Button } from '@/components/ui/button';
import { CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { TextField, PasswordField } from '@/components/ui/forms';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInputs, LoginSchema } from '@/validations';
import { useState } from 'react';
import Link from 'next/link';

const defaultValues = {
	email: '',
	password: '',
};

export function LoginForm({
	isLoading,
	onLogin,
	onGoogleSignIn,
	onFaceBookSignIn,
	isError,
	error,
}: {
	isError: boolean;
	isLoading: boolean;
	error: any;
	onLogin: SubmitHandler<LoginInputs>;
	onGoogleSignIn: () => void;
	onFaceBookSignIn: () => void;
}) {
	const { control, handleSubmit } = useForm<LoginInputs>({
		resolver: zodResolver(LoginSchema),
		defaultValues,
	});

	const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

	const togglePasswordVisibility = (name: string) => {
		setVisiblePasswords(prev => ({
			...prev,
			[name]: !prev[name],
		}));
	};
	return (
		<div>
			<CardHeader className="text-left pb-8 pt-12">
				<CardTitle className="text-3xl font-bold dark:text-gold-deep">
					Welcome Back!
				</CardTitle>
				<p className="text-base leading-relaxed">
					Sign in to your account to continue shopping
				</p>
			</CardHeader>

			<CardContent className="px-8 pb-8">
				<form onSubmit={handleSubmit(onLogin)} className="space-y-6">
					<div>
						<TextField
							label="Email"
							id="email"
							name="email"
							type="email"
							placeholder="Enter email"
							control={control}
						/>
					</div>
					<div>
						<PasswordField
							label="Password"
							name="password"
							control={control}
							placeholder="••••••••"
							type={visiblePasswords['password'] ? 'text' : 'password'}
							showPassword={visiblePasswords['password'] ?? false}
							showLeftIcon={true}
							onIconClick={() => togglePasswordVisibility('password')}
						/>
					</div>
					<div className="mt-6 text-end text-sm text-gray-600">
						<Link href="/forgot-password" className=" font-medium ml-1 hover:underline">
							Forgot password?
						</Link>
					</div>

					<Button
						type="submit"
						disabled={isLoading}
						className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${
							isLoading
								? 'bg-gray-700 text-gray-500 cursor-not-allowed scale-95'
								: 'bg-gradient-to-r from-gold to-gold-light text-black hover:shadow-2xl hover:scale-105 active:scale-95'
						} shadow-lg hover:shadow-gold/25`}
						loadingText="Signing in"
						label="Login"
						isLoading={isLoading}
					/>
					{isError && (
						<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center gap-2 animate-fade-in">
							<span className="text-red-600 text-sm">
								{typeof error === 'string'
									? error
									: (error as any)?.response?.data?.error ||
										error?.message ||
										'An error occurred.'}
							</span>
						</div>
					)}
					<div className="mt-8">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-700"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-4 bg-gray-900 text-gray-400">
									Or continue with
								</span>
							</div>
						</div>

						{/* Social Login */}
						<div className="mt-6 grid grid-cols-2 gap-4">
							<button
								type="button"
								className="flex items-center justify-center px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 group cursor-pointer"
								onClick={onGoogleSignIn}
							>
								<svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
									<path
										fill="#4285F4"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="#34A853"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="#FBBC05"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="#EA4335"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
								<span className="font-medium">Google</span>
							</button>

							<button
								type="button"
								className="flex items-center justify-center px-4 py-3 border border-gray-700 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 group cursor-pointer"
								onClick={onFaceBookSignIn}
							>
								<svg
									className="w-5 h-5 mr-3"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
								<span className="font-medium">Facebook</span>
							</button>
						</div>
					</div>
				</form>
			</CardContent>
		</div>
	);
}
