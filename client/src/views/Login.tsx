import React from "react";
import config from "../config/config";
import "./scss/form.scss";

const Login = () => {
    return (
        <form className="iw_form">
            <div className="formSection">
                <label>Username or Email</label>
                <input type="text" placeholder="Username or Email" name="username"/>
            </div>

            <div className="formSection">
                <label>Password</label>
                
                <div className="inputPassword">
                    <input type="password" placeholder="Password..." name="password"/>
                    <i className={config.EYE.hidde}></i>
                </div>
            </div>

            <button type="submit">Log In</button>
        </form>
    )
};

export default Login;