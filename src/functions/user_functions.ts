
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { common_controller }  from '../Controller/index';
import { error_msg } from '../Config';




const set_singup_data = async(data : any) => {
    try {

        let hash_password = await common_controller.bcrypt_password(data.password)

        let set_data : any = {
            name :  data.name,
            country_code : data.country_code,
            phone_no : data.phone_no,
            password : hash_password, 
            "location.coordinates" : [data.lng, data.lat],
            address : data.address
        }

        return set_data

    }
    catch(err) {
        throw err;
    }
}


const check_booking_status = async(user_id : string, booking_id : string) => {
    try {

        let query = { _id : booking_id, user_id : user_id }
        let projection = { status : 1 }
        let options = { lean : true }
        let fetch_data : any = await DAO.get_data(Models.Bookings, query, projection, options)

        if(fetch_data.length) { return fetch_data[0].status }
        else { throw error_msg.invalid_booking_id }

    }
    catch(err) {
        throw err;
    }
}


export {
    set_singup_data,
    check_booking_status
}