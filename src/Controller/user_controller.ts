
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import Distance from 'geo-distance';
import { error_msg, app_constansts } from '../Config/index';
import { common_controller }  from './index';
import { user_functions } from '../functions/index';
import { ag_nearby_drivers } from '../aggregation/index';

const { per_km_price, default_limit } = app_constansts

const signup = async(payload_data : any) => {
   try {

      // check phone number
      let data_to_send = {
         country_code : payload_data.country_code,
         phone_no : payload_data.phone_no,
         collection : Models.Users
      }
      let fetch_data : any = await common_controller.check_phone_no(data_to_send)

      if (fetch_data.length) { throw error_msg.phone_no_already_exists }
      else {

         let data_to_save : any = await user_functions.set_singup_data(payload_data)
         data_to_save.created_at = +new Date()

         let create_new_user = await DAO.save_data(Models.Users, data_to_save)

         // generate new token
         let response = await common_controller.gen_user_token(create_new_user)
         return response

      }

   }
   catch(err) {
      throw err;
   }
}



const login = async(payload_data : any) => {
   try {

      let query = {  
         country_code : payload_data.country_code,
         phone_no : payload_data.phone_no
      }
      let projection = { __v : 0 }
      let options = { lean : true }
      let fetch_data : any = await DAO.get_data(Models.Users, query, projection, options)

      if(fetch_data.length) {

         let password = fetch_data[0].password
         let decrypt = await common_controller.decrypt_password(payload_data.password, password)
         if(decrypt != true) { throw error_msg.invalid_password }
         else {

            // generate new token
            let response = await common_controller.gen_user_token(fetch_data[0])
            return response

         }

      }else {
         throw error_msg.phone_no_not_registered
      }

   }
   catch(err) {
      throw err;
   }
}

const near_by_drivers = async(payload_data : any) => {
   try {

      let { lat, lng, pagination } = payload_data

      let query = [
         await ag_nearby_drivers.near_by_drivers(lat, lng),
         await ag_nearby_drivers.set_data(),
         await ag_nearby_drivers.group_data(),
         await ag_nearby_drivers.sort_data(),
         await ag_nearby_drivers.skip_data(pagination),
         await ag_nearby_drivers.limit_data()
      ]

      let options = { lean : true }
      let fetch_data : any = await DAO.aggregate_data(Models.Drivers, query, options)
      
      return {
         total_count : fetch_data.length,
         data : fetch_data
      }

   }
   catch(err) {
      throw err;
   }
}

const calculate_price = async(payload_data : any) => {
   try {

      let { current_lat, current_lng, destination_lat, destination_lng } = payload_data

      let current_location = {
         lat : current_lat,
         lon : current_lng  
      }

      let destination_location = {
         lat : destination_lat,
         lon : destination_lng 
      }

      let find_distance = Distance.between(current_location, destination_location);
      let { distance } = find_distance.human_readable();
      let estimanted_price =  Number(distance) * Number(per_km_price)
      
      return {
         distance : Number(distance),
         per_km_price : per_km_price,
         price : estimanted_price
      }



   }
   catch(err) {
      throw err;
   }
}

const create_booking = async(payload_data : any, user_data : any) => {
   try {

      let { driver_id, price, current_lat, current_lng, current_address, destination_lat, destination_lng, destination_address } = payload_data

      let data_to_save = {
         driver_id : driver_id,
         user_id : user_data._id,
         price : price,
         'current_location.coordinates' : [ current_lng, current_lat], 
         current_address : current_address, 
         'destination_location.coordinates' : [ destination_lng, destination_lat ],
         destination_address : destination_address, 
         created_at : +new Date()
      }

      let response = await DAO.save_data(Models.Bookings, data_to_save)
      return response

   }
   catch(err) {
      throw err;
   }
}


const cancel_bookings = async(payload_data : any, user_data : any) => {
   try {

      let { booking_id } = payload_data

      // check booking status
      let status = await user_functions.check_booking_status(user_data._id, booking_id)

      if(status == 'REJECT') { 
         throw error_msg.rejected_booking_error 
      }
      else if(status == 'CANCELLED') { 
         throw error_msg.cancelled_booking_error 
      }
      else if(status == 'COMPLETED') { 
         throw error_msg.completed_booking_error 
      }
      else {

         let query = { _id : booking_id, user_id : user_data._id }
         let update = { status : 'CANCELLED' }
         let options = { new : true }
         let response = await DAO.find_and_update(Models.Bookings, query, update, options)
         return response

      }


   }
   catch(err) {
      throw err;
   }
}


const list_active_bookings = async(user_data : any) => {
   try {

      let query = { 
         user_id : user_data._id,
         status : { $in : [ 'PENDING', 'ACCEPT' ] }  
      }
      let projection = { __v : 0 }
      let options = { 
         lean : true, 
         sort : { _id : -1 }
      }
      let populate = [ { path : 'driver_id', select : 'name country_code phone_no' } ]
      let response : any = await DAO.populate_data(Models.Bookings, query, projection, options, populate)

      return response

   }
   catch(err) {
      throw err;
   }
}

const booking_history = async(payload_data : any, user_data : any) => {
   try {

      let { pagination } = payload_data

      let query = { 
         user_id : user_data._id,
         status : { $nin : [ 'PENDING', 'ACCEPT' ] }  
      }
      let projection = { __v : 0 }
      let options = { 
         lean : true, 
         sort : { _id : -1 }, 
         skip : pagination * default_limit,
         limit : default_limit
      }
      let populate = [ { path : 'driver_id', select : 'name country_code phone_no' } ]
      let response : any = await DAO.populate_data(Models.Bookings, query, projection, options, populate)

      return {
         total_count : response.length,
         data : response
      }

   }
   catch(err) {
      throw err;
   }
}


const logout = async(user_data : any) => {
   try {

      let query = { _id : user_data._id }
      let update = { access_token : null, token_gen_at : 0 }
      let options = { new : true }
      await DAO.find_and_update(Models.Users, query, update, options)


   }
   catch(err) {
      throw err;
   }
}



export {
   signup,
   login,
   near_by_drivers,
   calculate_price,
   create_booking,
   cancel_bookings,
   list_active_bookings,
   booking_history,
   logout
}