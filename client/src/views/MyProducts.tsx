import React, { useContext, useEffect } from 'react';
import './scss/myProducts.scss';

// Context
import UserContext from '../context/user/UserContext';
import ProductContext from '../context/product/ProductContext';

// Components
import MyProductCard from '../components/myProducts/MyProductCard';

const MyProducts = () => {
	const { userDatas } = useContext(UserContext);
	const { userProducts, getUserProducts, getProducts, products } =
		useContext(ProductContext);

	useEffect(() => {
		if (products[0] === undefined) {
			getProducts();
		}

		getUserProducts(userDatas.token.products);
	}, [products, userDatas]);

	return (
		<div className="myProducts">
			<h1>Products</h1>
			<div className="grid">
				{userProducts.map((product: any, index: any) =>
					!product ? (
						<></>
					) : (
						<MyProductCard
							key={index}
							id={product._id}
							name={product.name}
							img={product.img}
							file={product.file}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default MyProducts;
