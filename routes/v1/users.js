import express from 'express';
import { updateUser, getAllUsers, deleteUser } from '../../controllers/UsersController';
import { protect } from '../../middleware/verifyToken';

const router = express.Router();

router.put('/:id', protect,  updateUser);
router.get('/', protect,  getAllUsers);
router.delete('/:id', protect,  deleteUser);

export default router;
