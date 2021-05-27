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

	const productsMap = products.map((product: any) => {
		return {
			_id: product.id,
			name: product.name,
			description: product.description,
			price: product.price,
			img: product.img,
			file: product.file,
		};
	});

	res.json(productsMap);
};

export const GET_downloadProductFile: Handler = (req, res) => {
	const { id, file } = req.query;
	const reqUser: any = req.user;
	const filePath = '../../productsFiles';

	if (!reqUser.products.includes(id)) {
		return res.json({ message: 'You do not buy this product' });
	}

	res.download(path.join(__dirname, `${filePath}/${file}`));
};
