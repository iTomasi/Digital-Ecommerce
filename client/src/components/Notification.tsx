import React from "react";
import "./notification.scss";

interface INotificationProps {
    display: boolean;
    msg: string,
    type: string
}

const Notification = ({display, msg, type}: INotificationProps) => {
    return (
        <div className={`notification notification__${type} ${display ? "active" : "noactive"}`}>
            {msg}
        </div>
    )
};

export default Notification;