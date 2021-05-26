import { Schema, model, Document } from 'mongoose';

interface IProduct extends Document {
	name: string;
	description: string;
	price: number;
	productImg: string;
	productFile: string;
}

const productSchema = new Schema({
	name: { type: String },
	description: { type: String },
	price: { type: Number },
	productImg: { type: String },
	file: { type: String },
});

export default model<IProduct>('Product', productSchema);
