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
		<div
			className={`${
				display ? 'flex' : 'hidden'
			} flex-col desktop:absolute desktop:bg-gray-700 desktop:top-16 desktop:right-0 desktop:w-40 mobile:w-full mobile:bg-black text-xl text-center`}
		>
			<Link to="/" className="py-2 hover:bg-green-400 hover:text-gray-900">
				Profile
			</Link>
			{userDatas.token.rank.includes('admin') ? (
				<>
					<Link
						to="/admin/add-product"
						className="py-2 hover:bg-green-400 hover:text-gray-900"
					>
						Add Product
					</Link>
				</>
			) : (
				<></>
			)}
			<button
				className="py-2 hover:bg-green-400 hover:text-gray-900 focus:outline-none"
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
