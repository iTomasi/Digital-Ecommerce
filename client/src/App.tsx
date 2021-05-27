import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Context
import UserContext from './context/user/UserContext';
import ProductContext from './context/product/ProductContext';

// Components
import Header from './components/Header';

// Views
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import Products from './views/Products';
import AddProduct from './views/AddProduct';
import ProductInfo from './views/ProductInfo';
import CheckoutForm from './views/CheckoutForm';
import MyProducts from './views/MyProducts';

// Routes
import UserRoute from './routes/UserRoute.routes';
import AuthRoute from './routes/AuthRoute.routes';
import AdminRoute from './routes/AdminRoute.routes';

const App = () => {
	const { isUserAuthenticated, userDatas } = useContext(UserContext);
	const { productsBuy } = useContext(ProductContext);

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

					<AuthRoute exact path="/sign-up" component={Register} />
					<AuthRoute exact path="/sign-in" component={Login} />

					<UserRoute exact path="/products" component={Products} />
					<UserRoute exact path="/product/:id" component={ProductInfo} />
					<UserRoute exact path="/my-products" component={MyProducts} />

					<AdminRoute exact path="/admin/add-product" component={AddProduct} />

					<Route
						exact
						path="/checkout"
						render={() => {
							if (productsBuy[0] !== undefined && userDatas.auth) {
								return <CheckoutForm />;
							}

							return <Redirect to="/" />;
						}}
					/>
				</Switch>
			</div>
		</>
	);
};

export default App;
