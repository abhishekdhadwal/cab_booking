import Joi from 'joi';

const header = Joi.object({ authorization : Joi.string().required() }).options({ allowUnknown: true })

export {
      header
}