
import Boom from '@hapi/boom';
import { error_msg } from '../Config/index';


const send_success = (success_msg, response) => {

            if(success_msg.hasOwnProperty('status_code') && success_msg.hasOwnProperty('custom_msg')) {

                  return {
                        statusCode : success_msg.status_code,
                        message : success_msg.custom_msg,
                        data : response || {}
                  }

            }else {

                  return {
                        statusCode : 200,
                        message : success_msg,
                        data : response || {}
                  }

            }

}


const send_error = (error_msg, reply) => {

      if(error_msg.hasOwnProperty('status_code') && error_msg.hasOwnProperty('custom_msg')) {

            let message = new Error(error_msg.custom_msg);
            let options = { statusCode : error_msg.status_code }
            let error =  Boom.boomify(message, options);
            return error

      }else {

            let message = new Error(error_msg);
            let options = { statusCode : 400 }
            let error =  Boom.boomify(message, options);
            return error
      
      }

}



export {
      send_success,
      send_error
}