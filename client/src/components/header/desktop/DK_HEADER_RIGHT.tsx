import React, { useContext, useState, useEffect } from 'react';
import config from '../../../config/config';
import { useHistory } from 'react-router-dom';

// Context
import UserContext from '../../../context/user/UserContext';

// Components
import SettingOptions from '../SettingOptions';

const DK_HEADER_RIGHT = () => {
	const history = useHistory();
	const { userDatas } = useContext(UserContext);

	const [displayOptions, setDisplayOptions] = useState<boolean>(false);

	useEffect(() => {
		const hiddeOptions = (e: any) => {
			if (!e.target.classList.contains('i__cog') && displayOptions) {
				setDisplayOptions(false);
			}
		};

		window.addEventListener('click', hiddeOptions);
		return () => window.removeEventListener('click', hiddeOptions);
	}, [displayOptions]);

	const handleClickSetting = () =>
		displayOptions ? setDisplayOptions(false) : setDisplayOptions(true);

	return (
		<div className="w-1/4 flex justify-evenly items-center">
			{userDatas.token.id !== '0' ? (
				<>
					<img
						src={
							config.HOST.BACK_END +
							'/img?folder=users&file=' +
							userDatas.token.img
						}
						alt={userDatas.token.username}
						className="w-14 h-14 rounded-full object-cover"
					/>
					<i
						className="fas fa-shopping-cart cursor-pointer"
						onClick={() => history.push('/my-cart')}
					></i>
					<div className="relative">
						<i className="i__cog fas fa-cog cursor-pointer" onClick={handleClickSetting}></i>

						<SettingOptions display={displayOptions} />
					</div>
				</>
			) : (
				<>
					<button type="button" onClick={() => history.push('/sign-in')}>
						Sign In
					</button>
					<button type="button" onClick={() => history.push('/sign-up')}>
						Sign Up
					</button>
				</>
			)}
		</div>
	);
};

export default DK_HEADER_RIGHT;
