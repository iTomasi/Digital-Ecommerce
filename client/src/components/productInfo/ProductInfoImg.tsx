import React from 'react';
import config from '../../config/config';

interface IProductInfoImgProps {
	img: string;
	name: string;
}

const ProductInfoImg = ({ img, name }: IProductInfoImgProps) => {
	return (
		<div className="max-w-350px res650:flex">
			<img
				className="w-full"
				src={config.HOST.BACK_END + '/img?folder=products&file=' + img}
				alt={name}
			/>
		</div>
	);
};

export default ProductInfoImg;
