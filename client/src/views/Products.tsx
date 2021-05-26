import React, {useContext, useEffect} from 'react';
import "./scss/products.scss";

// Context
import ProductContext from "../context/product/ProductContext";

// Components
import ProductCard from '../components/products/ProductCard';

const Products = () => {
	const {getProducts, products} = useContext(ProductContext)

	useEffect(() => {
		if (products[0] === undefined) {
			getProducts();
		}
		// eslint-disable-next-line
	}, [])

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