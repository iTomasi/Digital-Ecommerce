import {Handler} from "express";

export const POST_register: Handler = (req, res) => {
    console.log(req.file)
    console.log(req.body);
}