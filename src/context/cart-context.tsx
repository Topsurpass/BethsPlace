'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';

export interface CartItem {
	productId: string;
	name: string;
	price: number;
	quantity: number;
	images?: { url: string }[];
	product?: any;
}

interface CartState {
	items: CartItem[];
}

type CartAction =
	| { type: 'SET_CART'; payload: CartItem[] }
	| { type: 'ADD_TO_CART'; payload: CartItem }
	| { type: 'REMOVE_FROM_CART'; payload: string }
	| { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
	| { type: 'CLEAR_CART' };

const initialState: CartState = { items: [] };

function reducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'SET_CART':
			return { ...state, items: action.payload };
		case 'ADD_TO_CART': {
			const existing = state.items.find(item => item.productId === action.payload.productId);
			if (existing) {
				return {
					...state,
					items: state.items.map(item =>
						item.productId === action.payload.productId
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				};
			}
			return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
		}
		case 'REMOVE_FROM_CART':
			return {
				...state,
				items: state.items.filter(item => item.productId !== action.payload),
			};
		case 'UPDATE_QUANTITY':
			return {
				...state,
				items: state.items.map(item =>
					item.productId === action.payload.productId
						? { ...item, quantity: action.payload.quantity }
						: item,
				),
			};
		case 'CLEAR_CART':
			return { items: [] };
		default:
			return state;
	}
}

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: session, status } = useSession();
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const mergeAndFetchCart = async () => {
			if (status === 'authenticated') {
				// Get guest cart before clearing
				const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');

				if (guestCart.length > 0) {
					await fetch('/api/cart/merge', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						credentials: 'include',
						body: JSON.stringify({ guestCart }),
					});
					localStorage.removeItem('guest_cart');
				}

				// Fetch merged cart from backend
				const res = await fetch('/api/cart', { credentials: 'include' });
				const data = await res.json();
				const formatted = data.map((item: any) => ({
					productId: item.productId,
					name: item.product.name,
					price: item.product.price,
					quantity: item.quantity,
					images: item.product.images,
				}));
				dispatch({ type: 'SET_CART', payload: formatted });
			} else if (status === 'unauthenticated') {
				const local = localStorage.getItem('guest_cart');
				if (local) {
					dispatch({ type: 'SET_CART', payload: JSON.parse(local) });
				}
			}
		};

		mergeAndFetchCart();
	}, [status]);

	const syncGuestCart = (updated: CartItem[]) => {
		localStorage.setItem('guest_cart', JSON.stringify(updated));
		dispatch({ type: 'SET_CART', payload: updated });
	};

	const addToCart = async (product: any) => {
		const newItem: CartItem = {
			productId: product.id,
			name: product.name,
			price: product.price,
			quantity: 1,
			images: product.images,
		};

		if (status === 'authenticated') {
			await fetch('/api/cart', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ productId: product.id, quantity: 1 }),
			});
			const res = await fetch('/api/cart', { credentials: 'include' });
			const data = await res.json();
			const formatted = data.map((item: any) => ({
				productId: item.productId,
				name: item.product.name,
				price: item.product.price,
				quantity: item.quantity,
				images: item.product.images,
			}));
			dispatch({ type: 'SET_CART', payload: formatted });
		} else {
			const existing = state.items.find(i => i.productId === newItem.productId);
			const updated = existing
				? state.items.map(i =>
						i.productId === newItem.productId ? { ...i, quantity: i.quantity + 1 } : i,
					)
				: [...state.items, newItem];
			syncGuestCart(updated);
		}
	};

	const removeFromCart = async (productId: string) => {
		if (status === 'authenticated') {
			await fetch('/api/cart', {
				method: 'DELETE',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ productId }),
			});
			const res = await fetch('/api/cart', { credentials: 'include' });
			const data = await res.json();
			const formatted = data.map((item: any) => ({
				productId: item.productId,
				name: item.product.name,
				price: item.product.price,
				quantity: item.quantity,
				images: item.product.images,
			}));
			dispatch({ type: 'SET_CART', payload: formatted });
		} else {
			const updated = state.items.filter(item => item.productId !== productId);
			syncGuestCart(updated);
		}
	};

	const updateQuantity = async (productId: string, quantity: number) => {
		if (status === 'authenticated') {
			await fetch('/api/cart', {
				method: 'PATCH',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ productId, quantity }),
			});
			const res = await fetch('/api/cart', { credentials: 'include' });
			const data = await res.json();
			const formatted = data.map((item: any) => ({
				productId: item.productId,
				name: item.product.name,
				price: item.product.price,
				quantity: item.quantity,
				images: item.product.images,
			}));
			dispatch({ type: 'SET_CART', payload: formatted });
		} else {
			const updated = state.items.map(item =>
				item.productId === productId ? { ...item, quantity } : item,
			);
			syncGuestCart(updated);
		}
	};

	const clearCart = () => {
		if (status === 'unauthenticated') localStorage.removeItem('guest_cart');
		dispatch({ type: 'CLEAR_CART' });
	};

	const getCartTotal = () => {
		return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const getCartItemsCount = () => {
		return state.items.reduce((total, item) => total + item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				items: state.items,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getCartTotal,
				getCartItemsCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
