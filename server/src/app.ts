import express from 'express';
import http from 'http';
import cors from 'cors';
import passport from 'passport';
import passport_jwt from './passport/passport_jwt';
import passport_jwt_admin from './passport/passport_jwt_admin';
import {Server} from "socket.io";

// Routes
import routePages from './routes/pages.routes';
import routeAuth from './routes/auth.routes';
import routeAdmin from './routes/admin.routes';
import routePayment from "./routes/payment.routes";

const app = express();
const server = http.createServer(app);
const socket = new Server(server, {
    cors: {origin: "http://localhost:3000"}
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
app.use("/payment", routePayment);

let usersID: string[] = [];

socket.on("connection", socket => {
    const userID = socket.handshake.query.id;

    if (userID) {
        usersID.push(userID.toString());
    }

    socket.on("cart:product", data => {
        console.log(data)
    })

    socket.on("disconnect", () => {
        const filtingUsersID = usersID.filter((user: any) => user !== userID?.toString());

        usersID = filtingUsersID;
    })
});

export { app, server };
