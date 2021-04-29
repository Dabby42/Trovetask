import express from 'express';
import {
  createContactGroup,
  getSingleContactGroup,
  updateContactGroup,
  getUserContactGroups,
  deleteContactGroup
} from '../../controllers/ContactGroupsController';
import { protect } from '../../middleware/verifyToken';
import { 
  createContactGroupValidator,
  updateContactGroupValidator,
  isContactGroupExistValidator
} from '../../validators/ContactGroupsValidator';

const router = express.Router();

router.post('/', protect, createContactGroupValidator, createContactGroup);
router.get('/:contactGroupId', protect, isContactGroupExistValidator, getSingleContactGroup);
router.get('/', protect, getUserContactGroups);
router.patch('/:contactGroupId', protect, updateContactGroupValidator, updateContactGroup);
router.delete('/:contactGroupId', protect, isContactGroupExistValidator, deleteContactGroup);

export default router;
