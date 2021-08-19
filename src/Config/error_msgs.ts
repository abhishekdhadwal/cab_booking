
let default_msg = {
      status_code : 400,
      custom_msg : 'Bad Request',
      type : 'default_msg'
}

let no_data_found = {
      status_code : 400,
      custom_msg : 'No data found',
      type : 'no_data_found'
}

let invalid_credentials = {
      status_code : 401,
      custom_msg : 'Inavalid login details',
      type : 'invalid_credentials'
}

let invalid_password = {
      status_code : 400,
      custom_msg : 'password entered is incorrect.',
      type : 'invalid_password'
}

let unauthorized = {
      status_code : 400,
      custom_msg : 'you are not authorized to perform this action.',
      type : 'unauthorized'
}

let data_already_exists = {
      status_code : 400,
      custom_msg : 'This phone number or email address, alreday exists.',
      type : 'data_already_exists'
}

let phone_no_already_exists = {
      status_code : 400,
      custom_msg : 'This phone number is already registered with us, Please try again.',
      type : 'phone_no_already_exists'
}


let something_went_wrong = {
      status_code : 400,
      custom_msg : 'Sorry something went wrong, Please contact developer',
      type : 'something_went_wrong'
}

let phone_no_not_registered = {
      status_code : 400,
      custom_msg : 'Sorry this phone number is not registered with us, Please try again',
      type : 'phone_no_not_registered'
}

export {
      default_msg,
      no_data_found,
      invalid_credentials,
      invalid_password,
      unauthorized,
      data_already_exists,
      phone_no_already_exists,
      something_went_wrong,
      phone_no_not_registered
}