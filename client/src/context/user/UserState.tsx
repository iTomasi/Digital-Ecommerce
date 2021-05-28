import React, { useState } from 'react';
import UserContext from './UserContext';
import config from '../../config/config';
import Axios from 'axios';

interface IUserDatas {
	token: {
		id: string;
		username: string;
		email: string;
		img: string;
		rank: string[];
		cartProducts: string[];
		products: string[];
	};
	auth: boolean;
}

const UserState = ({ children }: any) => {
	const [userDatas, setUserDatas] = useState<IUserDatas>({
		token: {
			id: '0',
			username: '',
			email: '',
			img: '',
			rank: ['admin'],
			cartProducts: [],
			products: [],
		},
		auth: true,
	});

	const isUserAuthenticated = async () => {
		try {
			const res = await Axios({
				method: 'GET',
				url: config.HOST.BACK_END + '/auth/',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});

			setUserDatas(res.data);
		} catch (e) {
			console.log('No authenticated');
			setUserDatas((prev: any) => ({
				...prev,
				token: {
					...prev.token,
					rank: [],
				},
				auth: false,
			}));
		}
	};

	const addCartProduct = (id: string) => {
		if (
			!userDatas.token.cartProducts.includes(id) &&
			!userDatas.token.products.includes(id)
		) {
			setUserDatas((prev: any) => ({
				...prev,
				token: {
					...prev.token,
					cartProducts: [...userDatas.token.cartProducts, id],
				},
			}));

			return true;
		}

		return false;
	};

	return (
		<UserContext.Provider
			value={{
				userDatas,
				isUserAuthenticated,
				addCartProduct,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserState;
