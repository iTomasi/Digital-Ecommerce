import React, { useState, useContext } from 'react';
import config from '../config/config';
import Axios from 'axios';

// Context
import NotificationContext from '../context/notification/NotificationContext';

// Components
import FormSection from "../components/form/FormSection";
import FormFile from "../components/form/FormFile";
import FormPercentage from "../components/form/FormPercentage";

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
		<form className="bg-gray-700 w-11/12 max-w-450px py-7 flex flex-col items-center text-center text-lg mx-auto" onSubmit={sendProduct}>

			<FormSection
				title="Product Name"
				type="text"
				name="product_name"
				isPassword={false}
			/>

			<FormSection 
				title="Product Price"
				type="text"
				name="product_price"
				isPassword={false}
			/>

			<FormFile
				id="inputFile0"
				title="Product Img"
				file="IMG"
				fileName={fileName.productImg}
				defaultName="Select img"
				name="productImg"
				onChange={handleInputFile}

			/>

			<FormFile 
				id="inputFile1"
				title="Product File"
				file="File"
				fileName={fileName.productFile}
				defaultName="Select file"
				name="productFile"
				onChange={handleInputFile}
			/>

			<FormPercentage 
				display={uploadPercentage.display}
				percentage={uploadPercentage.percentage}
			/>

			<FormSection
				title="Product Description"
				type="textarea"
				name="product_description"
				isPassword={false}
			/>

			<button className="border-2 border-green-400 w-5/6 h-10 hover:bg-green-400 hover:text-black focus:outline-none" type="submit">Add Product</button>
		</form>
	);
};

export default AddProduct;
