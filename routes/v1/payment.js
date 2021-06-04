import express from 'express';
import { payLoan, verifyPay } from '../../controllers/PaymentController';
import { protect } from '../../middleware/verifyToken';

const router = express.Router();

router.post('/initialize', protect,  payLoan);
router.get('/verify', protect,  verifyPay);

export default router;
