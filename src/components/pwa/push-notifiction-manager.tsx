// components/pwa/push-notification-manager.tsx
'use client';

import { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser } from '@/app/actions';
import { Bell, BellOff, Loader2 } from 'lucide-react';

function urlBase64ToUint8Array(base64String: string) {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

export function PushNotificationManager() {
	const [isSupported, setIsSupported] = useState(false);
	const [subscription, setSubscription] = useState<PushSubscription | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		if ('serviceWorker' in navigator && 'PushManager' in window) {
			setIsSupported(true);
			registerServiceWorker();
		}
	}, []);

	async function registerServiceWorker() {
		try {
			const registration = await navigator.serviceWorker.register('/sw.js', {
				scope: '/',
				updateViaCache: 'none',
			});
			const sub = await registration.pushManager.getSubscription();
			setSubscription(sub);
		} catch (error) {
			console.error('Service Worker registration failed:', error);
		}
	}

	async function subscribeToPush() {
		if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
			console.error('VAPID public key is not defined');
			return;
		}

		setIsLoading(true);
		try {
			const registration = await navigator.serviceWorker.ready;
			const sub = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(
					process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
				),
			});
			setSubscription(sub);
			const serializedSub = JSON.parse(JSON.stringify(sub));
			await subscribeUser(serializedSub);
		} catch (error) {
			console.error('Failed to subscribe to push notifications:', error);
		} finally {
			setIsLoading(false);
		}
	}

	async function unsubscribeFromPush() {
		setIsLoading(true);
		try {
			await subscription?.unsubscribe();
			setSubscription(null);
			await unsubscribeUser();
		} catch (error) {
			console.error('Failed to unsubscribe from push notifications:', error);
		} finally {
			setIsLoading(false);
		}
	}

	// Don't render anything until mounted to avoid hydration issues
	if (!mounted) {
		return (
			<div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border">
				<Loader2 className="w-4 h-4 animate-spin" />
				<span className="text-sm">Checking notifications...</span>
			</div>
		);
	}

	if (!isSupported) {
		return (
			<div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
				<BellOff className="w-4 h-4 text-amber-600" />
				<span className="text-sm text-amber-700">Notifications not supported</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-3 p-4 rounded-lg bg-background/50 border border-gray-700">
			<div className="flex items-center gap-2">
				<Bell className="w-4 h-4 text-gold-deep" />
				<h4 className="font-semibold text-foreground text-sm">Push Notifications</h4>
			</div>

			<p className="text-foreground text-xs leading-relaxed">
				Get instant updates on new collections, exclusive offers, and order status.
			</p>

			{subscription ? (
				<div className="space-y-2">
					<div className="flex items-center gap-2 text-green-600 text-xs">
						<div className="w-2 h-2 bg-green-500 rounded-full"></div>
						Subscribed to notifications
					</div>
					<button
						onClick={unsubscribeFromPush}
						disabled={isLoading}
						className="w-full bg-red-500/10 text-red-600 border border-red-500/20 px-3 py-2 rounded text-sm hover:bg-red-500/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
					>
						{isLoading ? (
							<Loader2 className="w-4 h-4 animate-spin" />
						) : (
							<BellOff className="w-4 h-4" />
						)}
						Unsubscribe
					</button>
				</div>
			) : (
				<button
					onClick={subscribeToPush}
					disabled={isLoading}
					className="w-full bg-gold-deep text-foreground px-3 py-2 rounded text-sm hover:bg-gold-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				>
					{isLoading ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Bell className="w-4 h-4" />
					)}
					Subscribe to Notifications
				</button>
			)}
		</div>
	);
}
