import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export default {
	DB: {
		MONGODB_URI:
			process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-ecommerce',
	},
	JWT_TOKEN: process.env.JWT_TOKEN || 'mysecretkey',
	STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
};
