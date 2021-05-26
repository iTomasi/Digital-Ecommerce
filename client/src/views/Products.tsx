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
				{
					products.map((product: any, index: any) => (
						<ProductCard key={index} id={product._id} name={product.name} price={product.price} img={product.img} />
					))
				}
			</div>
		</div>
	);
};

export default Products;