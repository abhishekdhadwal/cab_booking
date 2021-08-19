
import { createSchema, Type, typedModel } from 'ts-mongoose';

const UserSchema = createSchema({

      access_token : Type.string({ default : null }),
      name :  Type.string({ default : null }),
      country_code : Type.string({ default : null }),
      phone_no : Type.number({ default : 0 }),
      password : Type.string({ default : null }), 
      location : {
            type : Type.string({ default : "Point" }),
            coordinates : Type.array().of(Type.number({default : [ 0, 1 ] })),
      }, 
      address : Type.string({ default : null }), 
      token_gen_at : Type.number({ default : 0 }), 
      created_at : Type.number({ default : +new Date() })

})

UserSchema.index({ location : "2dsphere" });
const Users = typedModel('users', UserSchema);
export default Users