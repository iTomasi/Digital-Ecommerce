import { Handler } from 'express';
import Product from '../models/Product';
import fsPromises from 'fs';
import path from 'path';

const fs = fsPromises.promises;

export const GET_picture: Handler = async (req, res) => {
	const { folder, file } = req.query;

	if (!folder || !file) return res.send('use ?folder=foldername&file=filename');

	const publicFolderPath = '../../public';

	try {
		await fs.access(
			path.join(__dirname, `${publicFolderPath}/${folder}/${file}`)
		);

		res.sendFile(path.join(__dirname, `${publicFolderPath}/${folder}/${file}`));
	} catch (e) {
		res.send(e.message);
	}
};

export const GET_products: Handler = async (req, res) => {
	const products = await Product.find();

	res.json(products);
};
