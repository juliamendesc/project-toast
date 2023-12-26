import React from 'react';
import useKeydown from '../hooks/use-keydown';

export const ToastContext = React.createContext();

export const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

export function ToastProvider({ children }) {
	const [toasts, setToasts] = React.useState([]);
	const [message, setMessage] = React.useState('');
	const [variant, setVariant] = React.useState('');
	const handleEscape = React.useCallback(() => {
		setToasts([]);
	}, []);

	function handleCreateToast(event) {
		event.preventDefault();

		const nextToasts = [
			...toasts,
			{
				id: crypto.randomUUID(),
				message,
				variant,
			},
		];

		setToasts(nextToasts);

		setMessage('');
		setVariant(VARIANT_OPTIONS[0]);
	}

	function handleDismiss(id) {
		const nextToasts = toasts.filter(toast => {
			return toast.id !== id;
		});

		setToasts(nextToasts);
	}

	useKeydown('Escape', handleEscape);

	return (
		<ToastContext.Provider
			value={{
				toasts,
				message,
				variant,
				setMessage,
				setVariant,
				handleCreateToast,
				handleDismiss,
			}}>
			{children}
		</ToastContext.Provider>
	);
}
