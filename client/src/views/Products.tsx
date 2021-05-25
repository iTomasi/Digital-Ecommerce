import React from 'react';
import "./scss/products.scss";

// Components
import ProductCard from '../components/products/ProductCard';

const Products = () => {
	return (
		<div className="products">
			<div className="grid">
				<ProductCard
					id={'0'}
					name="Clean Code"
					img="clean_code.jpg"
					price={13}
				/>
				<ProductCard
					id={'0'}
					name="Clean Code"
					img="clean_code.jpg"
					price={13}
				/>
				<ProductCard
					id={'0'}
					name="Clean Code"
					img="clean_code.jpg"
					price={13}
				/>
                <ProductCard
					id={'0'}
					name="Clean Code"
					img="clean_code.jpg"
					price={13}
				/>
                <ProductCard
					id={'0'}
					name="Clean Code"
					img="clean_code.jpg"
					price={13}
				/>
                <ProductCard
					id={'0'}
					name="Clean Code"
					img="clean_code.jpg"
					price={13}
				/>
			</div>
		</div>
	);
};

export default Products;