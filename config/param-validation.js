import Joi from 'joi';

export default {

  // POST /users
  newUser: {
    body: {
      id: Joi.number().required(),
      name: Joi.string().required()
    }
  }
};
