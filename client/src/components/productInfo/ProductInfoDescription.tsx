import React from 'react';
import config from "../../config/config";

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
		<div className="text-center py-3 w-5/6">
			<h2 className="mb-3 text-2xl">{name}</h2>
			<p className="mb-3 text-xl">{description}</p>
			<h3 className="mb-3 text-xl">${price} {config.CURRENCY["USD"]}</h3>
			{children}
		</div>
	);
};

export default ProductInfoDescription;
