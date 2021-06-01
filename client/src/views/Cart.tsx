import React, { useContext, useEffect } from 'react';

// Context
import UserContext from '../context/user/UserContext';
import ProductContext from '../context/product/ProductContext';

// Component
import CartProductCard from '../components/cart/CartProductCard';
import CartBuyBtn from '../components/cart/CartBuyBtn';

const Cart = () => {
	const { userDatas } = useContext(UserContext);
	const { getCartProducts, products, cartProducts, getProducts } =
		useContext(ProductContext);

	useEffect(() => {
		if (products[0] === undefined) {
			getProducts();
		}

		if (userDatas.token._id !== '0' && products[0] !== undefined) {
			getCartProducts(userDatas.token.cartProducts);
		}

		// eslint-disable-next-line
	}, [userDatas, products]);

	return (
		<div className="w-11/12 mx-auto">
			<h1>My Cart</h1>

			{cartProducts[0] === undefined ? (
				<h1>No cart products</h1>
			) : (
				<div>
					{cartProducts.map((product: any, index: any) => (
						<CartProductCard
							key={index}
							id={product._id}
							price={product.price}
							img={product.img}
							name={product.name}
						/>
					))}

					<CartBuyBtn />
				</div>
			)}
		</div>
	);
};

export default Cart;
