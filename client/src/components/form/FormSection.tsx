import React from "react";

interface IFormSectionProps {
    title: string;
    name: string;
    type: string;
    isPassword: boolean;
    onClick?: any;
    className?: string;
}

const FormSection = ({title, name, type, isPassword, onClick, className}: IFormSectionProps) => {
    return (
        <div className="mb-5 w-10/12">
            <label className="block mb-3">{title}</label>
            
            {
                isPassword
                ?
                <div className="bg-gray-900 flex justify-between items-center p-2 w-full">
                    <input className="bg-transparent w-10/12 focus:outline-none" type={type} placeholder={title + "..."} name={name}/>
                    <i className={`${className} cursor-pointer`} onClick={onClick}></i>
                </div>

                :
                type === "textarea" ?
                <textarea className="bg-gray-900 p-2 w-full focus:outline-none h-32 resize-none" name={name} placeholder={title + "..."}></textarea>
                :
                <input className="bg-gray-900 p-2 w-full focus:outline-none" type={type} name={name} placeholder={title + "..."} />
            }
        </div>
    )
};

export default FormSection;