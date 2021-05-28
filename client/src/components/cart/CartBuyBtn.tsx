import React, { useState, useContext, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import config from '../../config/config';
import './scss/cartBuyBtn.scss';

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
		<div className="cartBuyBtn">
			<h3>
				Total Price: ${totalPrice} {config.CURRENCY['USD']}
			</h3>

			<button type="button" onClick={() => {
				productsToBuy(cartProducts);
				history.push("/checkout")
			}}>Purchase Products</button>
		</div>
	);
};

export default CartBuyBtn;
