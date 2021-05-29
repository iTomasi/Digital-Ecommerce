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
import DownloadState from './context/downloadBar/DownloadState';

ReactDOM.render(
	<BrowserRouter>
		<UserState>
			<SocketState>
				<ProductState>
					<NotificationState>
						<DownloadState>
							<App />
						</DownloadState>
					</NotificationState>
				</ProductState>
			</SocketState>
		</UserState>
	</BrowserRouter>,
	document.getElementById('root')
);
