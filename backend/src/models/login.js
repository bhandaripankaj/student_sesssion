import mongoose from "mongoose";
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    userId:{
        type :Schema.Types.ObjectId,
        required:true
    },
    authToken:{
        type:String,
        required:true,
    },
},{
    timestamps:true
})

export const Login = mongoose.model('login',loginSchema)