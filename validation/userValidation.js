const Joi=require('joi');

const userValidationSchema=Joi.object({
 name:Joi.string()
     .trim()
     .min(2)
     .max(50)
     .required()
     .messages({
        'string.empty':'Name is required',
        'string.min':'Name must be atleast 2 character',
        'string.max':'Name must be less than 50 character'
     }),

  email:Joi.string()
  .trim()
  .lowercase()
  .email({ tlds: { allow: false } })
  .required()
  .messages({
    'string.empty':'Name is required',
    'string.email':'must be valid email'
  }),
  password:Joi.string()
  .min(8)
  .max(128)
  .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'))
      .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'string.max': 'Password must be less than 128 characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        }),

})


module.exports={userValidationSchema};