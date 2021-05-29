import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './scss/productInfoBtns.scss';

// Context
import ProductContext from '../../context/product/ProductContext';
import SocketContext from '../../context/socket/SocketContext';
import UserContext from '../../context/user/UserContext';

const ProductInfoBtns = () => {
	const history = useHistory();
	const { productInfo, productsToBuy } = useContext(ProductContext);
	const socket: any = useContext(SocketContext);
	const { addCartProduct, userDatas } = useContext(UserContext);

	const handleBtnAddCart = () => {
		const isAdded = addCartProduct(productInfo._id);
		if (isAdded) {
			socket.emit('cart:product', productInfo._id);
		}
		history.push('/products');
	};

	const handleBtnBuyNow = () => {
		productsToBuy([productInfo]);
		history.push('/checkout');
	};

	return (
		<div className="productInfoBtns">
			{userDatas.token.cartProducts.includes(productInfo._id) ? (
				<h2>Product Already in the cart</h2>
			) : (
				<>
					<button type="button" onClick={handleBtnAddCart}>
						Add to Cart
					</button>
					<h3>Or</h3>
					<button type="button" onClick={handleBtnBuyNow}>
						Buy Now
					</button>
				</>
			)}
		</div>
	);
};

export default ProductInfoBtns;
