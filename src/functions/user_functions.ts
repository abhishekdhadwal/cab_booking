
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { common_controller }  from '../Controller/index';




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


export {
    set_singup_data
}