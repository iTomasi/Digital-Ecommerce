import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import UserContext from '../../context/user/UserContext';

const Navegation = () => {
	const { userDatas } = useContext(UserContext);

	return (
		<nav className="DK-header:w-1/2 DK-header:text-xl MB-header:w-full MB-header:text-center">
			<ul className="flex DK-header:justify-evenly MB-header:flex-col">
				<li>
					<Link to="/" className="DK-header:hover:border-b-2 DK-header:hover:py-6 DK-header:hover:border-green-400 MB-header:block MB-header:py-4">Home</Link>
				</li>
				{userDatas.token.id !== '0' ? (
					<>
						<li>
							<Link to="/products" className="DK-header:hover:border-b-2 DK-header:hover:py-6 DK-header:hover:border-green-400 MB-header:block MB-header:py-4">Products</Link>
						</li>
						<li>
							<Link to="/my-products" className="DK-header:hover:border-b-2 DK-header:hover:py-6 DK-header:hover:border-green-400 MB-header:block MB-header:py-4">My Products</Link>
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
