import React from 'react';
import {useHistory} from "react-router-dom";
import config from '../../config/config';
import "./scss/productCard.scss";

interface IProductCardProps {
	id: string;
	name: string;
	price: number;
	img: string;
}

const ProductCard = ({ id, name, price, img }: IProductCardProps) => {
	const history = useHistory();

	return (
		<div className="productCard">
			<img
				src={config.HOST.BACK_END + '/img?folder=products&file=' + img}
				alt={name}
			/>

			<div className="info">
				<h3>${price} {config.CURRENCY["USD"]}</h3>
				<button type="button" onClick={() => history.push("/product/" + id)}>Info</button>
			</div>
		</div>
	);
};

export default ProductCard;
