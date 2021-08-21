
import { createSchema, Type, typedModel } from 'ts-mongoose';
import * as Models from './index';

const status = [ 'PENDING', 'ACCEPT', 'REJECT', 'CANCELLED', 'COMPLETED' ]


const BookingsSchema = createSchema({

    driver_id : Type.ref(Type.objectId({ default : null })).to('drivers', <any>Models.Drivers),
    user_id : Type.ref(Type.objectId({ default : null })).to('users', <any>Models.Users),
    status : Type.string({ default : 'PENDING', enum : status }),
    price : Type.number({ default : 0 }),
    current_location : {
        type : Type.string({ default : "Point" }),
        coordinates : Type.array().of(Type.number({default : [ 0, 1 ] })),
    }, 
    current_address : Type.string({ default : null }), 
    destination_location : {
        type : Type.string({ default : "Point" }),
        coordinates : Type.array().of(Type.number({default : [ 0, 1 ] })),
    }, 
    destination_address : Type.string({ default : null }), 
    created_at : Type.number({ default : +new Date() })

})

BookingsSchema.index({ current_location : "2dsphere" });
BookingsSchema.index({ destination_location : "2dsphere" });
const Bookings = typedModel('bookings', BookingsSchema);
export default Bookings