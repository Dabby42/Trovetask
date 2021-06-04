import { Router } from 'express';
import { takeLoan} from '../../controllers/BorrowerController.js';
import { protect } from '../../middleware/verifyToken.js';
const router = Router();

router.route('/').post( protect, takeLoan);

export default router;
