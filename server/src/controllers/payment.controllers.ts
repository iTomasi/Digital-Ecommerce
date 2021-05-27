import { Handler } from 'express';

export const POST_product: Handler = (req, res) => {
	console.log(req.body);
};
