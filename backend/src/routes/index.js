const express = require('express');
import controller from '../controllers/userController'
import { validate } from 'express-validation';
import { signUpValidation } from '../validation';
import { authenticateToken } from '../utils/jwtService';
export const apiRouter = express.Router();


apiRouter.post('/users/signup',validate(signUpValidation), controller.signUp)
apiRouter.post('/users/login',controller.login)
apiRouter.post('/grade',controller.addGrade)
apiRouter.post('/session',authenticateToken, controller.addSession)
apiRouter.get('/session',authenticateToken, controller.getSession)
apiRouter.post('/booking',authenticateToken, controller.addBooking)