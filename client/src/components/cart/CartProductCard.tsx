import React, { useContext } from 'react';
import config from '../../config/config';
import './scss/cartProductCard.scss';

// Context
import SocketContext from '../../context/socket/SocketContext';
import UserContext from '../../context/user/UserContext';

interface ICartProductCardProps {
	id: string;
	img: string;
	name: string;
	price: number;
}

const CartProductCard = ({ id, img, name, price }: ICartProductCardProps) => {
	const socket: any = useContext(SocketContext);
	const { removeCartProduct } = useContext(UserContext);

	const handleRemoveBtn = () => {
		const isRemoved = removeCartProduct(id);
		if (isRemoved) {
			socket.emit('cart:product:remove', id);
		}
	};

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
				<button type="button" onClick={handleRemoveBtn}>
					X
				</button>
			</div>
		</div>
	);
};

export default CartProductCard;
