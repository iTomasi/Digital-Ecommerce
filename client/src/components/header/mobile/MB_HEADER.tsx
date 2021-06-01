import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../../../config/config';

// Context
import UserContext from '../../../context/user/UserContext';

// Components
import Navegation from '../Navegation';
import SettingOptions from '../SettingOptions';

const MB_HEADER = () => {
	const history = useHistory();
	const { userDatas } = useContext(UserContext);

	const [displayNav, setDisplayNav] = useState<boolean>(false);
	const [displaySetting, setDisplaySetting] = useState<boolean>(false);

	useEffect(() => {
		const hiddeNav = (e: any) => {
			if (!e.target.classList.contains('i__bars') && displayNav) {
				setDisplayNav(false);
			}
		};

		window.addEventListener('click', hiddeNav);
		return () => window.removeEventListener('click', hiddeNav);
	}, [displayNav]);

	useEffect(() => {
		const hiddeSetting = (e: any) => {
			if (!e.target.classList.contains('i__cog') && displaySetting) {
				setDisplaySetting(false);
			}
		};

		window.addEventListener('click', hiddeSetting);
		return () => window.removeEventListener('click', hiddeSetting);
	}, [displaySetting]);

	return (
		<header className="flex flex-col items-center z-50 text-xl fixed w-full top-0">
			<div className="bg-gray-700 h-20 flex justify-between items-center w-full">
				<div className="mx-8">
					<i
						className="i__bars fas fa-bars cursor-pointer text-2xl"
						onClick={() => {
							displayNav ? setDisplayNav(false) : setDisplayNav(true);
						}}
					></i>
				</div>

				<div className="mx-8 flex justify-between items-center w-3/5 max-w-180px">
					{userDatas.token.id !== '0' ? (
						<>
							<img
								className="h-14 w-14 rounded-full object-cover"
								src={
									config.HOST.BACK_END +
									'/img?folder=users&file=' +
									userDatas.token.img
								}
								alt={userDatas.token.username}
							/>
							<i
								className="fas fa-shopping-cart"
								onClick={() => history.push('/my-cart')}
							></i>

							<i
								className="i__cog fas fa-cog"
								onClick={() => {
									displaySetting
										? setDisplaySetting(false)
										: setDisplaySetting(true);
								}}
							></i>
						</>
					) : (
						<></>
					)}
				</div>
			</div>

			<div
				className={`bg-black w-full ${
					displayNav ? 'flex' : 'hidden'
				} flex-col items-center`}
			>
				{userDatas.token.id === '0' ? (
					<div className="flex justify-between w-3/4 max-w-220px my-4">
						<button
							className="bg-white text-black py-1 px-3 rounded text-xl focus:outline-none"
							type="button"
							onClick={() => history.push('/sign-in')}
						>
							Sign In
						</button>
						<button
							className="bg-white text-black py-1 px-3 rounded text-xl focus:outline-none"
							type="button"
							onClick={() => history.push('/sign-up')}
						>
							Sign Up
						</button>
					</div>
				) : (
					<></>
				)}
				<Navegation />
			</div>

			<SettingOptions display={displaySetting} />
		</header>
	);
};

export default MB_HEADER;
