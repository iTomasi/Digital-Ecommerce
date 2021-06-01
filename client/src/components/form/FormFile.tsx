import React from "react";

interface IFormFileProps {
    id: string;
    title: string;
    file: string;
    fileName: string;
    defaultName: string;
    name: string;
    onChange: any;
}

const FormFile = ({id, title, file, fileName, defaultName, name, onChange}: IFormFileProps) => {
    return (
        <div className="mb-5 w-10/12">
            <label className="mb-3 block">{title}</label>

            <div className="w-full flex justify-between items-center">
                <label className="bg-green-400 p-1 rounded text-black cursor-pointer" htmlFor={id}>{file}</label>
                <span>
                    {
                        fileName === defaultName
                        ? fileName
                        :
                        fileName.substring(0, 13) + "..."
                    }
                </span>
                <input id={id} type="file" name={name} onChange={onChange} className="hidden" />
            </div>
        </div>
    )
};

export default FormFile;