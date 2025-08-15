import mongoose from "mongoose";

const DB_NAME = "genAIArtisan";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

export default connectDB;
