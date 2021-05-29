import React, { useState, useEffect, useRef } from 'react';
import NotificationContext from './NotificationContext';

// Components
import Notification from '../../components/Notification';

const NotificationState = ({ children }: any) => {
    const timeoutTime = useRef(3000);

	const [display, setDisplay] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('USername not found please write other');
	const [type, setType] = useState<string>('success');

    useEffect(() => {
        if (!display) return

        const timeout = setTimeout(() => {
            setDisplay(false);
        }, timeoutTime.current)

        return () => clearTimeout(timeout);

    }, [display])

	const showNotification = (typeN: string, messageN: string) => {
		setDisplay(true);
        setType(typeN);
        setMessage(messageN);
	};

	return (
		<NotificationContext.Provider
			value={{
				showNotification,
			}}
		>
			<Notification display={display} msg={message} type={type} />
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationState;
