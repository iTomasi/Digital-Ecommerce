import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

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
		<div className="flex flex-col items-center w-full">
			{userDatas.token.products.includes(productInfo._id) ? (
				<h2>Product already bought</h2>
			) : userDatas.token.cartProducts.includes(productInfo._id) ? (
				<h2>Product already in your Cart</h2>
			) : (
				<>
					<button className="bg-white text-black text-lg w-1/2 h-10 focus:outline-none cursor-pointer rounded" type="button" onClick={handleBtnAddCart}>
						Add to Cart
					</button>
					<h3 className="my-3">Or</h3>
					<button className="bg-white text-black text-lg w-1/2 h-10 focus:outline-none cursor-pointer rounded" type="button" onClick={handleBtnBuyNow}>
						Buy Now
					</button>
				</>
			)}
		</div>
	);
};

export default ProductInfoBtns;
