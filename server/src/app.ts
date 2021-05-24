import express from "express";
import http from "http";
import cors from "cors";

// Routes
import routeAuth from "./routes/auth.routes";

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/auth", routeAuth);

export {app, server}