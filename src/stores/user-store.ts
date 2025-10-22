// stores/auth-store.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Types based on our Prisma schema
interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: 'CUSTOMER' | 'ADMIN';
	avatar?: string;
	isActive: boolean;
	createdAt: string;
	addresses?: Address[];
}

interface Address {
	id: string;
	type: 'SHIPPING' | 'BILLING';
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	isDefault: boolean;
}

interface CartItem {
	id: string;
	productId: string;
	name: string;
	price: number;
	quantity: number;
	images: string[];
	inStock: boolean;
}

interface AuthState {
	user: User | null;
	accessToken: string | null;
	isAuthenticated: boolean;

	// Cart State
	cart: {
		items: CartItem[];
		total: number;
		itemCount: number;
	};

	// UI State
	isLoading: boolean;
	error: string | null;
}

interface AuthActions {
	setUser: (user: User, token: string) => void;
	updateUser: (user: Partial<User>) => void;
	logout: () => void;

	addToCart: (product: {
		id: string;
		productId: string;
		name: string;
		price: number;
		images: string[];
		inStock: boolean;
	}) => void;
	removeFromCart: (productId: string) => void;
	updateCartItemQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;

	setLoading: (loading: boolean) => void;
	setError: (error: string | null) => void;
	clearError: () => void;
}

// Initial state
const initialState: AuthState = {
	user: null,
	accessToken: null,
	isAuthenticated: false,
	cart: {
		items: [],
		total: 0,
		itemCount: 0,
	},
	isLoading: false,
	error: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
	immer(
		devtools(
			persist(
				(set, get) => ({
					...initialState,

					setUser: (user: User, token: string) => {
						set(state => {
							state.user = user;
							state.accessToken = token;
							state.isAuthenticated = true;
							state.error = null;
						});
					},

					updateUser: (userData: Partial<User>) => {
						set(state => {
							if (state.user) {
								state.user = { ...state.user, ...userData };
							}
						});
					},

					logout: () => {
						set(state => {
							state.user = null;
							state.accessToken = null;
							state.isAuthenticated = false;
							state.cart = {
								items: [],
								total: 0,
								itemCount: 0,
							};
							state.error = null;
						});
					},

					addToCart: product => {
						set(state => {
							const existingItem = state.cart.items.find(
								(item: { productId: string }) =>
									item.productId === product.productId,
							);

							if (existingItem) {
								existingItem.quantity += 1;
							} else {
								state.cart.items.push({
									...product,
									quantity: 1,
								});
							}

							// Recalculate totals
							state.cart.itemCount = state.cart.items.reduce(
								(total: any, item: { quantity: any }) => total + item.quantity,
								0,
							);
							state.cart.total = state.cart.items.reduce(
								(total: number, item: { price: number; quantity: number }) =>
									total + item.price * item.quantity,
								0,
							);
						});
					},

					removeFromCart: (productId: string) => {
						set(state => {
							state.cart.items = state.cart.items.filter(
								(item: { productId: string }) => item.productId !== productId,
							);

							// Recalculate totals
							state.cart.itemCount = state.cart.items.reduce(
								(total: any, item: { quantity: any }) => total + item.quantity,
								0,
							);
							state.cart.total = state.cart.items.reduce(
								(total: number, item: { price: number; quantity: number }) =>
									total + item.price * item.quantity,
								0,
							);
						});
					},

					updateCartItemQuantity: (productId: string, quantity: number) => {
						set(state => {
							const item = state.cart.items.find(
								(item: { productId: string }) => item.productId === productId,
							);

							if (item) {
								if (quantity <= 0) {
									state.cart.items = state.cart.items.filter(
										(item: { productId: string }) =>
											item.productId !== productId,
									);
								} else {
									item.quantity = quantity;
								}

								// Recalculate totals
								state.cart.itemCount = state.cart.items.reduce(
									(total: any, item: { quantity: any }) => total + item.quantity,
									0,
								);
								state.cart.total = state.cart.items.reduce(
									(total: number, item: { price: number; quantity: number }) =>
										total + item.price * item.quantity,
									0,
								);
							}
						});
					},

					clearCart: () => {
						set(state => {
							state.cart = {
								items: [],
								total: 0,
								itemCount: 0,
							};
						});
					},

					// UI actions
					setLoading: (loading: boolean) => {
						set(state => {
							state.isLoading = loading;
						});
					},

					setError: (error: string | null) => {
						set(state => {
							state.error = error;
						});
					},

					clearError: () => {
						set(state => {
							state.error = null;
						});
					},
				}),
				{
					name: 'auth-store',
					partialize: state => ({
						user: state.user,
						accessToken: state.accessToken,
						isAuthenticated: state.isAuthenticated,
						cart: state.cart,
					}),
					// Optional: Use sessionStorage instead of localStorage
					// getStorage: () => sessionStorage,
				},
			),
			{
				enabled: process.env.NODE_ENV === 'development',
				name: 'auth-store',
			},
		),
	),
);

// Selector hooks for better performance and TypeScript support
export const useUser = () => useAuthStore(state => state.user);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);
export const useIsAdmin = () => useAuthStore(state => state.user?.role === 'ADMIN');
export const useCart = () => useAuthStore(state => state.cart);
export const useCartItems = () => useAuthStore(state => state.cart.items);
export const useCartTotal = () => useAuthStore(state => state.cart.total);
export const useCartItemCount = () => useAuthStore(state => state.cart.itemCount);
export const useAuthLoading = () => useAuthStore(state => state.isLoading);
export const useAuthError = () => useAuthStore(state => state.error);
