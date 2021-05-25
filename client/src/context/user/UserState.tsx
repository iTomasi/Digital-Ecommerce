import React, {useState} from "react";
import UserContext from "./UserContext";

interface IUserDatas {
    token: {
        id: string,
        username: string,
        email: string,
        img: string,
        rank: string[],
        products: string[]
    },
    auth: boolean
}

const UserState = ({children}: any) => {
    const [userDatas, setUserDatas] = useState<IUserDatas>({
        token: {id: "0", username: "", email: "", img: "", rank: [], products: []},
        auth: true
    });

    const isUserAuthenticated = () => {
        console.log("validating JWt here")
    };

    return (
        <UserContext.Provider value={{
            userDatas, isUserAuthenticated
        }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserState;