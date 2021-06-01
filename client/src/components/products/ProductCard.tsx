import React from 'react';
import {useHistory} from "react-router-dom";
import config from '../../config/config';

interface IProductCardProps {
	id: string;
	name: string;
	price: number;
	img: string;
}

const ProductCard = ({ id, name, price, img }: IProductCardProps) => {
	const history = useHistory();

	return (
		<div className="flex flex-col items-center bg-gray-700 text-lg pb-3">
			<img
				className="w-full h-80"
				src={config.HOST.BACK_END + '/img?folder=products&file=' + img}
				alt={name}
			/>

			<div className="flex justify-between w-11/12 items-center mt-5">
				<h3>${price} {config.CURRENCY["USD"]}</h3>
				<button className="bg-white p-2 rounded cursor-pointer w-2/5 focus:outline-none text-black" type="button" onClick={() => history.push("/product/" + id)}>Info</button>
			</div>
		</div>
	);
};

export default ProductCard;
