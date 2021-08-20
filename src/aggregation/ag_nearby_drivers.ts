
import { app_constansts } from "../Config/index";
const { per_km_price, default_limit } = app_constansts


const near_by_drivers = async(lat : number, lng : number) => {
    try {

        return {
            $geoNear : {
                near : { type : "Point", coordinates : [ lng , lat ] },
                distanceField : "calculated_distance",
                spherical : true,
                distanceMultiplier : 0.001
            }
        }

    }
    catch(err) {
        throw err;
    }
}


const set_data = async() => {
    try {

        return {
            $set : {
                trunc_distance : { "$trunc" : ["$calculated_distance", 2 ] },
                estimated_price : { 
                    $let : {
                        vars : {
                            distance : { "$trunc" : ["$calculated_distance", 2 ] },
                            per_km_price : per_km_price
                        },
                        in : { $trunc : [ { $multiply : [ "$$distance", "$$per_km_price" ] }, 2 ] }
                    }
                }
            }
        }

    }
    catch(err) {
        throw err;
    }
}

const group_data = async() => {
    try {

        return {
            $group : {
                _id : "$_id",
                driver_name : { "$first" : "$name" },
                country_code : { "$first" : "$country_code" },
                phone_no : { "$first" : "$phone_no" },
                location : { "$first" : "$location" },
                address : { "$first" : "$address" },
                distance : { "$first" : "$trunc_distance" },
                per_km_price : { "$first" : per_km_price },
                estimated_price : { "$first" : "$estimated_price" },
            }
        }

    }
    catch(err) {
        throw err;
    }
}


const sort_data = async() => {
    try {

        return {
            $sort : {
                distance : 1,
                _id : -1   
            }
        }

    }
    catch(err) {
        throw err;
    }
}

const skip_data = async(pagination : number) => {
    try {

        return {
            $skip : pagination * default_limit
        }

    }
    catch(err) {
        throw err;
    }
}

const limit_data = async() => {
    try {

        return {
            $limit : default_limit
        }

    }
    catch(err) {
        throw err;
    }
}



export {
    near_by_drivers,
    set_data,
    group_data,
    sort_data,
    skip_data,
    limit_data
}