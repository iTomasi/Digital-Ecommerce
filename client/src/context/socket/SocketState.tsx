import React, {useContext, useEffect, useState} from 'react';
import socketio from 'socket.io-client';
import config from '../../config/config';

// Context
import SocketContext from './SocketContext';
import UserContext from "../user/UserContext";

const SocketState = ({ children }: any) => {
    const [socket, setSocket] = useState<any>(null);

    const {userDatas} = useContext(UserContext);

    useEffect(() => {
        if (userDatas.token.id !== "0") {
            console.log(userDatas);
            setSocket(socketio(config.HOST.BACK_END, {
                query: {id: userDatas.token._id}
            })) 

            return () => socket.close()
        }
    }, [userDatas])

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export default SocketState;
