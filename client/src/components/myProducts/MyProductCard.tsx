import React, { useState, useEffect } from 'react';
import config from '../../config/config';
import './scss/myProductCard.scss';

interface IProductCard {
	id: string;
	img: string;
	name: string;
}

const MyProductCard = ({ id, img, name }: IProductCard) => {
	const [downloadMessage, setDownloadMessage] = useState<string>('Download');

	useEffect(() => {
		const resizeFunc = () => {
			const innerWidth: number = window.innerWidth;

			if (
				(innerWidth > 0 && innerWidth <= 425) ||
				(innerWidth >= 550 && innerWidth <= 620)
			) {
				return setDownloadMessage('DL..');
			}

			setDownloadMessage('Download');
		};

		window.addEventListener('resize', resizeFunc);
		return () => window.removeEventListener('resize', resizeFunc);
	}, []);

	return (
		<div className="myProductCard">
			<img
				src={config.HOST.BACK_END + '/img?folder=products&file=' + img}
				alt={name}
			/>

			<div className="info">
				<h3>{name}</h3>

				<div className="buttons">
					<button type="button">Info</button>
					<button type="button">{downloadMessage}</button>
				</div>
			</div>
		</div>
	);
};

export default MyProductCard;
