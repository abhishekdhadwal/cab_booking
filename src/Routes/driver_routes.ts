
import { driver_controller } from '../Controller/index';
import { success_msg, app_constansts, swagger_msgs } from '../Config/index';
import { universal_functions } from '../Utils/index';
import { driver_validator, header } from '../validators/index';
const scope = app_constansts.scope.driver;


const plugins = {
   "hapi-swagger": {
      payloadType : "form",
      responseMessages : swagger_msgs
   }
}


const signup = {
   method : "POST",
   path : "/Driver/signup",
   options : {
      description : "User signup api",
      auth : false,
      tags : ["api"],
      handler : (request, reply) => {
         return driver_controller.signup(request.payload)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         payload : driver_validator.signup,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}

const login = {
   method : "POST",
   path : "/Driver/login",
   options : {
      description : "User login api",
      auth : false,
      tags : ["api"],
      handler : (request, reply) => {
         return driver_controller.login(request.payload)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         payload : driver_validator.login,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}


const user_routes = [
   signup,
   login
]

export default user_routes