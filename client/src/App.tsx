import React, { useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

// Context
import UserContext from './context/user/UserContext';

// Components
import Header from './components/Header';

// Views
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Products from './views/Products';
import AddProduct from "./views/AddProduct";

const App = () => {
	const { isUserAuthenticated } = useContext(UserContext);

	useEffect(() => {
		isUserAuthenticated();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Header />

			<div className="content">
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/sign-up" component={Register} />
					<Route exact path="/sign-in" component={Login} />
					<Route exact path="/products" component={Products} />
					<Route exact path="/admin/add-product" component={AddProduct}/>
				</Switch>
			</div>
		</>
	);
};

export default App;
