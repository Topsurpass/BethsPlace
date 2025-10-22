import axios from 'axios';
import { getSession } from 'next-auth/react';
import config from '@/@config';

export const PublicHTTP = axios.create({
	baseURL: config.baseUrl,
	timeout: config.httpTimeout,
	withCredentials: true, 
});


const AuthHTTP = axios.create({
	baseURL: config.baseUrl,
	timeout: config.httpTimeout,
	withCredentials: true, // ✅ ensures the NextAuth cookie is sent
});

/**
 * Request interceptor
 * - Ensures NextAuth session exists before making request
 */
AuthHTTP.interceptors.request.use(
	async config => {
		const session = await getSession();

		if (!session) {
			console.warn('No active NextAuth session found.');
			throw new Error('User not authenticated');
		}

		return config;
	},
	error => Promise.reject(error),
);

AuthHTTP.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		// If unauthorized, try refreshing session via NextAuth
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// Attempt to revalidate the session
				const session = await getSession();

				if (session) {
					// Retry the original request after revalidation
					return AuthHTTP(originalRequest);
				} else {
					// Session no longer valid — you might want to redirect to login
					console.warn('Session expired. Please log in again.');
				}
			} catch (refreshError) {
				console.error('Session revalidation failed:', refreshError);
			}
		}

		return Promise.reject(error);
	},
);

export default AuthHTTP;
