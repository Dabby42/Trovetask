import asyncHandler from '../middleware/asyncHandler';
import User from '../models/User';

/**
 * @desc   Update a User
 * @route  PATCH /api/v1/users/:userId
 * @access Private
 */
 export const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, phoneNumber, country } = req.body;
  const payload = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(email && { email }),
    ...(phoneNumber && { phoneNumber }),
    ...(country && { country })
  }

  const user = await User.findByIdAndUpdate(
    userId,
    payload,
    { new: true }
  )

  return res.status(200).json({
    status: 200,
    success: true,
    data: user,
    message: 'User updated successfully'
  })
});


/**
 * @desc   Get Users
 * @route  GET /api/v1/users
 * @access Private
 */
 export const getAllUsers = asyncHandler(async (req, res) => {

  const users = await User.find();

  return res.status(200).json({
    status: 200,
    success: true,
    data: users,
    message: 'Users was fetched successfully'
  })
});

/**
 * @desc   Delete a user
 * @route  DELETE /api/v1/users/:userId
 * @access Private
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  await User.findByIdAndDelete(userId)

  return res.status(200).json({
    status: 200,
    success: true,
    message: 'User deleted successfully'
  })
});

