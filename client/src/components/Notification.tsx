import React from 'react';

interface INotificationProps {
	display: boolean;
	msg: string;
	type: string;
}

const Notification = ({ display, msg, type }: INotificationProps) => {
	const typeFunc = () => {
		if (type === 'error') return 'bg-red-400';
		else if (type === 'success') return 'bg-green-400';

		return 'dou';
	};

	return (
		<div
			className={`fixed top-24 w-10/12 max-w-450px text-xl z-50 py-4 px-2 text-center rounded res450:text-2xl transition-all duration-500 ${typeFunc()} ${
				display ? 'left-5' : '-left-3/4'
			}`}
		>
			{msg}
		</div>
	);
};

export default Notification;
