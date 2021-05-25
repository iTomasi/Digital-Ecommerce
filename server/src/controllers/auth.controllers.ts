import { Handler } from "express";
import removeUserImg from "../libs/removeUserImg";
import Account from "../models/Account";
import jwt from "jsonwebtoken";
import config from "../config/config";
import bcrypt from "bcryptjs";

export const GET_validateUserToken: Handler = (req, res) => {
    const gettingUserDatas: any = req.user;
    const user: any = gettingUserDatas.toObject();
    delete user.password;
    delete user.__v;

    return res.json({token: user, auth: true})
}

export const POST_register: Handler = async (req, res) => {
    const { username, email, password, confirm_password } = req.body;
    let fileName: string = "";

    const emailRegExp = new RegExp(/^[A-Za-z0-9_]+@[A-Za-z]+\.[A-Za-z]{2,3}$/g);
    const passwordRegExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\W])[A-Za-z0-9\W]{5,}$/g);

    req.file === undefined ? fileName = "default.jpg" : fileName = req.file.filename;

    if (!username || !email || !password || !confirm_password) {
        await removeUserImg(fileName);
        res.json({ message: "Datas missing" });
        return
    }

    else if (username.length < 3) {
        await removeUserImg(fileName);
        res.json({ message: "Your username must contain at less 3 characters" });
        return
    }

    else if (!emailRegExp.test(email)) {
        await removeUserImg(fileName);
        res.json({ message: "Please write correctly your email" });
        return
    }

    else if (!passwordRegExp.test(password)) {
        await removeUserImg(fileName);
        res.json({ message: "Your password must contain at less 5 characters and (upper and lower case, numbers and special character" });
        return;
    }

    else if (password !== confirm_password) {
        await removeUserImg(fileName);
        res.json({ message: "Password not match" });
        return
    }


    try {
        const user = await Account.findOne().or([{username}, {email}]);

        if (user) {
            if (user.username === username) {
                await removeUserImg(fileName);
                res.json({message: "Username already registered"});
                return
            }

            else if (user.email.toLowerCase() === email.toLowerCase()) {
                await removeUserImg(fileName);
                res.json({message: "Email already registered"});
                return
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await new Account({
            username, password: hash, email: email.toLowerCase(), img: fileName
        }).save();

        res.json({message: "Registered"})
    }

    catch (e) {
        console.log(e);
        console.log("POST_register() Error")
    }
}

export const POST_login: Handler = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.json({message: "Datas missing"});
    }

    try {
        const user = await Account.findOne().or([{username}, {email: username}]);

        if (!user) return res.json({message: "Username or password invalid."})

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) return res.json({message: "Username or password invalid."})

        const token = jwt.sign({
            id: user._id
        }, config.JWT_TOKEN, {expiresIn: 86400});

        res.json({token, message: "Logged"});
    }

    catch(e) {
        console.log(e);
        console.log("POST_login() Error")
    }
}