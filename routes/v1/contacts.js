import express from 'express';
import {
  createContact,
  getSingleContact,
  updateContact,
  getUserContacts,
  deleteContact
} from '../../controllers/ContactsController';
import { protect } from '../../middleware/verifyToken';
import { 
  createContactValidator,
  updateContactValidator,
  isContactExistValidator
} from '../../validators/ContactsValidator';

const router = express.Router();

router.post('/', protect, createContactValidator, createContact);
router.get('/:contactId', protect, isContactExistValidator, getSingleContact);
router.get('/', protect, getUserContacts);
router.patch('/:contactId', protect, updateContactValidator, updateContact);
router.delete('/:contactId', protect, isContactExistValidator, deleteContact);

export default router;
