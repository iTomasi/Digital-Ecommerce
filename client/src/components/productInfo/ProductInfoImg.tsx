import React from 'react';
import config from '../../config/config';
import './scss/productInfoImg.scss';

interface IProductInfoImgProps {
	img: string;
	name: string;
}

const ProductInfoImg = ({ img, name }: IProductInfoImgProps) => {
	return (
		<div className="productInfoImg">
			<img
				src={config.HOST.BACK_END + '/img?folder=products&file=' + img}
				alt={name}
			/>
		</div>
	);
};

export default ProductInfoImg;
