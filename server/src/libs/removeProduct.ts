import fsPromises from "fs";
import path from "path";

const fs = fsPromises.promises;

const rootPath = "../.."

// when you use file2 params, file1 will reference the product img and file2 will reference the product file

export default async (typeFile: string, file1: string, file2?: string) => {
    try {
        if (typeFile === "productImg") {
            await fs.unlink(path.join(__dirname, `${rootPath}/public/products/${file1}`));
        }

        else if (typeFile === "productFile") {
            await fs.unlink(path.join(__dirname, `${rootPath}/productsFiles/${file1}`))
        }

        else if (typeFile === "both") {
            await fs.unlink(path.join(__dirname, `${rootPath}/public/products/${file1}`));
            await fs.unlink(path.join(__dirname, `${rootPath}/productsFiles/${file2}`))
        }
    }

    catch(e) {
        console.log(e);
        console.log("removeProduct() Error")
    }
}