import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /users?id={user.id} - Get user data */
  .get(userCtrl.get)

  /** POST /users - Save a new User */
  .post(validate(paramValidation.newUser), userCtrl.create)

export default router;
