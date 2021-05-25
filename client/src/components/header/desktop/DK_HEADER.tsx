import React from 'react';
import './dk_header.scss';

// Components
import DK_HEADER_LEFT from './DK_HEADER_LEFT';
import Navegation from '../Navegation';
import DK_HEADER_RIGHT from './DK_HEADER_RIGHT';

const DK_HEADER = () => {
	return (
		<header className="DK-header">
			<DK_HEADER_LEFT />
			<Navegation />
			<DK_HEADER_RIGHT />
		</header>
	);
};

export default DK_HEADER;
