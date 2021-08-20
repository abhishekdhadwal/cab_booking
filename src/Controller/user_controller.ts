
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
import { common_controller }  from './index';
import { user_functions } from '../functions/index';
import { ag_nearby_drivers } from '../aggregation/index';


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
      return fetch_data

   }
   catch(err) {
      throw err;
   }
}



export {
   signup,
   login,
   near_by_drivers
}