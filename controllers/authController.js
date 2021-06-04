import pkg from 'jsonwebtoken';
import _ from 'lodash';
import nodemailer from 'nodemailer';
import asyncHandler from '../middleware/asyncHandler';
import ErrorResponse from '../utils/errorResponseClass';
import User from '../models/User';
import EmailNotification from '../utils/notifications/email';
import { resetPasswordTemplate } from '../utils/notifications/email/templates';

const { verify } = pkg;

//@desc     Register User
//@route    POST /api/v1/auth/register
//@access   Public
export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, country } = req.body;

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    country,
  });

  await user.save();

  const token = await user.getSignedJwtToken();

  return res.status(201).json({
    status: 201,
    data: {
      ...user.response(),
      token
    },
    message: 'Account created successfully'
  });
});

//@desc     Login User
//@route    POST /api/v1/auth/login
//@access   Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate user email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  //Check up user in the db
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  const isMatch = user.matchedPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});


//@desc     Get current logged in user
//@route    GET /api/v1/auth/me
//@access   Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById({_id: req.user._id});

  res.status(200).json({
    success: true,
    status: 200,
    data: {
      ...user.response()
    },
    message: 'logged in user retrieved successfully'
  });
});

//@desc     Forget Password
//@route    POST /api/v1/auth/forgotpassword
//@access   Private
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const {email} = req.body;

  //Search if user exist
  const user = await User.findOne({email});

  if (!user) {
    return next(new ErrorResponse('User with this email does not exist', 401));
  }
  
  //Generate token for user
  const token = user.getSignedJwtToken();
  const htmlBody = resetPasswordTemplate({ name: user.firstName, token});
  const subject = 'Reset Your Password'

  //Update user reset password property
  const resetPasswordToken = await User.updateOne({resetPasswordToken: token});

  if (!resetPasswordToken) {
    return next(new ErrorResponse('reset password link error', 500));
  }
  
  //Send reset link as a mail to user
  EmailNotification(email, subject, htmlBody);

  return res.status(200).json({
    success: true,
    status: 200,
    message: "Email has been sent successfully"
  })
})

//@desc     Reset Password
//@route    PATCH /api/v1/auth/resetpassword
//@access   Private
export const resetPassword = asyncHandler (async (req, res, next) => {
  const {newPassword, resetPasswordToken} = req.body;

  //check if reset password token exist in the request body
  if(!resetPasswordToken){
    return next(new ErrorResponse('Authentication error!', 401)); 
  }
  
  //Check if the reset password token exist in db
  let user = await User.findOne({resetPasswordToken});
  if(!user){
    return next(new ErrorResponse('User with this token does not exist', 401)); 
  }

  //decode the token to verify user
  const decoded = verify(resetPasswordToken, process.env.JWT_SECRET);
  if (!decoded) {
    return next(new ErrorResponse('Incorrect token or token is expired', 401));
  }

  //Update user password in the db
  const obj = {
    password: newPassword,
    resetPasswordToken: ''
  }
  user = _.extend(user, obj);
  await user.save();

  return res.status(200).json({
    success: true,
    status: 200,
    message: "Password changed successfully"
  })
})

//We will be getting token from the model, create a cookie  and then send the response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY_PERIOD * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    status: statusCode,
    data: {
      ...user.response(),
      token
    },
    message: 'User logged in successfully'
  });
};
