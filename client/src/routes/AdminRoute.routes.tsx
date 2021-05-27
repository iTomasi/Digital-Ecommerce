import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Context
import UserContext from '../context/user/UserContext';

const AdminRoute = ({ component: Component, ...rest }: any) => {
	const { userDatas } = useContext(UserContext);

	return (
		<Route
			{...rest}
			render={(props) => {
				if (userDatas.token.rank.includes('admin')) {
					return <Component {...props} />;
				}

                localStorage.setItem("private", "true")
				return <Redirect to="/" />;
			}}
		/>
	);
};

export default AdminRoute;
