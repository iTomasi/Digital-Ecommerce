import { Handler } from 'express';
import removeProduct from '../libs/removeProduct';
import Product from '../models/Product';

export const POST_addProduct: Handler = async (req, res) => {
	const { product_name, product_price, product_description } = req.body;
	const product_priceRegExp = new RegExp(/^[0-9]+$/g);

	const reqFiles: any = req.files;

	if (reqFiles.productImg === undefined && reqFiles.productFile === undefined) {
		res.json({ message: 'Upload an img and file please' });
		return;
	} else if (reqFiles.productImg === undefined) {
		await removeProduct('productFile', reqFiles.productFile[0].filename);
		res.json({ message: 'Insert an img [jpeg, png, svg or gif]' });
		return;
	} else if (reqFiles.productFile === undefined) {
		await removeProduct('productImg', reqFiles.productImg[0].filename);
		res.json({ message: 'No product file' });
		return;
	}

	let fileName_img: string = reqFiles.productImg[0].filename;
	let fileName_file: string = reqFiles.productFile[0].filename;

	if (!product_name || !product_price || !product_description) {
		await removeProduct('both', fileName_img, fileName_file);
		res.json({ message: 'Datas missing' });
		return;
	} else if (!product_priceRegExp.test(product_price)) {
		await removeProduct('both', fileName_img, fileName_file);
		res.json({ message: 'Product price should contain numbers' });
		return;
	}

	try {
		const product = await Product.findOne({ name_lower: product_name.toLowerCase() });

		if (product) {
			await removeProduct('both', fileName_img, fileName_file);
			res.json({
				message: `Product ${product_name} is already in the database`,
			});
			return;
		}

		await new Product({
			name: product_name,
			name_lower: product_name.toLowerCase(),
			description: product_description,
			price: product_price,
			productImg: fileName_img,
			productFile: fileName_file,
		}).save();

		res.json({ message: 'Product added successfully' });
	} catch (e) {
		console.log(e);
		console.log('POST_addProduct() admin.controllers Error');
	}
};
