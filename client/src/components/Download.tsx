import React from 'react';

interface IDownloadProps {
	display: boolean;
	name: string;
	percentage: number;
}

const Download = ({ display, name, percentage }: IDownloadProps) => {
	return (
		<div
			className={`bg-gray-700 fixed left-1/2 transform -translate-x-1/2 w-3/4 max-w-450px text-center py-3 px-5 rounded transition-all duration-500 ${
				display ? 'bottom-5' : '-bottom-3/4'
			}`}
		>
			<h3 className="mb-3">{name}</h3>
			<h3>{percentage}%</h3>
			<div className="bg-gray-900 h-5 w-full rounded-full">
				<div
					className="h-full rounded-full bg-green-400"
					style={{ width: `${percentage}%` }}
				></div>
			</div>
		</div>
	);
};

export default Download;
