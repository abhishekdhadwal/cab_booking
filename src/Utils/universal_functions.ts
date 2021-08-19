
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

const fail_action = async(request : any, reply : any, error : any) => {
      try {

          error.output.payload.type = "Joi Error";

          if (error.isBoom) {
              delete error.output.payload.validation;
              if (error.output.payload.message.indexOf("authorization") !== -1) {
                  error.output.statusCode = error_msg.unauthorized.status_code;
                  return reply(error);
              }
              let details = error.details[0];
              if (details.message.indexOf("pattern") > -1 && details.message.indexOf("required") > -1 && details.message.indexOf("fails") > -1) {
                  error.output.payload.message = "Invalid " + details.path;
                  return reply(error);
              }
          }
          let customErrorMessage = '';
          if (error.output.payload.message.indexOf("[") > -1) {
              customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
          } else {
              customErrorMessage = error.output.payload.message;
          }
          customErrorMessage = customErrorMessage.replace(/"/g, '');
          customErrorMessage = customErrorMessage.replace('[', '');
          customErrorMessage = customErrorMessage.replace(']', '');
          error.output.payload.message = customErrorMessage.replace(/\b./g, (a) => a.toUpperCase());
          delete error.output.payload.validation;
          return error;

      }
      catch(err) {
            throw err;
      }
}


export {
      send_success,
      send_error,
      fail_action
}