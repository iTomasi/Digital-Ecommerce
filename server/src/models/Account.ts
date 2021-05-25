import {Schema, Document, model} from "mongoose";

interface IAccount extends Document {
    username: string,
    password: string,
    email: string,
    rank: string[],
    products: string[]
}

const accountSchema = new Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    rank: {type: Array, default: ["user"]},
    products: {type: Array}
});

export default model<IAccount>("Account", accountSchema);