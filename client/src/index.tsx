import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Context State
import UserState from './context/user/UserState';
import ProductState from './context/product/ProductState';
import SocketState from './context/socket/SocketState';
import NotificationState from './context/notification/NotificationState';

ReactDOM.render(
	<BrowserRouter>
		<UserState>
			<SocketState>
				<ProductState>
					<NotificationState>
						<App />
					</NotificationState>
				</ProductState>
			</SocketState>
		</UserState>
	</BrowserRouter>,
	document.getElementById('root')
);
