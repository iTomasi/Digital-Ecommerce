import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import UserContext from '../../context/user/UserContext';

const Navegation = () => {
	const { userDatas } = useContext(UserContext);

	return (
		<nav className="DK-header:w-1/2 DK-header:text-xl">
			<ul className="flex justify-evenly">
				<li>
					<Link to="/" className="hover:border-b-2 hover:py-6 hover:border-green-400">Home</Link>
				</li>
				{userDatas.token.id !== '0' ? (
					<>
						<li>
							<Link to="/products" className="hover:border-b-2 hover:py-6 hover:border-green-400">Products</Link>
						</li>
						<li>
							<Link to="/my-products" className="hover:border-b-2 hover:py-6 hover:border-green-400">My Products</Link>
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
