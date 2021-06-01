import React from "react";

interface IFormPercentageProps {
    display: boolean;
    percentage: number
}

const FormPercentage = ({display, percentage}: IFormPercentageProps) => {
    return (
        <div className={`formPercentage ${display ? "block" : "hidden"}`}>
            <div className="bar">
                <div className="current" style={{width: `${percentage}%`}}></div>
            </div>
        </div>
    )
};

export default FormPercentage;