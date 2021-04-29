import asyncHandler from '../middleware/asyncHandler';
import Contact from '../models/Contact';


/**
 * @desc   Create a Contact
 * @route  POST /api/v1/contacts
 * @access Private
 */
export const createContact = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { firstName, lastName, email, phoneNumber } = req.body;

  const contact = new Contact({
    firstName,
    lastName,
    email,
    phoneNumber,
    user: _id
  });

  await contact.save();

  return res.status(201).json({
    status: 201,
    success: true,
    data: contact,
    message: 'New contact created successfully'
  })
});

/**
 * @desc   Update a Contact
 * @route  PATCH /api/v1/contacts/:contactId
 * @access Private
 */
 export const updateContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;
  const { firstName, lastName, email, phoneNumber } = req.body;
  const payload = {
    ...(firstName && { firstName }),
    ...(lastName && { lastName }),
    ...(email && { email }),
    ...(phoneNumber && { phoneNumber })
  }

  const contact = await Contact.findByIdAndUpdate(
    contactId,
    payload,
    { new: true }
  )

  return res.status(200).json({
    status: 200,
    success: true,
    data: contact,
    message: 'Contact updated successfully'
  })
});

/**
 * @desc   Get a Contact
 * @route  GET /api/v1/contacts/:contactId
 * @access Private
 */
 export const getSingleContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId)

  return res.status(200).json({
    status: 200,
    success: true,
    data: contact,
    message: 'Contact was fetched successfully'
  })
});

/**
 * @desc   Get User Contacts
 * @route  GET /api/v1/contacts
 * @access Private
 */
 export const getUserContacts = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const contacts = await Contact.find({ user: _id });

  return res.status(200).json({
    status: 200,
    success: true,
    data: contacts,
    message: 'Contacts was fetched successfully'
  })
});

/**
 * @desc   Delete a Contact
 * @route  DELETE /api/v1/contacts/:contactId
 * @access Private
 */
export const deleteContact = asyncHandler(async (req, res) => {
  const { contactId } = req.params;

  await Contact.findByIdAndDelete(contactId)

  return res.status(200).json({
    status: 200,
    success: true,
    message: 'Contact deleted successfully'
  })
});
