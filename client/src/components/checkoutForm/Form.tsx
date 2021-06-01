import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import config from '../../config/config';
import Axios from 'axios';

// Context
import ProductContext from '../../context/product/ProductContext';
import SocketContext from '../../context/socket/SocketContext';
import UserContext from '../../context/user/UserContext';
import NotificationContext from '../../context/notification/NotificationContext';

const cardElement_Options: StripeCardElementOptions = {
	iconStyle: 'solid',
	style: {
		base: {
			fontSize: '20px',
			color: '#f9f9f9',
		},
	},
};

const Form = () => {
	const history = useHistory();
	const stripe: any = useStripe();
	const elements: any = useElements();

	const { productsBuy } = useContext(ProductContext);
	const socket: any = useContext(SocketContext);
	const { pushUserProductsAndResetCartProducts } = useContext(UserContext);
	const { showNotification } = useContext(NotificationContext);

	const addingProductPrice = () => {
		let count = 0;

		productsBuy.map((product: any) => {
			return (count += product.price);
		});

		return count;
	};

	const totalPrice = useRef(addingProductPrice());

	const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});

		if (error) {
			return console.log(error);
		}

		try {
			const res = await Axios.post(
				config.HOST.BACK_END + '/payment/purchase-products',
				{
					paymentID: paymentMethod.id,
					clientName: formData.get('name'),
					amount: totalPrice.current,
					products: productsBuy,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);

			if (res.data.message !== 'Purchase made satisfactorily')
				return showNotification('error', res.data.message);

			socket.emit('cart:product:reset', 'reset');
			pushUserProductsAndResetCartProducts(productsBuy);
			showNotification('success', res.data.message);
			history.push('/my-products');
		} catch (e) {
			console.log(e);
			console.log('handleForm() Error');
		}
	};

	return (
		<form
			className="bg-gray-700 w-11/12 max-w-500px mx-auto flex flex-col items-center text-xl text-white py-5"
			onSubmit={handleForm}
		>
			<div className="flex flex-col items-center mb-5 w-11/12">
				<label className="mb-4">Name</label>
				<input
					className="bg-gray-900 w-full focus:outline-none p-2"
					type="text"
					placeholder="Name..."
					name="name"
				/>
			</div>

			<div className="flex flex-col items-center mb-5 w-11/12">
				<CardElement
					options={cardElement_Options}
					className="bg-gray-900 p-2 w-full"
				/>
			</div>

			<button
				className="w-4/5 h-10 border-2 border-green-400 cursor-pointer hover:bg-green-400 hover:text-black"
				type="submit"
			>
				Pay {totalPrice.current} {config.CURRENCY['USD']}
			</button>
		</form>
	);
};

export default Form;
