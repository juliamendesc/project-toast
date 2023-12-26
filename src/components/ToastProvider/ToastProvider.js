import React from 'react';

export const ToastContext = React.createContext();

export const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastProvider({ children }) {
	const [toasts, setToasts] = React.useState([]);
	const [message, setMessage] = React.useState('');
	const [variant, setVariant] = React.useState('');

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

	React.useEffect(() => {
		function handleKeyDown(event) {
			if (event.key === 'Escape') {
				setToasts([]);
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

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

export default ToastProvider;
