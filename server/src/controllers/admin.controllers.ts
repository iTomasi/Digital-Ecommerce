import { Handler } from 'express';
import removeProduct from "../libs/removeProduct";

export const POST_addProduct: Handler = async (req, res) => {
	const reqFiles: any = req.files;

	if (reqFiles.productImg === undefined && reqFiles.productFile === undefined) {
		res.json({ message: 'Upload an img and file please' });
		return;
	} else if (reqFiles.productImg === undefined) {
        await removeProduct("productFile", reqFiles.productFile[0].filename)
		res.json({ message: 'Insert an img [jpeg, png, svg or gif]' });
		return;
	} else if (reqFiles.productFile === undefined) {
        await removeProduct("productImg", reqFiles.productImg[0].filename)
		res.json({ message: 'No product file' });
		return;
	}

	let fileName_img: string = reqFiles.productImg;
	let fileName_file: string = reqFiles.productFile;
};
