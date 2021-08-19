import * as jwt from 'jsonwebtoken';
import * as DAO from "../DAO";
import * as Models from '../Models';
import { universal_functions } from '../Utils/index';
import { error_msg, app_constansts } from '../Config/index';

const sk = app_constansts.seckret_keys;
const scope = app_constansts.scope;
const options = { algorithm : "HS256" };


// step 1 : generate token
const generate_token = (token_data : any) => {

      return new Promise((resolve, reject) => {
            try {

                  let seckret_key = null;
                  if(token_data.scope == scope.driver) { seckret_key = sk.driver_seckret_key }
                  if(token_data.scope == scope.user) { seckret_key = sk.user_seckret_key }

                  const token = jwt.sign(token_data, seckret_key, options)
                  return resolve(token);

            }
            catch(err) {
                  throw reject(err);
            }
      })

}

// step 2 : verify token
const verify_token = async (token : any) => {
      try {

            let decoded = token;

            let query : any = { 
                  _id : decoded._id, 
                  access_token : { $ne : null },
                  token_gen_at : decoded.token_gen_at
            }
            let projection = { __v : 0 }
            let options = { lean : true }
            let fetch_data : any = {}
      
            // if(decoded.scope == scope.driver) {
            //       fetch_data = await DAO.get_data(Models.Admin, query, projection, options)
            // }
            if(decoded.scope == scope.user) {
                  fetch_data = await DAO.get_data(Models.Users, query, projection, options)
            }            

            if(fetch_data.length == 0) { throw universal_functions.send_error(error_msg.unauthorized, null) }
            else { 
                  return { 
                        isValid : true,
                        credentials : fetch_data[0]
                  }
            }

      }
      catch(err) {
            throw err;
      }

}


export {
      generate_token,
      verify_token
}