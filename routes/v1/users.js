import express from 'express';
import { createAgent } from '../../controllers/UsersController';
import { protect } from '../../middleware/verifyToken';
import { createAgentValidator } from '../../validators/UsersValidator';

const router = express.Router();

router.post('/agent', protect, createAgentValidator, createAgent);

export default router;
