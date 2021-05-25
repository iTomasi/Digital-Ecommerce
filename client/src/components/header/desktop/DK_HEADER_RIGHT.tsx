import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../../../config/config';
import { useHistory } from 'react-router-dom';

// Context
import UserContext from '../../../context/user/UserContext';

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
		<div className="right">
			{userDatas.auth ? (
				<>
					<img
						src={
							config.HOST.BACK_END +
							'/img?folder=users&file=' +
							userDatas.token.img
						}
						alt={userDatas.token.username}
					/>
					<div className="setting">
						<i className="i__cog fas fa-cog" onClick={handleClickSetting}></i>

						<div
							className="options"
							style={{ display: displayOptions ? 'flex' : 'none' }}
						>
							<Link to="/">Profile</Link>
							<button
								type="button"
								onClick={() => {
									localStorage.removeItem('token');
									window.location.href = '/sign-in';
								}}
							>
								Logout
							</button>
						</div>
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
