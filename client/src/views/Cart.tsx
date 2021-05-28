import React, { useContext, useEffect } from 'react';

// Context
import UserContext from '../context/user/UserContext';
import ProductContext from '../context/product/ProductContext';

const Cart = () => {
	const { userDatas } = useContext(UserContext);
	const { getCartProducts, products, cartProducts} = useContext(ProductContext);

	useEffect(() => {
		if (userDatas.token.id !== "0" && products.length !== 0) {
			getCartProducts(userDatas.token.cartProducts)
		}

		// eslint-disable-next-line
	}, [userDatas, products]);

	return (
		<div className="cart">
			<h1>My Cart</h1>

			<div className="products">
				{
					cartProducts[0] === undefined
					? <></>
					:
					cartProducts.map((product: any) => (
						<h1>{product.name}</h1>
					))
				}
			</div>
		</div>
	);
};

export default Cart;
