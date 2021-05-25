import express from "express";
import http from "http";
import cors from "cors";
import passport from "passport";
import passport_jwt from "./passport/passport-jwt";

// Routes
import routePages from "./routes/pages.routes";
import routeAuth from "./routes/auth.routes";

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
passport.use(passport_jwt);
app.use("/", routePages);
app.use("/auth", routeAuth);

export {app, server}