import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Context
import UserContext from '../context/user/UserContext';

const AuthRoute = ({ component: Component, ...rest }: any) => {
	const { userDatas } = useContext(UserContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (userDatas.token.id === '0' || !userDatas.auth) {
					return <Component {...props} />;
				}

				return <Redirect to="/" />;
			}}
		/>
	);
};

export default AuthRoute;
