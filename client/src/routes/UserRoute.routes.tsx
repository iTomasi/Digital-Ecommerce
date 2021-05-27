import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Context
import UserContext from '../context/user/UserContext';

const UserRoute = ({ component: Component, ...rest }: any) => {
	const { userDatas } = useContext(UserContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (userDatas.auth) {
					return <Component {...props} />;
				}

				return <Redirect to="/sign-in" />;
			}}
		/>
	);
};

export default UserRoute;
