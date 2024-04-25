const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid('user', 'admin'),
  });

const validateUser = (user) => {
    const { error } = userSchema.validate(user);
    return error ? error.details[0].message : null;
  };

module.exports = validateUser;