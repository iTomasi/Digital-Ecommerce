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
		<div className={`${display ? "flex" : "hidden"} flex-col DK-header:absolute DK-header:bg-gray-700 DK-header:top-16 DK-header:right-0 DK-header:w-40 MB-header:w-full MB-header:bg-black text-xl text-center`}>
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
