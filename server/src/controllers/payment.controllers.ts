import { Handler } from 'express';
import Stripe from 'stripe';
import Product from '../models/Product';
import Account from '../models/Account';
import config from '../config/config';

const stripeSecretKey = config.STRIPE_SECRET_KEY || 'nada pe';

const stripe = new Stripe(stripeSecretKey, {
	apiVersion: '2020-08-27',
});

export const POST_product: Handler = async (req, res) => {
	const { paymentID, clientName, amount, products } = req.body;
	const reqUser: any = req.user;

	if (
		!paymentID ||
		!clientName ||
		!amount ||
		!products ||
		products[0] === undefined
	) {
		return res.json({ message: 'Datas missing' });
	}

	let countPrice: number = 0;
	const productsName: string[] = [];
	const productsID: any = [];

	try {
		const productsDB = await Product.find();
		const user = await Account.findOne({ _id: reqUser._id });

		for (let i = 0; i < products.length; i++) {
			const productID = products[i]._id;
			const filterProduct = productsDB.filter(
				(productDB: any) => productDB._id.toString() === productID
			);

			if (filterProduct[0] === undefined) {
				return res.json({ message: 'Maybe you are editing the products' });
			} else if (user?.products[0] !== undefined) {
				const userHaveThisItem = user?.products.includes(productID);

				if (userHaveThisItem)
					return res.json({
						message: 'You already have this product: ' + products[i].name,
					});
			}

			countPrice += filterProduct[0].price;
			productsID.push(filterProduct[0]._id.toString());
			productsName.push(filterProduct[0].name);
		}

		if (countPrice !== amount) {
			return res.json({ message: 'Amount are not same' });
		}

		await stripe.paymentIntents.create({
			amount: countPrice * 100,
			currency: 'USD',
			description: productsName.join(', '),
			payment_method: paymentID,
			confirm: true,
		});

		productsID.map((product: any) => user?.products.push(product));
		await user?.save();

		res.json({ message: 'Purchase made satisfactorily' });
	} catch (e) {
		res.json({ message: e.raw.message });
		console.log(e);
		console.log('POST_product() payment.controllers Error');
	}
};
