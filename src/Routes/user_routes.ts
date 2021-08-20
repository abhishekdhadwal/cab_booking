
import { user_controller } from '../Controller/index';
import { success_msg, app_constansts, swagger_msgs } from '../Config/index';
import { universal_functions } from '../Utils/index';
import { user_validator, header } from '../validators/index';
const scope = app_constansts.scope.user;


const plugins = {
   "hapi-swagger": {
      payloadType : "form",
      responseMessages : swagger_msgs
   }
}


const signup = {
   method : "POST",
   path : "/User/signup",
   options : {
      description : "User signup api",
      auth : false,
      tags : ["api"],
      handler : (request, reply) => {
         return user_controller.signup(request.payload)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         payload : user_validator.signup,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}

const login = {
   method : "POST",
   path : "/User/login",
   options : {
      description : "User login api",
      auth : false,
      tags : ["api"],
      handler : (request, reply) => {
         return user_controller.login(request.payload)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         payload : user_validator.login,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}

const near_by_drivers = {
   method : "GET",
   path : "/User/near_by_drivers",
   options : {
      description : "User get near by drivers api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return user_controller.near_by_drivers(request.query)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         headers : header,
         query : user_validator.near_by_drivers,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}


const user_routes = [
   signup,
   login,
   near_by_drivers
]

export default user_routes