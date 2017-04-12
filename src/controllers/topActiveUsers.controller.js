'use srict';

import ActiveUsersBusiness from '../business/activeUsers.business';
import ResponseFactory from '../factories/response.factory'

const _responseFactory = new ResponseFactory();
const _activeUsersBusiness = new ActiveUsersBusiness();

/**
 * Get most active users
 * @property {int} req.body.page - Actual page
 * @returns {Messages}
 */
function get(req, res, next) {
  
  _activeUsersBusiness.get(req.query.page)
    .then(entries => {
    	if(!entries)
    		return res.json(_responseFactory.fail(-1, 'Not enough data to show'));
		res.json(_responseFactory.success(entries));
    })
    .catch(e => next(e));
}

export default { get };
