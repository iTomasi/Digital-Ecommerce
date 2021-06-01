import React, { useContext, useEffect } from 'react';

// Context
import ProductContext from '../context/product/ProductContext';

// Components
import ProductCard from '../components/products/ProductCard';

const Products = () => {
	const { getProducts, products } = useContext(ProductContext);

	useEffect(() => {
		if (products[0] === undefined) {
			getProducts();
		}
		// eslint-disable-next-line
	}, []);

	return (
		<div className="products">
			<div className="grid grid-cols-2 justify-center gap-5 grid-3:grid-cols-3 grid-4:grid-cols-4">
				{products.map((product: any, index: any) => (
					<ProductCard
						key={index}
						id={product._id}
						name={product.name}
						price={product.price}
						img={product.img}
					/>
				))}
			</div>
		</div>
	);
};

export default Products;
