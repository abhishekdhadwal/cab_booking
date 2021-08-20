
import Joi from 'joi';

const signup =  Joi.object({
   name : Joi.string().required().description("Enter your Name"),
   country_code : Joi.string().required().description("Enter your Country Code"),
   phone_no : Joi.number().required().description("Enter your Phone Number"),
   password : Joi.string().required().description("Enter your Password"),
   lat : Joi.number().required().description("Enter Latitude"),
   lng : Joi.number().required().description("Enter Longitude"),
   address : Joi.string().required().description("Enter your Address Here")
})

const login =  Joi.object({
   country_code : Joi.string().required().description("Enter your Country Code"),
   phone_no : Joi.number().required().description("Enter your Phone Number"),
   password : Joi.string().required().description("Enter your Password")
})





export {
   signup,
   login
}