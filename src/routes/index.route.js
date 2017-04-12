import express from 'express';
import topActiveUsers from './topActiveUsers.route';
import user from './user.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount TopActiveUsers routes at /topActiveUsers
router.use('/topActiveUsers', topActiveUsers);

// mount Users routes at /users
router.use('/users', user);

export default router;
