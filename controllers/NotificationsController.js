import AsyncHandler from '../middleware/asyncHandler';
import Notification from '../models/Notification';

/**
 * @desc   Create Notifcation report 
 * @route  POST /api/v1/notifications/:userId/:type
 * @access Private
 */
export const notificationWebhook = AsyncHandler( async (req, res) => {
  const { userId, type } = req.params;
  const { 
    id,
    ref_id,
    to,
    from,
    status,
    body,
    price,
    balance,
    error_code,
    error_reason,
    event_timestamp
  } = req.body;

  let newNotification;

  switch (type) {
    case 'sms':
    case 'whatsapp':      
      newNotification = new Notification({
        user: userId,
        notificationId: id,
        refId: ref_id,
        status,
        content: body,
        to,
        from,
        deliveryTimestamp: event_timestamp,
        error: {
          code: error_code,
          message: error_reason
        },
        type
      });
      break;
    default:
      break;
  }

  await newNotification.save();

  return res.status(201).json({
    status: 201,
    success: true,
    data: newNotification,
    message: `${type} notification status response received`
  })

});