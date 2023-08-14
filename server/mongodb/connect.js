import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    // Ensures values passed to model constructor that were not specified in schema to not get saved in the db

    mongoose.connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
}

export default connectDB;