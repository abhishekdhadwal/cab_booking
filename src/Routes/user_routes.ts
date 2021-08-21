
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


const calculate_price = {
   method : "GET",
   path : "/User/calculate_price",
   options : {
      description : "User calculate price api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return user_controller.calculate_price(request.query)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         headers : header,
         query : user_validator.calculate_price,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}


const create_booking = {
   method : "POST",
   path : "/User/create_booking",
   options : {
      description : "User create booking api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return user_controller.create_booking(request.payload, request.auth.credentials)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         headers : header,
         payload : user_validator.create_booking,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}


const cancel_bookings = {
   method : "PUT",
   path : "/User/cancel_bookings",
   options : {
      description : "User cancel bookings api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return user_controller.cancel_bookings(request.payload, request.auth.credentials)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         headers : header,
         payload : user_validator.cancel_bookings,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}


const list_active_bookings = {
   method : "GET",
   path : "/User/list_active_bookings",
   options : {
      description : "User list active bookings api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return user_controller.list_active_bookings(request.auth.credentials)
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


const booking_history = {
   method : "GET",
   path : "/User/booking_history",
   options : {
      description : "User booking history api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return user_controller.booking_history(request.query, request.auth.credentials)
         .then(response => {
               return universal_functions.send_success(success_msg.default_msg, response);
         })    
         .catch(error => {
               return universal_functions.send_error(error, reply);
         });
      },
      validate : {
         headers : header,
         query : user_validator.booking_history,
         failAction : universal_functions.fail_action
      },
      plugins : plugins
   }
}


const logout = {
   method : "PUT",
   path : "/User/logout",
   options : {
      description : "User logout api",
      auth : { strategies : [ scope ] },
      tags : ["api"],
      handler : (request, reply) => {
         return user_controller.logout(request.auth.credentials)
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
   near_by_drivers,
   calculate_price,
   create_booking,
   cancel_bookings,
   list_active_bookings,
   booking_history,
   logout
]

export default user_routes