import NextAuth, { type AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			email: string;
			firstName?: string;
			lastName?: string;
			role: string;
		};
	}

	interface User {
		id: string;
		email: string;
		firstName?: string;
		lastName?: string;
		role: string;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string;
		role: string;
		firstName?: string;
		lastName?: string;
	}
}

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma as any) as any,
	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			profile(profile) {
				return {
					id: profile.sub,
					email: profile.email,
					firstName: profile.given_name || profile.name?.split(' ')[0] || '',
					lastName:
						profile.family_name || profile.name?.split(' ').slice(1).join(' ') || '',
					role: 'CUSTOMER',
				};
			},
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password)
					throw new Error('Email and password are required');

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) throw new Error('No user found with this email');
				if (!user.password) throw new Error('Invalid authentication method');

				const isValid = await bcrypt.compare(credentials.password, user.password);
				if (!isValid) throw new Error('Invalid credentials');

				return {
					id: user.id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					role: user.role,
				};
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === 'credentials') return true;

			if (account?.provider === 'google' || account?.provider === 'facebook') {
				try {
					const existingUser = await prisma.user.findUnique({
						where: { email: user.email! },
					});

					if (existingUser) {
						const existingAccount = await prisma.account.findFirst({
							where: {
								userId: existingUser.id,
								provider: account.provider,
							},
						});

						if (existingAccount) {
							await prisma.account.update({
								where: { id: existingAccount.id },
								data: {
									access_token: account.access_token,
									refresh_token: account.refresh_token,
									expires_at: account.expires_at,
									token_type: account.token_type,
									scope: account.scope,
									id_token: account.id_token,
									session_state: account.session_state,
								},
							});
							user.id = existingUser.id;
							return true;
						} else {
							await prisma.account.create({
								data: {
									userId: existingUser.id,
									type: account.type,
									provider: account.provider,
									providerAccountId: account.providerAccountId,
									refresh_token: account.refresh_token,
									access_token: account.access_token,
									expires_at: account.expires_at,
									token_type: account.token_type,
									scope: account.scope,
									id_token: account.id_token,
									session_state: account.session_state,
								},
							});
							user.id = existingUser.id;
							return true;
						}
					}
					return true;
				} catch (error) {
					console.error('SignIn error:', error);
					return false;
				}
			}
			return true;
		},

		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.role = user.role;
				token.firstName = user.firstName;
				token.lastName = user.lastName;
			}
			return token;
		},

		async session({ session, token }) {
			if (token) {
				session.user.id = token.id;
				session.user.role = token.role;
				session.user.firstName = token.firstName;
				session.user.lastName = token.lastName;
			}
			return session;
		},

		async redirect({ url, baseUrl }) {
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		},
	},
	pages: {
		signIn: '/login',
		error: '/login',
	},
	events: {
		async linkAccount({ user, account }) {
			console.log('Account linked:', user.email, account.provider);
		},
	},
	debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
