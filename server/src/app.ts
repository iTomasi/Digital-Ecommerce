import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.set("port", process.env.PORT || 4000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

export {app, server}