import express from 'express';
import http from 'http';
import cors from 'cors';
import passport from 'passport';
import passport_jwt from './passport/passport_jwt';
import passport_jwt_admin from './passport/passport_jwt_admin';

// Routes
import routePages from './routes/pages.routes';
import routeAuth from './routes/auth.routes';
import routeAdmin from './routes/admin.routes';

const app = express();
const server = http.createServer(app);

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

export { app, server };
