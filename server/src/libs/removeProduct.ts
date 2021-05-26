import fsPromises from "fs";
import path from "path";

const fs = fsPromises.promises;

const rootPath = "../.."

export default async (typeFile: string, file: string) => {
    try {
        if (typeFile === "productImg") {
            await fs.unlink(path.join(__dirname, `${rootPath}/public/products/${file}`));
        }

        else if (typeFile === "productFile") {
            await fs.unlink(path.join(__dirname, `${rootPath}/productsFiles/${file}`))
        }
    }

    catch(e) {
        console.log(e);
        console.log("removeProduct() Error")
    }
}