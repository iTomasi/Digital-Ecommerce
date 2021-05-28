import React, { useContext, useEffect, useState, useRef } from 'react';
import socketio from 'socket.io-client';
import config from '../../config/config';

// Context
import SocketContext from './SocketContext';
import UserContext from '../user/UserContext';

const SocketState = ({ children }: any) => {
	const [socket, setSocket] = useState<any>(null);
	const socketConnected = useRef(false);

	const { userDatas } = useContext(UserContext);

	useEffect(() => {
		if (userDatas.token.id !== '0' && !socketConnected.current) {
			console.log('Aloja');
			const newSocket: any = socketio(config.HOST.BACK_END, {
				query: {
					id: userDatas.token._id,
					cartProducts: userDatas.token.cartProducts,
					products: userDatas.token.products,
				},
			});
			setSocket(newSocket);
			socketConnected.current = true;
		}

		// eslint-disable-next-line
	}, [userDatas]);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export default SocketState;
