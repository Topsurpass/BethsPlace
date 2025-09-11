'use client';

import React, { createContext, useReducer, useEffect } from 'react';

type CartItem = {
	id: string;
	price: number;
	quantity: number;
	[key: string]: any;
};

type Product = {
	id: string | number;
	price: number;
	[key: string]: any;
};

type CartState = {
	items: CartItem[];
};

type CartContextType = {
	items: CartItem[];
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	getCartTotal: () => number;
	getCartItemsCount: () => number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: { type: string; payload?: any }): CartState => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const existingItem = state.items.find(item => item.id === action.payload.id);

			if (existingItem) {
				return {
					...state,
					items: state.items.map(item =>
						item.id === action.payload.id
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				};
			}

			return {
				...state,
				items: [...state.items, { ...action.payload, quantity: 1 }],
			};

		case 'REMOVE_FROM_CART':
			return {
				...state,
				items: state.items.filter(item => item.id !== action.payload),
			};

		case 'UPDATE_QUANTITY':
			return {
				...state,
				items: state.items.map(item =>
					item.id === action.payload.id
						? { ...item, quantity: action.payload.quantity }
						: item,
				),
			};

		case 'CLEAR_CART':
			return {
				...state,
				items: [],
			};

		case 'LOAD_CART':
			return {
				...state,
				items: action.payload,
			};

		default:
			return state;
	}
};

const initialState: CartState = {
	items: [],
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	// Load cart from localStorage on initial render
	useEffect(() => {
		const savedCart = localStorage.getItem('cart');
		if (savedCart) {
			dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
		}
	}, []);

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.items));
	}, [state.items]);

	const addToCart = (product: Product) => {
		dispatch({ type: 'ADD_TO_CART', payload: product });
	};

	const removeFromCart = (productId: string) => {
		dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
	};

	const clearCart = () => {
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

