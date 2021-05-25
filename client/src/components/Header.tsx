import React, { useState, useEffect } from 'react';

// Components
import DK_HEADER from './header/desktop/DK_HEADER';
import MB_HEADER from './header/mobile/MB_HEADER';

const Header = () => {
	const [userWidth, setUserWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		const updatingUserWidth = () => setUserWidth(window.innerWidth);

		window.addEventListener('resize', updatingUserWidth);
		return () => window.removeEventListener('resize', updatingUserWidth);
	}, []);

	return userWidth >= 850 ? <DK_HEADER /> : <MB_HEADER />;
};

export default Header;
