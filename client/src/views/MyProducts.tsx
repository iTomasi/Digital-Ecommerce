import React from 'react';
import './scss/myProducts.scss';

// Components
import MyProductCard from '../components/myProducts/MyProductCard';

const MyProducts = () => {
	return (
		<div className="myProducts">
			<h1>Products</h1>
			<div className="grid">
				<MyProductCard
					id="1"
					name="Javascript book"
					img="productimg__1622004741420.jpg"
				/>
				<MyProductCard
					id="1"
					name="Javascript book"
					img="productimg__1622004741420.jpg"
				/>
				<MyProductCard
					id="1"
					name="Javascript book"
					img="productimg__1622004741420.jpg"
				/>
				<MyProductCard
					id="1"
					name="Javascript book"
					img="productimg__1622004741420.jpg"
				/>
				<MyProductCard
					id="1"
					name="Javascript book"
					img="productimg__1622004741420.jpg"
				/>
				<MyProductCard
					id="1"
					name="Javascript book"
					img="productimg__1622004741420.jpg"
				/>
			</div>
		</div>
	);
};

export default MyProducts;
