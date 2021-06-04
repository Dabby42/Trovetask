import express from 'express';
import { getUserPortfolioValue} from '../../controllers/PortfolioController';
import { protect } from '../../middleware/verifyToken';

const router = express.Router();

router.get('/', protect,  getUserPortfolioValue);

export default router;
