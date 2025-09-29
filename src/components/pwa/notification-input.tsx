'use client';

import { useState } from 'react';
import { sendNotification } from '@/app/actions';

export function NotificationInput() {
	const [message, setMessage] = useState('');

	async function handleSend() {
		if (!message.trim()) return;
		await sendNotification(message);
		setMessage('');
	}

	return (
		<div className="flex flex-col gap-3 border p-4 rounded-md w-fit">
			<h3 className="font-semibold">Send Push Notification</h3>
			<input
				type="text"
				placeholder="Enter notification message"
				value={message}
				onChange={e => setMessage(e.target.value)}
				className="p-2 border rounded-md w-64"
			/>
			<button
				onClick={handleSend}
				className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
			>
				Send
			</button>
		</div>
	);
}
