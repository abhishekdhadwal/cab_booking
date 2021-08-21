
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

let invalid_booking_id = {
      status_code : 400,
      custom_msg : 'Sorry this is not a valid booking _id, Please try again',
      type : 'invalid_booking_id'
}

let rejected_booking_error = {
      status_code : 400,
      custom_msg : 'Sorry you can not cancel rejected booking, Please try again',
      type : 'rejected_booking_error'
}

let cancelled_booking_error = {
      status_code : 400,
      custom_msg : 'Booking already cancelled',
      type : 'cancelled_booking_error'
}

let completed_booking_error = {
      status_code : 400,
      custom_msg : 'Sorry you can not cancel completed booking, Please try again',
      type : 'rejected_booking_error'
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
      phone_no_not_registered,
      invalid_booking_id,
      rejected_booking_error,
      cancelled_booking_error,
      completed_booking_error
}