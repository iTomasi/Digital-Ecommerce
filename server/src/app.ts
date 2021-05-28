import express from 'express';
import http from 'http';
import cors from 'cors';
import passport from 'passport';
import passport_jwt from './passport/passport_jwt';
import passport_jwt_admin from './passport/passport_jwt_admin';
import { Server } from 'socket.io';

// Routes
import routePages from './routes/pages.routes';
import routeAuth from './routes/auth.routes';
import routeAdmin from './routes/admin.routes';
import routePayment from './routes/payment.routes';

const app = express();
const server = http.createServer(app);
const socket = new Server(server, {
	cors: { origin: 'http://localhost:3000' },
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

	if (userID === undefined || cartProducts === undefined) return;

	const findUserIDIndexJoined = usersID.findIndex(
		(user: any) => user.id === userID
	);

	if (findUserIDIndexJoined === -1) {
		usersID.push({
			id: userID,
			cart: [],
			socketConnected: 1,
		});
	} else {
		++usersID[findUserIDIndexJoined].socketConnected;
	}

	socket.on('cart:product', (productID) => {
        const findUserIDIndex = usersID.findIndex((user: any) => user.id === userID);
        const getUserCart = usersID[findUserIDIndex].cart;

        if (!getUserCart.includes(productID)) {
            usersID[findUserIDIndex].cart.push(productID);
        }
	});

	socket.on('disconnect', () => {
		const findUserIDIndex = usersID.findIndex(
			(user: any) => user.id === userID
		);

		if (usersID[findUserIDIndex].socketConnected > 1) {
			--usersID[findUserIDIndex].socketConnected;
		} else {
			const filtingUsersID = usersID.filter(
				(user: any) => user.id !== userID
			);

			usersID = filtingUsersID;
		}
	});
});


// THIS INTERVAL WILL BE REMOVE ONLY FOR SEE THE ARRAY
setInterval(() => {
    console.log(usersID);
}, 5000)

export { app, server };
