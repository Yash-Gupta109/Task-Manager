import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/taskManager`)
        console.log(`MongoDB connected successfully ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB Connection FAILED: ", error);
        process.exit(1)
    }
}

export default connectDB;