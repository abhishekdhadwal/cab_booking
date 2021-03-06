
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


const manage_bookings = Joi.object({
   booking_id : Joi.string().required().description("Pass _id from list_bookings api"),
   status : Joi.string().required().valid('ACCEPT', 'REJECT', 'COMPLETED')
})

const booking_history = Joi.object({
   pagination : Joi.number().optional()
   .description("example 0, 1, 2 etc by default only 10 records are shown")
   .default(0)
})


export {
   signup,
   login,
   manage_bookings,
   booking_history
}