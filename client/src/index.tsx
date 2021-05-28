import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Context State
import UserState from './context/user/UserState';
import ProductState from './context/product/ProductState';
import SocketState from './context/socket/SocketState';

ReactDOM.render(
	<BrowserRouter>
		<UserState>
			<SocketState>
				<ProductState>
					<App />
				</ProductState>
			</SocketState>
		</UserState>
	</BrowserRouter>,
	document.getElementById('root')
);
