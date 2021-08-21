
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
import { common_controller }  from './index';
import { driver_functions } from '../functions/index';
const { default_limit } = app_constansts


const signup = async(payload_data : any) => {
   try {

      // check phone number
      let data_to_send = {
         country_code : payload_data.country_code,
         phone_no : payload_data.phone_no,
         collection : Models.Drivers
      }
      let fetch_data : any = await common_controller.check_phone_no(data_to_send)

      if (fetch_data.length) { throw error_msg.phone_no_already_exists }
      else {

         let data_to_save : any = await driver_functions.set_singup_data(payload_data)
         data_to_save.created_at = +new Date()

         let create_new_user = await DAO.save_data(Models.Drivers, data_to_save)

         // generate new token
         let response = await common_controller.gen_driver_token(create_new_user)
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
      let fetch_data : any = await DAO.get_data(Models.Drivers, query, projection, options)

      if(fetch_data.length) {

         let password = fetch_data[0].password
         let decrypt = await common_controller.decrypt_password(payload_data.password, password)
         if(decrypt != true) { throw error_msg.invalid_password }
         else {

            // generate new token
            let response = await common_controller.gen_driver_token(fetch_data[0])
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

const list_bookings = async(user_data : any) => {
   try {

      let query = { 
         driver_id : user_data._id, 
         status : { $in : [ 'PENDING', 'ACCEPT' ] } 
      }
      let projection = { __v : 0 }
      let options = { 
         lean : true, 
         sort : { _id : -1 } 
      }
      let populate = [ { path : 'user_id', select : 'name country_code phone_no' } ]
      let response = await DAO.populate_data(Models.Bookings, query, projection, options, populate)
      return response

   }
   catch(err) {
      throw err;
   }
}


const manage_bookings = async(payload_data : any, user_data : any) => {
   try {

      let { booking_id, status } = payload_data

      let query = { _id : booking_id, driver_id : user_data._id }
      let update = { status : status }
      let options = { new : true }
      let response = await DAO.find_and_update(Models.Bookings, query, update, options)
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
         driver_id : user_data._id,
         status : { $nin : [ 'PENDING', 'ACCEPT' ] }  
      }
      let projection = { __v : 0 }
      let options = { 
         lean : true, 
         sort : { _id : -1 }, 
         skip : pagination * default_limit,
         limit : default_limit
      }
      let populate = [ { path : 'user_id', select : 'name country_code phone_no' } ]
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
      await DAO.find_and_update(Models.Drivers, query, update, options)


   }
   catch(err) {
      throw err;
   }
}



export {
   signup,
   login,
   list_bookings,
   manage_bookings,
   booking_history,
   logout
}