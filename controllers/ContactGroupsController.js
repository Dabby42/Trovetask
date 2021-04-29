import asyncHandler from '../middleware/asyncHandler';
import ContactGroup from '../models/ContactGroup';


/**
 * @desc   Create a Contact Group
 * @route  POST /api/v1/contactgroups
 * @access Private
 */
export const createContactGroup = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { name, contacts } = req.body;
  const contactGroup = new ContactGroup({
    name,
    contacts,
    user: _id
  });

  await contactGroup.save();

  return res.status(201).json({
    status: 201,
    success: true,
    data: contactGroup,
    message: 'New contact group created successfully'
  });
});

/**
 * @desc   Update a Contact Group
 * @route  PATCH /api/v1/contactgroups/:contactGroupId
 * @access Private
 */
 export const updateContactGroup = asyncHandler(async (req, res) => {
  const { contactGroupId } = req.params;
  const { name, contacts } = req.body;
  const payload = {
    ...(name && { name }),
    ...(contacts && { contacts })
  }

  const contactGroup = await ContactGroup.findByIdAndUpdate(
    contactGroupId,
    payload,
    { new: true }
  )

  return res.status(200).json({
    status: 200,
    success: true,
    data: contactGroup,
    message: 'Contact group updated successfully'
  });
});

/**
 * @desc   Get Single Contact Group
 * @route  GET /api/v1/contactgroups/:contactGroupId
 * @access Private
 */
 export const getSingleContactGroup = asyncHandler(async (req, res) => {
  const { contactGroupId } = req.params;

  const contactGroup = await ContactGroup.findById(contactGroupId)
    .populate('contacts');

  return res.status(200).json({
    status: 200,
    success: true,
    data: contactGroup,
    message: 'Contact group was fetched successfully'
  });
});

/**
 * @desc   Get User Contact Groups
 * @route  GET /api/v1/contactgroups
 * @access Private
 */
 export const getUserContactGroups = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const contactgroups = await ContactGroup.find({ user: _id });

  return res.status(200).json({
    status: 200,
    success: true,
    data: contactgroups,
    message: 'Contact groups was fetched successfully'
  });
});

/**
 * @desc   Delete a Contact Group
 * @route  DELETE /api/v1/contactgroups/:contactGroupId
 * @access Private
 */
export const deleteContactGroup = asyncHandler(async (req, res) => {
  const { contactGroupId } = req.params;

  await ContactGroup.findByIdAndDelete(contactGroupId)

  return res.status(200).json({
    status: 200,
    success: true,
    message: 'Contact group deleted successfully'
  });
});
