import mongoose, {ConnectOptions} from "mongoose";
import config from "../config/config";

const mongooseOptions: ConnectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(config.DB.MONGODB_URI, mongooseOptions)
    .then(() => console.log("Mongoose Connected"))
    .catch(e => console.log(e))