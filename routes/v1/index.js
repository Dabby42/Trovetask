import express from 'express';
import AuthRoute from './auth';
import conversations from './conversations';
import notifications from './notifications';
import users from './users';
import contacts from './contacts';
import rooms from './rooms';
import contactGroups from './contactGroups';
import reports from './reports';

const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/conversations', conversations);
router.use('/users', users);
router.use('/rooms', rooms);
router.use('/notifications', notifications);
router.use('/contacts', contacts);
router.use('/contactgroups', contactGroups);
router.use('/reports', reports);

export default router;
