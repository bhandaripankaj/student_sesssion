import * as mongoose from "mongoose";
import { addBookingService, addGradeService, addSessionService, addUserService, findBookingService, findUserService, getSessionService, userLoginService } from "../services/userServices";
import { generateToken } from "../utils/jwtService";
import { comparePasswords, generatePassword, sendCustomResponse } from "../utils/universalFunctions";


export default {
    async signUp(req,res){
        try {
            req.body.email= req.body.email?.trim()?.toLowerCase()
            const findUser = await findUserService({email:req.body.email})
            if(findUser && findUser?.isVerified){
                 return res.send(
                   {code:400, message:"user not found",data:{}}
                );
            }
           req.body.password = await generatePassword(req.body.password)
                  let  addUser = await addUserService(req.body)
            if(addUser){
                return res.send(
                  {  code:200,
                    message:"success",
                    data:addUser}
                );
            } 
        } catch (err) {
            console.log(err)
                return sendCustomResponse(
                    res,
                    "Something went wrong!",
                    500,
                    {}
                );
            }
    },
    async login(req,res){
        try {
            req.body.email= req.body.email?.trim()?.toLowerCase()
            const findUser = await findUserService({email:req.body.email})
            if(!findUser){
                 return sendCustomResponse(
                    res,
                    "user not foung",
                    400,
                    {}
                );
            }
          
            if(! await comparePasswords(req.body.password,findUser.password)){
                return sendCustomResponse(
                    res,
                    "INVALID_PASSWORD",
                    400,
                    {}
                );
            }

            const token = generateToken({phoneNumber:req.body.phoneNumber, userId:findUser?._id})
            const payload = {
              authToken:token,
              userId:findUser?._id
            }
              const login = await userLoginService({userId:findUser?._id},{$set:payload})
                return sendCustomResponse(
                    res,
                    "SUCCESS",
                    200,
                    {...login._doc,user:findUser}
                );
           
        } catch (err) {
            console.log("err",err)
            return sendCustomResponse(
                res,
                err.message,
                500,
                {}
            );
        }
    },
    async addGrade(req,res){
        try {
            console.log(req.body)
            req.body.slug= req.body.name?.trim()?.toLowerCase()
         const response = await addGradeService(req.body)
           if(response){
            return sendCustomResponse(
                res,
                "SUCCESS",
                200,
                response
            );
           }
        } catch (err) {
            console.log("err",err)
            return sendCustomResponse(
                res,
                err.message,
                500,
                {}
            );
        }
    },
    async addSession(req,res){
        try {
            console.log("user",req.user)
            req.body.userId = req.user._id
         const response = await addSessionService(req.body)
           if(response){
            return sendCustomResponse(
                res,
                "SUCCESS",
                200,
                response
            );
           }
        } catch (err) {
            console.log("err",err)
            return sendCustomResponse(
                res,
                err.message,
                500,
                {}
            );
        }
    },
    async getSession(req,res){
        try {
         const response = await getSessionService({gradeId:new mongoose.Types.ObjectId(req.user.gradeId),startTime:{$gte:new Date()}})
           if(response?.length){
            return sendCustomResponse(
                res,
                "SUCCESS",
                200,
                response
            );
           } else {
            return sendCustomResponse(
                res,
                "SUCCESS",
                404,
                {}
            );
           }
        } catch (err) {
            console.log("err",err)
            return sendCustomResponse(
                res,
                err.message,
                500,
                {}
            );
        }
    },
    async addBooking(req,res){
        try {
            req.body.userId = req.user._id
         const checkBook = await findBookingService({userId:new mongoose.Types.ObjectId(req.user.userId),sessionId:new mongoose.Types.ObjectId(req.user.sessionId)})
         console.log(checkBook,"checkBook")
         if(checkBook){
            return sendCustomResponse(
                res,
                "already exist",
                400,
                {}
            );
         }
         const response = await addBookingService(req.body)
           if(response){
            return sendCustomResponse(
                res,
                "SUCCESS",
                200,
                response
            );
           }
        } catch (err) {
            console.log("err",err)
            return sendCustomResponse(
                res,
                err.message,
                500,
                {}
            );
        }
    },
}