import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import UserContext from '../../context/user/UserContext';

const Navegation = () => {
	const { userDatas } = useContext(UserContext);

	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				{userDatas.token.id !== '0' ? (
					<>
						<li>
							<Link to="/products">Products</Link>
						</li>
						<li>
							<Link to="/my-products">My Products</Link>
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
