import express from 'express';
import http from 'http';
import cors from 'cors';
import passport from 'passport';
import passport_jwt from './passport/passport_jwt';
import passport_jwt_admin from './passport/passport_jwt_admin';
import { Server } from 'socket.io';
import Account from './models/Account';
import config from './config/config';

// Routes
import routePages from './routes/pages.routes';
import routeAuth from './routes/auth.routes';
import routeAdmin from './routes/admin.routes';
import routePayment from './routes/payment.routes';

const app = express();
const server = http.createServer(app);
const socket = new Server(server, {
	cors: { origin: config.HOST.FRONT_END },
});

app.set('port', process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(passport_jwt);
passport.use('jwt_admin', passport_jwt_admin);
app.use('/', routePages);
app.use('/auth', routeAuth);
app.use('/admin', routeAdmin);
app.use('/payment', routePayment);

interface IUsersID {
	id: string;
	cart: string[];
	socketConnected: number;
}

let usersID: IUsersID[] = [];

socket.on('connection', (socket) => {
	const userID = socket.handshake.query.id?.toString();
	const cartProducts = socket.handshake.query.cartProducts?.toString();
	const userProducts = socket.handshake.query.products?.toString();
	let cartProducts_array: string[] = [];
	let userProducts_array: string[] = [];

	if (
		userID === undefined ||
		cartProducts === undefined ||
		userProducts === undefined
	)
		return;
	if (cartProducts !== '') cartProducts_array = cartProducts.split(',');
	if (userProducts !== '') userProducts_array = userProducts.split(',');

	const findUserIDIndexJoined = usersID.findIndex(
		(user: any) => user.id === userID
	);

	if (findUserIDIndexJoined === -1) {
		usersID.push({
			id: userID,
			cart: cartProducts_array,
			socketConnected: 1,
		});
	} else {
		++usersID[findUserIDIndexJoined].socketConnected;
	}

	socket.on('cart:product', (productID) => {
		const findUserIDIndex = usersID.findIndex(
			(user: any) => user.id === userID
		);
		const getUserCart = usersID[findUserIDIndex].cart;

		if (
			!getUserCart.includes(productID) &&
			!userProducts_array.includes(productID)
		) {
			usersID[findUserIDIndex].cart.push(productID);
		}
	});

	socket.on('cart:product:remove', (productID) => {
		const findUserIDIndex = usersID.findIndex(
			(user: any) => user.id === userID
		);
		const getCartProducts = usersID[findUserIDIndex].cart;

		const filterCartProducts = getCartProducts.filter(
			(product: any) => product !== productID
		);

		usersID[findUserIDIndex].cart = filterCartProducts;
	});

	socket.on('cart:product:reset', (data) => {
		if (data === 'reset') {
			const findUserIDIndex = usersID.findIndex(
				(user: any) => user.id === userID
			);
			usersID[findUserIDIndex].cart = [];
		}
	});

	socket.once('disconnect', async () => {
		const findUserIDIndex = usersID.findIndex(
			(user: any) => user.id === userID
		);

		if (findUserIDIndex === -1) return

		if (usersID[findUserIDIndex].socketConnected > 1) {
			--usersID[findUserIDIndex].socketConnected;
		} else {
			try {
				const user = await Account.findOne({ _id: userID });

				if (!user) throw Error;

				if (usersID[findUserIDIndex].cart[0] === undefined) {
					user.cartProducts = [];
				}

				else {
					for (let i = 0; i < usersID[findUserIDIndex].cart.length; i++) {
						if (!user.cartProducts.includes(usersID[findUserIDIndex].cart[i])) {
							user.cartProducts.push(usersID[findUserIDIndex].cart[i]);
						}
					}
				}

				await user.save();

				const filtingUsersID = usersID.filter(
					(user: any) => user.id !== userID
				);
				usersID = filtingUsersID;
			} catch (e) {
				console.log(e);
				console.log(
					'SocketIO Disconnect error, probably user doesnt have id registered in the db'
				);
			}
		}
	});
});

export { app, server };
