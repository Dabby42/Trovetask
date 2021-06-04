import express from 'express';
import AuthRoute from './auth';
import users from './users';
import portfolio from './portfolio';
import borrower from './borrower';
import payment from './payment';
import portfolioValue from './portfolioValue';
const router = express.Router();

router.use('/auth', AuthRoute);
router.use('/users', users);
router.use('/payment', payment);
router.use('/borrow', borrower);
router.use('/portfolio', portfolio);
router.use('/portfolioValue', portfolioValue);

export default router;
