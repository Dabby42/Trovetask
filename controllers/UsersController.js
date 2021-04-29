import cryptoRandomString from 'crypto-random-string';
import asyncHandler from '../middleware/asyncHandler';
import User from '../models/User';
import EmailNotification from '../utils/notifications/email';
import { resetPasswordTemplate } from '../utils/notifications/email/templates';


/**
 * @desc   Create an Agent
 * @route  POST /api/v1/users/agent
 * @access Private
 */
export const createAgent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { firstName, lastName, email, country } = req.body;
  const password = cryptoRandomString({length: 10, type: 'alphanumeric'});

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    country,
    role: 'agent',
    mainAccount: _id
  });

  await user.save();
  const token = user.getSignedJwtToken();

  const htmlBody = resetPasswordTemplate({ name: firstName, token});
  const subject = 'New Account: Set Your Password'
  EmailNotification(email, subject, htmlBody);

  return res.status(201).json({
    status: 201,
    success: true,
    data: user.response(),
    message: 'Agent created successfully'
  })
});

