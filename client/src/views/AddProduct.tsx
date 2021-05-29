import React, { useState, useContext } from 'react';
import config from '../config/config';
import Axios from 'axios';
import './scss/form.scss';

// Context
import NotificationContext from '../context/notification/NotificationContext';

interface IUploadPercentage {
	display: boolean;
	percentage: number;
}

interface IFileName {
	productImg: string;
	productFile: string;
}

const AddProduct = () => {
	const { showNotification } = useContext(NotificationContext);

	const defaultFileNameValues: any = {
		productImg: 'Select img',
		productFile: 'Select file',
	};

	const [uploadPercentage, setUploadPercentage] = useState<IUploadPercentage>({
		display: false,
		percentage: 0,
	});

	const [fileName, setFileName] = useState<IFileName>({
		productImg: defaultFileNameValues.productImg,
		productFile: defaultFileNameValues.productFile,
	});

	const sendProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const product_priceRegExp = new RegExp(/^[0-9]+$/g);

		const formData = new FormData(e.currentTarget);
		const product_name: any = formData.get('product_name');
		const product_price: any = formData.get('product_price');
		const product_description: any = formData.get('product_description');
		const productImg: any = formData.get('productImg');
		const productFile: any = formData.get('productFile');

		if (!product_name) return showNotification('error', 'Product name missing');
		else if (!product_price)
			return showNotification('error', 'Product price missing');
		else if (!product_priceRegExp.test(product_price))
			return showNotification('error', 'Product price should contain numbers');
		else if (!product_description)
			return showNotification('error', 'Product description missing');
		else if (productImg.size === 0)
			return showNotification('error', 'Product img missing');
		else if (productFile.size === 0)
			return showNotification('error', 'Product file missing');

		try {
			const res = await Axios.post(
				config.HOST.BACK_END + '/admin/add-product',
				formData,
				{
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
					onUploadProgress: (e) => {
						const progressPercentage = Math.round((e.loaded * 100) / e.total);

						if (!uploadPercentage.display) {
							setUploadPercentage((prev: any) => ({
								...prev,
								display: true,
								percentage: progressPercentage,
							}));
							return;
						}

						setUploadPercentage((prev: any) => ({
							...prev,
							percentage: progressPercentage,
						}));
					},
				}
			);

			if (res.data.message !== 'Product added successfully')
				return showNotification('error', res.data.message);

			showNotification('success', res.data.message);

			setTimeout(() => {
				window.location.href = '/';
			}, 2000);
		} catch (e) {
			console.log(e);
			console.log(
				'AddProduct() axios Error probably not admin rank or server offline.'
			);
		}
	};

	const handleInputFile = (e: any) => {
		const getInputName = e.currentTarget.name;

		try {
			const getFile = e.currentTarget.files[0];
			const getFileName = getFile.name;

			if (getInputName === 'productImg') {
				if (
					getFile.type === 'image/jpeg' ||
					getFile.type === 'image/png' ||
					getFile.type === 'image/gif' ||
					getFile.type === 'image/svg+xml'
				) {
					setFileName((prev: any) => ({
						...prev,
						productImg: getFileName,
					}));
					return;
				}

				console.log('Only img [jpeg, png, svg or gif]');
				e.currentTarget.value = null;

				setFileName((prev: any) => ({
					...prev,
					productImg: defaultFileNameValues.productImg,
				}));
				return;
			}

			setFileName((prev: any) => ({
				...prev,
				[getInputName]: getFileName,
			}));
		} catch (e) {
			setFileName((prev: any) => ({
				...prev,
				[getInputName]: defaultFileNameValues[getInputName],
			}));
		}
	};

	return (
		<form className="iw_form" onSubmit={sendProduct}>
			<div className="formSection">
				<label>Product Name</label>
				<input type="text" placeholder="Product Name..." name="product_name" />
			</div>

			<div className="formSection">
				<label>Product Price</label>
				<input
					type="text"
					placeholder="Product Price..."
					name="product_price"
				/>
			</div>

			<div className="formSection">
				<label>Product Img</label>
				<div className="formFile">
					<label htmlFor="inputFile0">IMG</label>
					<span>
						{fileName.productImg.length >= 13 &&
						fileName.productImg !== defaultFileNameValues.productImg
							? fileName.productImg.substring(0, 13) + '...'
							: fileName.productImg}
					</span>
					<input
						id="inputFile0"
						type="file"
						name="productImg"
						onChange={handleInputFile}
						style={{ display: 'none' }}
					/>
				</div>
			</div>

			<div className="formSection">
				<label>Product File</label>
				<div className="formFile">
					<label htmlFor="inputFile1">File</label>
					<span>
						{fileName.productFile.length >= 13 &&
						fileName.productFile !== defaultFileNameValues.productFile
							? fileName.productFile.substring(0, 13) + '...'
							: fileName.productFile}
					</span>
					<input
						id="inputFile1"
						type="file"
						name="productFile"
						onChange={handleInputFile}
						style={{ display: 'none' }}
					/>
				</div>
			</div>

			<div
				className="formPercentage"
				style={{ display: uploadPercentage.display ? 'block' : 'none' }}
			>
				<div className="bar">
					<div
						className="current"
						style={{ width: `${uploadPercentage.percentage}%` }}
					></div>
				</div>
			</div>

			<div className="formSection">
				<label>Product Description</label>
				<textarea
					placeholder="Product Description...."
					name="product_description"
				></textarea>
			</div>

			<button type="submit">Add Product</button>
		</form>
	);
};

export default AddProduct;
