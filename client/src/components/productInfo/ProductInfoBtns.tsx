import React, { useContext } from 'react';
import {useHistory} from "react-router-dom";
import './scss/productInfoBtns.scss';

// Context
import ProductContext from '../../context/product/ProductContext';

const ProductInfoBtns = () => {
	const history = useHistory();
	const { productInfo, productsToBuy } = useContext(ProductContext);

	const handleBtnAddCart = () => {
		console.log('btnAddCart Btn');
		console.log(productInfo);
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
