import React, { useState } from 'react';
import config from '../config/config';
import Axios from 'axios';
import './scss/form.scss';

interface IUploadPercentage {
	display: boolean;
	percentage: number;
}

interface IFileName {
    productImg: string,
    productFile: string
}


const AddProduct = () => {
    const defaultFileNameValues: any = {
        productImg: "Select img",
        productFile: "Select file"
    }

	const [uploadPercentage, setUploadPercentage] = useState<IUploadPercentage>({
		display: false,
		percentage: 0,
	});

	const [fileName, setFileName] = useState<IFileName>({
        productImg: defaultFileNameValues.productImg,
        productFile: defaultFileNameValues.productFile
    });

	const sendProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const res = await Axios.post(
			config.HOST.BACK_END + '/admin/add-product',
			formData,
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },

				onUploadProgress: (e) => {},
			}
		);

		console.log(res.data);
	};

	const handleInputFile = (e: any) => {
        const getInputName = e.currentTarget.name;

		try {
			const getFileName = e.currentTarget.files[0].name;

			setFileName((prev: any) => (
                {
                    ...prev,
                    [getInputName]: getFileName
                }
            ))
		} catch (e) {
			setFileName((prev: any) => (
                {
                    ...prev,
                    [getInputName]: defaultFileNameValues[getInputName]
                }
            ))
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
                        {
                            fileName.productImg.length >= 13 && fileName.productImg !== defaultFileNameValues.productImg
                            ? fileName.productImg.substring(0, 13) + "..."
                            : fileName.productImg
                        }
                    </span>
                    <input id="inputFile0" type="file" name="productImg" onChange={handleInputFile} style={{display: "none"}}/>
                </div>
            </div>

			<div className="formSection">
                <label>Product File</label>
				<div className="formFile">
					<label htmlFor="inputFile1">File</label>
					<span>
						{fileName.productFile.length >= 13 && fileName.productFile !== defaultFileNameValues.productFile
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
