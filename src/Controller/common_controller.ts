
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
import { generate_token } from '../Libs/index';
import bcrypt from 'bcrypt';

const scope = app_constansts.scope;
const salt_rounds = app_constansts.salt_rounds


const fetch_token = async(function_data : any) => {
      try {

            let fetch_token = await generate_token(function_data)

            // save token in database
            let query = { _id : function_data._id }
            let update_data = { 
                  access_token : <string>fetch_token, 
                  token_gen_at : function_data.token_gen_at 
            }
            let options = { new : true }
            let token_info = await DAO.find_and_update(function_data.collection, query, update_data, options)
            return token_info

      }
      catch(err) {
            throw err;
      }
}


const gen_user_token = async(data : any) => {
      try {

            let token_data = { 
                  _id : data._id,
                  scope : scope.user,
                  collection : Models.Users,
                  token_gen_at : +new Date()
            }
            return await fetch_token(token_data)

      }
      catch(err) {
            throw err;
      }
}

const bcrypt_password = async(password : string) => {
      try {

            const hash = await bcrypt.hashSync(password, salt_rounds);
            return hash

      }
      catch(err) {
            throw err;
      }
}

const decrypt_password = async(password : string, hash : string) => {
      try {

            const decryt = await bcrypt.compareSync(password, hash); 
            return decryt

      }
      catch(err) {
            throw err;
      }
}

const check_phone_no = async(data : any) => {
      try {

            let query = { 
                  country_code : data.country_code, 
                  phone_no : data.phone_no
            }
            let projection = { _id : 1 }
            let options = { lean : true }
            let fetch_data = await DAO.get_data(data.collection, query, projection, options)
            return fetch_data

      }
      catch(err) {
            throw err;
      }
}

export {
      fetch_token,
      gen_user_token,
      bcrypt_password,
      decrypt_password,
      check_phone_no
}