import React from 'react';

// Components
import DK_HEADER_LEFT from './DK_HEADER_LEFT';
import Navegation from '../Navegation';
import DK_HEADER_RIGHT from './DK_HEADER_RIGHT';

const DK_HEADER = () => {
	return (
		<header className="flex bg-gray-700 h-20 items-center text-center text-2xl">
			<DK_HEADER_LEFT />
			<Navegation />
			<DK_HEADER_RIGHT />
		</header>
	);
};

export default DK_HEADER;
