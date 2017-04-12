'use srict';

import UserBusiness from '../business/user.business';
import ResponseFactory from '../factories/response.factory'

const _responseFactory = new ResponseFactory();
const _userBusiness = new UserBusiness();

/**
 * Get user details
 * @property {int} req.body.id - User's Id
 * @returns {Messages}
 */
function get(req, res, next) {

  _userBusiness.get(req.query.id)
    .then(userDetails => {
      res.json(_responseFactory.success(userDetails));
    })
    .catch(e => next(e));
}

/**
 * Create new user
 * @property {int} req.body.id - User's Id
 * @property {string} req.body.name - User's Name
 * @returns {Message}
 */
function create(req, res, next) {
  
  let uservm = {
    id: req.body.id,
    name: req.body.name
  };

  _userBusiness.create(uservm)
    .then(savedUser => {
      res.json(_responseFactory.success(uservm)) 
    })
    .catch(e => next(e));
}

export default { get, create };
