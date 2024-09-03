import { Booking } from "../models/booking"
import { Grades } from "../models/grade"
import { Login } from "../models/login"
import { Session } from "../models/session"
import { Users } from "../models/user"

export const addUserService = (payload)=>{
   return Users.create(payload)
}

export const findUserService = (filter={})=>{
   return Users.findOne(filter)
}

export const updateUserService = (filter,updatePayload)=>{
   return Users.findOneAndUpdate(filter,updatePayload,{new:true})
}

export const userLoginService = (filter,updatePayload)=>{
   return Login.findOneAndUpdate(filter,updatePayload,{new:true,upsert:true})
}

export const addGradeService = (updatePayload)=>{
   return Grades.findOneAndUpdate({slug:updatePayload.slug},{$set:updatePayload},{new:true,upsert:true})
}
export const addSessionService = (payload)=>{
   return Session.create(payload)
}
export const addBookingService = (payload)=>{
   return Booking.create(payload)
}
export const getSessionService = (filter={})=>{
   console.log("filter",filter)
   return Session.aggregate([
      {
         $match:filter
      },
      {
         $lookup: {
           from: "grades",
           let: { gradeId: "$gradeId" },
           pipeline: [
             { $match: { $expr: { $eq: ["$_id", "$$gradeId"] } } }
           ],
           as: "grade"
         }
       },
       {$unwind:"$grade"}
       
   ])
}

export const findLoginService = (filter)=>{
   return Login.findOneAndUpdate(filter)
}
export const findBookingService = (filter={})=>{
   return Booking.findOne(filter)
}