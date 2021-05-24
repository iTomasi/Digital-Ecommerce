import React from "react";
import {useHistory} from "react-router-dom";

const DK_HEADER_RIGHT = () => {
    const history = useHistory();

    return (
        <div className="right">
            <button type="button" onClick={() => history.push("/sign-in")}>Sign In</button>
            <button type="button" onClick={() => history.push("/sign-up")}>Sign Up</button>
        </div>
    )
};

export default DK_HEADER_RIGHT;