import React, {useState} from "react";
import config from "../config/config";
import "./scss/form.scss";

const Login = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlePassword = () => showPassword ? setShowPassword(false) : setShowPassword(true);

    const loggin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!formData.get("username")) return console.log("Insert your username")
        else if (!formData.get("password")) return console.log("Insert your password")

        console.log("Waiting for back-end");
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