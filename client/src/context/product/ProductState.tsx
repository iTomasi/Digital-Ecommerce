import React, { useState } from 'react';
import ProductContext from './ProductContext';
import config from '../../config/config';
import Axios from 'axios';

interface IProducts {
	_id: string;
	name: string;
	description: string;
	price: number;
	img: string;
	file: string;
}

const ProductState = ({ children }: any) => {
	const [products, setProducts] = useState<IProducts[]>([]);

	const [productInfo, setProductInfo] = useState<IProducts>({
		_id: '0',
		name: '',
		description: '',
		price: 0,
		img: '',
		file: '',
	});

	const [productsBuy, setProductsBuy] = useState<IProducts[]>([]);

	const [userProducts, setUserProducts] = useState<any[]>([]);

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

	const getProductById = (id: string) => {
		const filterProduct = products.filter((product: any) => product._id === id);

		if (filterProduct[0] === undefined) {
			setProductInfo((prev: any) => ({
				...prev,
				_id: '0',
			}));
			return;
		}

		setProductInfo(filterProduct[0]);
	};

	const productsToBuy = (arr: IProducts[]) => {
		if (arr[0] === undefined) return;

		setProductsBuy(arr);
	};

	const getUserProducts = (userProducts: string[]) => {
		const getProductBought = userProducts.map((productID: any) => {
			const filterProduct = products.filter(
				(product: any) => product._id === productID
			);

			if (filterProduct[0] === undefined) return false;

			return filterProduct[0];
		});

		setUserProducts(getProductBought);
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				getProducts,
				productInfo,
				getProductById,
				productsBuy,
				productsToBuy,
				userProducts,
				getUserProducts,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductState;
