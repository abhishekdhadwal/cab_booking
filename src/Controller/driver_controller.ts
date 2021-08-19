
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
import { common_controller }  from './index';
import { driver_functions } from '../functions/index';


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





export {
   signup,
   login
}