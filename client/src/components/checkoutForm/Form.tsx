import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import './scss/form.scss';

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

	const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});

		if (error) {
			return console.log(error);
		}

		console.log(paymentMethod);
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

			<button type="submit">Pay 40 USD</button>
		</form>
	);
};

export default Form;
