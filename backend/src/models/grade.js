import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gradesSchema = new Schema({
    name:{
        type :String,
        required:true
    },
    slug:{
        type:String,
        required:true,
    },
},{
    timestamps:true
})

export const Grades = mongoose.model('grades',gradesSchema)