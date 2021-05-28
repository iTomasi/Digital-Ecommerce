import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import UserContext from '../../context/user/UserContext';

interface ISettingOptionsProps {
	display: boolean;
}

const SettingOptions = ({ display }: ISettingOptionsProps) => {
	const { userDatas } = useContext(UserContext);

	return (
		<div className="options" style={{ display: display ? 'flex' : 'none' }}>
			<Link to="/">Profile</Link>
			{userDatas.token.rank.includes('admin') ? (
				<>
					<Link to="/admin/add-product">Add Product</Link>
				</>
			) : (
				<></>
			)}
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
	);
};

export default SettingOptions;
