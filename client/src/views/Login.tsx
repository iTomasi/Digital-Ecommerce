import React, {useState} from "react";
import config from "../config/config";
import Axios from "axios";
import "./scss/form.scss";

const Login = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlePassword = () => showPassword ? setShowPassword(false) : setShowPassword(true);

    const loggin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!formData.get("username")) return console.log("Insert your username")
        else if (!formData.get("password")) return console.log("Insert your password")

        try {
            const res = await Axios.post(config.HOST.BACK_END + "/auth/sign-in", {
                username: formData.get("username"),
                password: formData.get("password")
            }, {headers: {"Content-Type": "application/json"}});

            console.log(res.data);
        }

        catch(e) {
            console.log(e);
            console.log("loggin() (Login.tsx) Error")
        }
    }

    return (
        <form className="iw_form" onSubmit={loggin}>
            <div className="formSection">
                <label>Username or Email</label>
                <input type="text" placeholder="Username or Email" name="username"/>
            </div>

            <div className="formSection">
                <label>Password</label>
                
                <div className="inputPassword">
                    <input type={showPassword ? "text" : "password"} placeholder="Password..." name="password"/>
                    <i className={showPassword ? config.EYE.unhidde : config.EYE.hidde} onClick={handlePassword}></i>
                </div>
            </div>

            <button type="submit">Log In</button>
        </form>
    )
};

export default Login;