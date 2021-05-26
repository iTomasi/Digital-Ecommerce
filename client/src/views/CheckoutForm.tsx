import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Components
import Form from '../components/checkoutForm/Form';

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "nada papu"

const stripePromises = loadStripe(stripePublicKey);

const CheckoutForm = () => {
	return (
		<Elements stripe={stripePromises}>
			<Form />
		</Elements>
	);
};

export default CheckoutForm;
