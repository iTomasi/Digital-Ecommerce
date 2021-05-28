import { Schema, Document, model } from 'mongoose';

interface IAccount extends Document {
	username: string;
	username_lower: string;
	password: string;
	email: string;
	img: string;
	rank: string[];
	cartProducts: string[];
	products: string[];

}

const accountSchema = new Schema({
	username: { type: String },
	username_lower: { type: String },
	password: { type: String },
	email: { type: String },
	img: { type: String },
	rank: { type: Array, default: ['user'] },
	cartProducts: {type: Array, default: []},
	products: { type: Array, default: [] },
});

export default model<IAccount>('Account', accountSchema);
