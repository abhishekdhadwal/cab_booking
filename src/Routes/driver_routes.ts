
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
      description : "Driver signup api",
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
      description : "Driver login api",
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


const list_bookings = {
   method : "GET",
   path : "/Driver/list_bookings",
   options : {
      description : "Driver login api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return driver_controller.list_bookings(request.auth.credentials)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         headers : header,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}


const manage_bookings = {
   method : "PUT",
   path : "/Driver/manage_bookings",
   options : {
      description : "Driver manage bookings api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return driver_controller.manage_bookings(request.payload, request.auth.credentials)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         headers : header,
         payload : driver_validator.manage_bookings,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}

const booking_history = {
   method : "GET",
   path : "/Driver/booking_history",
   options : {
      description : "Driver booking history api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return driver_controller.booking_history(request.query, request.auth.credentials)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         headers : header,
         query : driver_validator.booking_history,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}


const logout = {
   method : "PUT",
   path : "/Driver/logout",
   options : {
      description : "Driver logout api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return driver_controller.logout(request.auth.credentials)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         headers : header,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}








const user_routes = [
   signup,
   login,
   list_bookings,
   manage_bookings,
   booking_history,
   logout
]

export default user_routes