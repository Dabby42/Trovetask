import { Router } from 'express';
import { register, login, getMe, forgotPassword, resetPassword } from '../../controllers/AuthController.js';
import { protect } from '../../middleware/verifyToken.js';
import { registerValidator, loginValidator, resetPasswordValidator, forgotPasswordValidator } from '../../validators/AuthValidator';
const router = Router();

router.route('/login').post( loginValidator,login);
router.route('/register').post(registerValidator ,register);
router.route('/me').get(protect, getMe);
router.route('/forgotpassword').post(forgotPasswordValidator, forgotPassword);
router.route('/resetpassword').patch(resetPasswordValidator, resetPassword);

export default router;
