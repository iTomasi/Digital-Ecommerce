import React, { useContext } from 'react';
import {useHistory} from "react-router-dom";
import './scss/productInfoBtns.scss';

// Context
import ProductContext from '../../context/product/ProductContext';
import SocketContext from "../../context/socket/SocketContext";

const ProductInfoBtns = () => {
	const history = useHistory();
	const { productInfo, productsToBuy } = useContext(ProductContext);
	const socket: any = useContext(SocketContext);

	const handleBtnAddCart = () => {
		console.log('btnAddCart Btn');
		console.log(productInfo);
		socket.emit("cart:product", productInfo._id);
	};

	const handleBtnBuyNow = () => {
		productsToBuy([productInfo]);
		history.push("/checkout");
	};

	return (
		<div className="productInfoBtns">
			<button type="button" onClick={handleBtnAddCart}>
				Add to Cart
			</button>
			<h3>Or</h3>
			<button type="button" onClick={handleBtnBuyNow}>
				Buy Now
			</button>
		</div>
	);
};

export default ProductInfoBtns;
