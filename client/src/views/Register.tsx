import React from "react";
import config from "../config/config";
import "./scss/form.scss";


const Register = () => {
    return (
        <form className="iw_form">
            <div className="formSection">
                <label>Username</label>
                <input type="text" placeholder="Username..." name="username"/>
            </div>

            <div className="formSection">
                <label>Email</label>
                <input type="text" placeholder="Email..." name="email"/>
            </div>

            <div className="formSection">
                <label>Password</label>

                <div className="inputPassword">
                    <input type="password" placeholder="Password..." name="password"/>
                    <i className={config.EYE.hidde}></i>
                </div>
            </div>

            <div className="formSection">
                <label>Confirm Password</label>
                
                <div className="inputPassword">
                    <input type="password" placeholder="Confirm Password..." name="confirm_password"/>
                    <i className={config.EYE.hidde}></i>
                </div>
            </div>

            <div className="formSection formFile">
                <label htmlFor="inputFile">IMG</label>
                <span>Select an IMG...</span>
                <input id="inputFile" type="file" name="userImg" style={{display: "none"}} />
            </div>

            <button type="submit">Register</button>
        </form>
    )
};

export default Register;