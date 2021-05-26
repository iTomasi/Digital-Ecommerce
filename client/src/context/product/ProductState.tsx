import React, { useState } from 'react';
import ProductContext from './ProductContext';
import config from '../../config/config';
import Axios from 'axios';

interface IProducts {
	id: string;
	name: string;
	description: string;
	price: number;
	img: string;
}

const ProductState = ({ children }: any) => {
	const [products, setProducts] = useState<IProducts[]>([]);

	const getProducts = async () => {
		try {
			const res = await Axios.get(config.HOST.BACK_END + '/products', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});

			setProducts(res.data);
		} catch (e) {
			console.log(e);
			console.log(
				'getProducts() Error probably no authenticated or server offline'
			);
		}
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				getProducts,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductState;
