const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gradeId:{
        type :mongoose.Schema.Types.ObjectId,
        required:true
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    isActive: { type: Boolean, required: false,default:true },
},
    { timestamps: true, versionKey: false }
);

export const Session = mongoose.model('sessions', sessionSchema);