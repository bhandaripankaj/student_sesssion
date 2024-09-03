import jwt from 'jsonwebtoken'
import { sendCustomResponse } from './universalFunctions';
import { findLoginService, findUserService } from '../services/userServices';
import * as mongoose from 'mongoose';


export const generateToken=  (payload)=>{
    console.log("key",process.env.JWT_SECRET_KEY)
    const expirationTime = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;
   const token =  jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: expirationTime });
   return token
}

export const verifyToken=  (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
 }


 export async function authenticateToken(req, res, next) {
    const token = req.header('token');
    console.log("token",token)
    if (!token) {
        return sendCustomResponse(
            res,
           "TOKEN_NOT_PROVIDED",
            401,
            {}
        );
        }
  
    try {
      console.log("token",token)
      const decode = await findLoginService({authToken:token});
      console.log("decode",decode)
        const user = await findUserService({_id:new mongoose.Types.ObjectId(decode.userId)})
      console.log("user",user)
         if(!user){
            return sendCustomResponse(
                res,
                "UNAUTHORIZED",
                401,
                {}
            );
         }
         req.user = user;
      next();
    } catch (err) {
      console.log("err",err)
      return sendCustomResponse(
        res,
        err.message,
        401,
        {}
    );
    }
  }
