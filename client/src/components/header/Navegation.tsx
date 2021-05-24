import React from "react";
import {Link} from "react-router-dom";

const Navegation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Products</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Navegation;