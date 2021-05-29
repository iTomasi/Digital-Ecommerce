import React from 'react';
import './download.scss';

interface IDownloadProps {
	display: boolean;
	name: string;
	percentage: number;
}

const Download = ({ display, name, percentage }: IDownloadProps) => {
	return (
		<div className={`download ${display ? "active" : "noactive"}`}>
			<h3>{name}</h3>
			<h3>{percentage}%</h3>
			<div className="bar">
				<div className="current" style={{width: `${percentage}%`}}></div>
			</div>
		</div>
	);
};

export default Download;
