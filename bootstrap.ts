
import * as DAO from './src/DAO/index';
import * as Models from './src/Models/index';
import { common_controller } from './src/Controller/index';

const bootstrap_data = async() => {
    try {

        // # check default user exists or not
        let fetch_users : any = await check_users()
        if(!fetch_users.length) { await create_default_user() }

        // # check default druver exists or not
        let fetch_drivers : any = await check_drivers()
        if(!fetch_drivers.length) { await create_default_driver() }
        
    }
    catch(err) {
        throw err;
    }
}



const check_users = async() => {
    try {

        let query = { country_code : "+91", phone_no : 8219192328 }
        let projection = { __v : 0 }
        let options = { lean : true }
        let fetch_data = await DAO.get_data(Models.Users, query, projection, options)
        return fetch_data

    }
    catch(err) {
        throw err;
    }
}

const create_default_user = async() => {
    try {

        let hash_password = await common_controller.bcrypt_password('qwerty')

        let data_to_save = {
            name :  'default_user',
            country_code : "+91",
            phone_no : 8219192328,
            password : hash_password,
            'location.coordinates' : [ 76.3789, 32.1054 ], 
            address : "Nagrota Bagwan, Himachal Pradesh",  
            created_at : +new Date()
        }

        await DAO.save_data(Models.Users, data_to_save)

    }
    catch(err) {
        throw err;
    }
}


const check_drivers = async() => {
    try {

        let query = { country_code : "+91", phone_no : 9192939495 }
        let projection = { __v : 0 }
        let options = { lean : true }
        let fetch_data = await DAO.get_data(Models.Drivers, query, projection, options)
        return fetch_data

    }
    catch(err) {
        throw err;
    }
}

const create_default_driver = async() => {
    try {

        let hash_password = await common_controller.bcrypt_password('qwerty')

        let data_to_save = {
            name :  'default_driver',
            country_code : "+91",
            phone_no : 9192939495,
            password : hash_password,
            'location.coordinates' : [ 76.2691, 32.0998 ], 
            address : "Kangra, Himachal Pradesh",  
            created_at : +new Date()
        }

        await DAO.save_data(Models.Drivers, data_to_save)

    }
    catch(err) {
        throw err;
    }
}



export default bootstrap_data;