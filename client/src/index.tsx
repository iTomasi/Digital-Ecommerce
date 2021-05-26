import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Context State
import UserState from './context/user/UserState';
import ProductState from './context/product/ProductState';

ReactDOM.render(
	<BrowserRouter>
		<UserState>
			<ProductState>
				<App />
			</ProductState>
		</UserState>
	</BrowserRouter>,
	document.getElementById('root')
);
