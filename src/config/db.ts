import mongoose from "mongoose"

const connectDB = async() => {
    try{   
        await mongoose.connect('mongodb+srv://assign3:11A22b33c44D@cluster0.9o8rsbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Database connected Successfully using Mongoose");
    }
    catch(err){
        console.error("Database Connection Failed.");
    }
}
export default connectDB