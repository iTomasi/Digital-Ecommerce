import React from 'react';
import config from '../../config/config';
import './scss/cartProductCard.scss';

interface ICartProductCardProps {
	id: string;
	img: string;
	name: string;
	price: number;
}

const CartProductCard = ({ id, img, name, price }: ICartProductCardProps) => {
	return (
		<div className="cartProductCard">
			<div className="img">
				<img
					src={config.HOST.BACK_END + '/img?folder=products&file=' + img}
					alt={name}
				/>
			</div>

			<h3 className="name">{name}</h3>
			<h3 className="price">
				${price} {config.CURRENCY['USD']}
			</h3>
			<div className="removeProduct">
				<button type="button">X</button>
			</div>
		</div>
	);
};

export default CartProductCard;
