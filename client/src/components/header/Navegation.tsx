import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import UserContext from '../../context/user/UserContext';

const Navegation = () => {
	const { userDatas } = useContext(UserContext);

	return (
		<nav className="desktop:w-1/2 desktop:text-xl mobile:w-full mobile:text-center">
			<ul className="flex desktop:justify-evenly mobile:flex-col">
				<li>
					<Link to="/" className="desktop:hover:border-b-2 desktop:hover:py-6 desktop:hover:border-green-400 mobile:block mobile:py-4">Home</Link>
				</li>
				{userDatas.token.id !== '0' ? (
					<>
						<li>
							<Link to="/products" className="desktop:hover:border-b-2 desktop:hover:py-6 desktop:hover:border-green-400 mobile:block mobile:py-4">Products</Link>
						</li>
						<li>
							<Link to="/my-products" className="desktop:hover:border-b-2 desktop:hover:py-6 desktop:hover:border-green-400 mobile:block mobile:py-4">My Products</Link>
						</li>
					</>
				) : (
					<></>
				)}
			</ul>
		</nav>
	);
};

export default Navegation;
