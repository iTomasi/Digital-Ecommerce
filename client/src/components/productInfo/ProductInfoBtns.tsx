import React, { useContext } from 'react';
import './scss/productInfoBtns.scss';

// Context
import ProductContext from '../../context/product/ProductContext';

const ProductInfoBtns = () => {
	const { productInfo } = useContext(ProductContext);

	const handleBtnAddCart = () => {
		console.log('btnAddCart Btn');
		console.log(productInfo);
	};

	const handleBtnBuyNow = () => {
		console.log('btnBuyNow');
		console.log(productInfo);
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
