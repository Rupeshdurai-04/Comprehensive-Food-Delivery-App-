import mongoose from "mongoose";

export const connectDb = async () =>{
    await mongoose.connect('mongodb://localhost:27017/Food-Del').then(()=>console.log("DB connected."))
}