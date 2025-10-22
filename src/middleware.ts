
import { withAuth } from 'next-auth/middleware';

export default withAuth({
	pages: {
		signIn: '/login',
	},
});

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|manifest.json|api|cart|product|$|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)',
	],
};
