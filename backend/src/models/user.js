const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    country: { type: String, required: true },
    profilePicture: { type: String, required: false },
    status: { type: Boolean, required: false ,default:true},
    gradeId:{
        type :mongoose.Schema.Types.ObjectId,
        required:false
    },
    userType: {
        type: String,
        required: true,
        enum: [
            "student",
            "teacher",
        ],
    },
},
    { timestamps: true, versionKey: false }
);

export const Users = mongoose.model('users', userSchema);