import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

// Context
import ProductContext from '../context/product/ProductContext';

// Components
import ProductInfoImg from '../components/productInfo/ProductInfoImg';
import ProductInfoDescription from '../components/productInfo/ProductInfoDescription';
import ProductInfoBtns from '../components/productInfo/ProductInfoBtns';

const ProductInfo = () => {
	const { getProductById, productInfo, products, getProducts } =
		useContext(ProductContext);

	const { id }: any = useParams();

	useEffect(() => {
		if (products[0] === undefined) {
			getProducts();
		}

		getProductById(id);

		// eslint-disable-next-line
	}, [products]);

	return (
		<div className="w-11/12 res650:max-w-900px mx-auto">
			{productInfo._id !== '0' ? (
				<div className="flex flex-col items-center bg-gray-700 res650:flex-row">
					<ProductInfoImg img={productInfo.img} name={productInfo.name} />
					<ProductInfoDescription
						name={productInfo.name}
						price={productInfo.price}
						description={productInfo.description}
					>
						<ProductInfoBtns />
					</ProductInfoDescription>
				</div>
			) : (
				<>
					<h1>Product not found</h1>
				</>
			)}
		</div>
	);
};

export default ProductInfo;
