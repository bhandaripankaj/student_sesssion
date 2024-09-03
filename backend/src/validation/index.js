import { Joi } from "express-validation"

export const signUpValidation = {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      country: Joi.string().required(),
      password:Joi.string().required(),
      profilePicture:Joi.string().optional(),
      userType:Joi.string().valid("student","teacher",).required(),
      gradeId: Joi.string().optional()
    }),
  }

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().required(),
    password:Joi.string().required(),
  }),
}
