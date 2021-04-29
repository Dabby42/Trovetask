import express from 'express';
import { notificationWebhook } from '../../controllers/NotificationsController';
import { notificationWebhookValidator } from '../../validators/NotificationsValidator';

const router = express.Router();

router.post('/users/:userId/:type', notificationWebhookValidator, notificationWebhook);

export default router;
