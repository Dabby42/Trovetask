import express from 'express';
import { createPortfolio, getSinglePortfolio, getUserPortfolio, deletePortfolio, getUserPortfolioValue} from '../../controllers/PortfolioController';
import { protect } from '../../middleware/verifyToken';

const router = express.Router();

router.post('/', protect,  createPortfolio);
router.get('/:id', protect,  getSinglePortfolio);
router.get('/', protect,  getUserPortfolio);
router.get('/value', protect,  getUserPortfolioValue);
router.delete('/:id', protect,  deletePortfolio);

export default router;
