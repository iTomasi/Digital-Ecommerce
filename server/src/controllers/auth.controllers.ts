import { Handler } from "express";
import removeUserImg from "../libs/removeUserImg";
import Account from "../models/Account";
import bcrypt from "bcryptjs";

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
        const user = await Account.findOne({ username });
        const userEmail = await Account.findOne({ email });

        if (user) {
            await removeUserImg(fileName);
            res.json({ message: "Username already registered" });
            return;
        }

        else if (userEmail) {
            await removeUserImg(fileName);
            res.json({ message: "Email already registered" });
            return
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await new Account({
            username, password: hash, email, img: fileName
        }).save();

        res.json({message: "Registered"})
    }

    catch (e) {
        console.log(e);
        console.log("POST_register() Error")
    }
}