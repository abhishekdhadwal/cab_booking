
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


const near_by_drivers = Joi.object({
   lat : Joi.number().required().description("Enter Your Latitude Here"),
   lng : Joi.number().required().description("Enter Your Longitude Here"),
   pagination : Joi.number().optional()
   .description("example 0, 1, 2 etc by default only 10 records are shown")
   .default(0)
})

const create_booking = Joi.object({
   driver_id : Joi.string().required().description("Pass _id from near_by_drivers api"),
   price : Joi.number().required().description("Booking Price"),
   current_lat : Joi.number().required().description("Enter Your Current Latitude Here"),
   current_lng : Joi.number().required().description("Enter Your Current Longitude Here"),
   current_address : Joi.string().required().description("Enter your Current Address Here"),
   destination_lat : Joi.number().required().description("Enter Your Destination Latitude Here"),
   destination_lng : Joi.number().required().description("Enter Your Destination Longitude Here"), 
   destination_address : Joi.string().required().description("Enter your Destination Address Here")
})


const calculate_price = Joi.object({
   current_lat : Joi.number().required().description("Enter Your Current Latitude Here"),
   current_lng : Joi.number().required().description("Enter Your Current Longitude Here"),
   destination_lat : Joi.number().required().description("Enter Your Destination Latitude Here"),
   destination_lng : Joi.number().required().description("Enter Your Destination Longitude Here")
})


const cancel_bookings = Joi.object({
   booking_id : Joi.string().required().description("Pass _id from list_active_bookings api"),
})

const booking_history = Joi.object({
   pagination : Joi.number().optional()
   .description("example 0, 1, 2 etc by default only 10 records are shown")
   .default(0)
})

export {
   signup,
   login,
   near_by_drivers,
   calculate_price,
   create_booking,
   cancel_bookings,
   booking_history
}