import React, {useState} from "react";
import DownloadContext from "./DownloadContext";

// Components
import Download from "../../components/Download";

const DownloadState = ({children}: any) => {
    const [display, setDisplay] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<number>(0);
    const [name, setName] = useState<string>("");

    const startDownload = (nameD: string) => {
        setName(nameD);
        setDisplay(true);
    }

    const isDownloading = () => {
        if (display) return true;
        return false;
    }

    const updatePercentage = (percentageD: number) => {
        setPercentage(percentageD);
    }

    const finishDownload = () => {
        setDisplay(false);
    }

    return (
        <DownloadContext.Provider value={{
            startDownload, isDownloading, updatePercentage, finishDownload
        }}>
            <Download display={display} percentage={percentage} name={name}/>
            {children}
        </DownloadContext.Provider>
    )
};

export default DownloadState;