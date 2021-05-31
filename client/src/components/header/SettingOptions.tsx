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
		<div className="flex flex-col absolute bg-gray-700 top-16 right-0 w-40 text-xl" style={{ display: display ? 'flex' : 'none' }}>
			<Link to="/" className="py-2 hover:bg-green-400 hover:text-gray-900">Profile</Link>
			{userDatas.token.rank.includes('admin') ? (
				<>
					<Link to="/admin/add-product" className="py-2 hover:bg-green-400 hover:text-gray-900">Add Product</Link>
				</>
			) : (
				<></>
			)}
			<button
				className="py-2 hover:bg-green-400 hover:text-gray-900"
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
