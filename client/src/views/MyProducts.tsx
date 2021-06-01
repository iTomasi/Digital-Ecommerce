import React, { useContext, useEffect } from 'react';

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
		// eslint-disable-next-line
	}, [products, userDatas]);

	return (
		<div className="myProducts">
			<h1 className="text-center text-2xl mb-5">My Products</h1>
			<div className="grid grid-cols-2 justify-center gap-5 grid-3:grid-cols-3 grid-4:grid-cols-4">
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
