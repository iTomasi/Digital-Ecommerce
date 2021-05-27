import { Handler } from 'express';
import Stripe from 'stripe';
import config from '../config/config';

const stripeSecretKey = config.STRIPE_SECRET_KEY || 'nada pe';

const stripe = new Stripe(stripeSecretKey, {
	apiVersion: '2020-08-27',
});

export const POST_product: Handler = async (req, res) => {
	const { paymentID, clientName, amount, products } = req.body;

	if (
		!paymentID ||
		!clientName ||
		!amount ||
		!products ||
		products[0] === undefined
	) {
		return res.json({ message: 'Datas missing' });
	}

	const payment = await stripe.paymentIntents.create({
		amount,
		currency: "USD",
		description: "Testing",
		payment_method: paymentID,
		confirm: true
	});

	console.log(payment)
};
