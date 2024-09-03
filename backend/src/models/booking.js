const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    sessionId:{
        type :mongoose.Schema.Types.ObjectId,
        required:true
    },
    userId:{
        type :mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{type:Boolean,required:false,default:true}
},
    { timestamps: true, versionKey: false }
);

export const Booking = mongoose.model('bookings', bookingSchema);