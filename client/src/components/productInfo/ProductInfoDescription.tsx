import React from 'react';
import './scss/productInfoDescription.scss';

interface IProductInfoDescription {
	name: string;
	description: string;
	price: number;
	children: React.ReactNode;
}

const ProductInfoDescription = ({
	name,
	description,
	price,
	children,
}: IProductInfoDescription) => {
	return (
		<div className="productInfoDescription">
			<h2 className="name">{name}</h2>
			<p className="description">{description}</p>
			<h3 className="price">${price}</h3>
			{children}
		</div>
	);
};

export default ProductInfoDescription;
