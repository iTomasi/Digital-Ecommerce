import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../../../config/config';
import './mb_header.scss';

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
		<header className="MB-header">
			<div className="above">
				<div className="left">
					<i
						className="i__bars fas fa-bars"
						onClick={() => {
							displayNav ? setDisplayNav(false) : setDisplayNav(true);
						}}
					></i>
				</div>

				<div className="right">
					{userDatas.token.id !== '0' ? (
						<>
							<img
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

			<div className="under" style={{ display: displayNav ? 'flex' : 'none' }}>
				{userDatas.token.id === '0' ? (
					<div className="sign-btn">
						<button type="button" onClick={() => history.push('/sign-in')}>
							Sign In
						</button>
						<button type="button" onClick={() => history.push('/sign-up')}>
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
