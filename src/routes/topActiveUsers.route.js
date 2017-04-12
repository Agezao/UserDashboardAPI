import express from 'express';
import topActiveUsersCtrl from '../controllers/topActiveUsers.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /topActiveUsers?page={page.number} - Get most active users on the platform */
  .get(topActiveUsersCtrl.get)

export default router;
