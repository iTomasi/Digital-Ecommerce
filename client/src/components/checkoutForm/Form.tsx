import React, {useContext, useRef} from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import config from "../../config/config";
import Axios from "axios";
import './scss/form.scss';

// Context
import ProductContext from "../../context/product/ProductContext";

const cardElement_Options: StripeCardElementOptions = {
	iconStyle: 'solid',
	style: {
		base: {
			fontSize: '20px',
			color: '#f9f9f9',
			backgroundColor: '#0b0c10',
		},
	},
};

const Form = () => {
	const stripe: any = useStripe();
	const elements: any = useElements();
	const {productsBuy} = useContext(ProductContext);

	const addingProductPrice = () => {
		let count = 0;

		for (let i = 0; i < productsBuy.length; i++) {
			count += productsBuy[i].price
		};

		return count
	}

	const totalPrice = useRef(addingProductPrice())

	

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

		const res = await Axios.post(config.HOST.BACK_END + "/payment/purchase-products", {
			paymentID: paymentMethod.id,
			clientName: formData.get("name"),
			amount: (totalPrice.current * 100),
			products: productsBuy
		}, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		});

		console.log(res.data);
	};

	return (
		<form className="stripe_form" onSubmit={handleForm}>
			<div className="formSection">
				<label>Name</label>
				<input type="text" placeholder="Name..." name="name" />
			</div>

			<div className="formSection">
				<CardElement
					options={cardElement_Options}
					className="stripe__cardElement"
				/>
			</div>

			<button type="submit">Pay {totalPrice.current} {config.CURRENCY["USD"]}</button>
		</form>
	);
};

export default Form;
