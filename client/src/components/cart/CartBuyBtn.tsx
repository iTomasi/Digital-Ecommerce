import React, { useState, useContext, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import config from '../../config/config';

// Context
import ProductContext from '../../context/product/ProductContext';

const CartBuyBtn = () => {
	const history = useHistory();
	const { cartProducts, productsToBuy } = useContext(ProductContext);

	const [totalPrice, setTotalPrice] = useState<number>(0);

	useEffect(() => {
		let count: number = 0;

		cartProducts.map((product: any) => {
			return (count += product.price);
		});

		setTotalPrice(count);
	}, [cartProducts]);

	return (
		<div className="flex flex-col items-center text-xl">
			<h3 className="mb-3">
				Total Price: ${totalPrice} {config.CURRENCY['USD']}
			</h3>

			<button className="bg-white text-black w-8/12 max-w-xs h-12 cursor-pointer focus:outline-none" type="button" onClick={() => {
				productsToBuy(cartProducts);
				history.push("/checkout")
			}}>Purchase Products</button>
		</div>
	);
};

export default CartBuyBtn;
