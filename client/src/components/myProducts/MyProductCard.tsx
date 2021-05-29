import React, { useState, useEffect, useContext } from 'react';
import fileDownload from 'js-file-download';
import path from 'path';
import config from '../../config/config';
import Axios from 'axios';
import './scss/myProductCard.scss';

// Context
import DownloadContext from "../../context/downloadBar/DownloadContext";

interface IProductCard {
	id: string;
	img: string;
	name: string;
	file: string;
}

const MyProductCard = ({ id, img, name, file }: IProductCard) => {
	const {startDownload, isDownloading, updatePercentage, finishDownload} = useContext(DownloadContext);

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

	const downloadFile = async () => {
		const userDownloadingFile = isDownloading();

		if (userDownloadingFile) {
			console.log("Wait, you are downloading a file first");
			return;
		}

		const res = await Axios({
			method: 'GET',
			url: config.HOST.BACK_END + `/download?id=${id}&file=${file}`,
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			responseType: 'blob',
			onDownloadProgress: (e) => {
				const getPercentage = Math.round((e.loaded * 100) / e.total);

				if (!userDownloadingFile) {
					startDownload(name + path.extname(file))
				}

				updatePercentage(getPercentage)
			}
		});
		finishDownload();
		if (res.data.size === 41) return;

		fileDownload(res.data, `${name}${path.extname(file)}`);
	};

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
					<button type="button" onClick={downloadFile}>
						{downloadMessage}
					</button>
				</div>
			</div>
		</div>
	);
};

export default MyProductCard;
