import React, { useContext } from 'react';
import config from '../../config/config';

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
		<div className="flex flex-col items-center bg-gray-700 mb-5 py-4 text-xl res650:flex-row res650:text-center">
			<div className="res650:w-1/5">
				<img
					className="w-24 h-24 object-cover mx-auto"
					src={config.HOST.BACK_END + '/img?folder=products&file=' + img}
					alt={name}
				/>
			</div>

			<h3 className="mb-3 res650:w-2/6">{name}</h3>
			<h3 className="mb-3 res650:w-2/6">
				${price} {config.CURRENCY['USD']}
			</h3>
			<div className="w-1/2 max-w-56 res650:w-1/5">
				<button
					className="bg-red-400 w-full h-8 rounded cursor-pointer focus:outline-none res650:w-1/2 text-black"
					type="button"
					onClick={handleRemoveBtn}
				>
					X
				</button>
			</div>
		</div>
	);
};

export default CartProductCard;
