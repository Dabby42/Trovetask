import { Router } from 'express';
import { createConversation, updateConversation, getAllConversations, getSingleConversation, removeConversation } from '../../controllers/ConversationController';
import { createConversationParticipant, updateConversationParticipants, getConversationParticipants, getSingleConversationParticipant, removeConversationParticipant } from '../../controllers/ParticipantController';
import { createConversationMessage, getSingleConversationMessage, getAllConversationMessage, updateConversationMessage, removeConversationMessage } from '../../controllers/ConversationMessageController';
import { createConversationValidator, updateConversationValidator } from '../../validators/ConversationValidator';
import { createParticipantValidator, updateParticipantValidator } from '../../validators/ParticipantsValidator';
import { createConversationMessageValidator, updateConversationMessageValidator } from '../../validators/ConversationMessageValidator';
import { protect } from '../../middleware/verifyToken';
const router = Router();

router.route('/').post(protect, createConversationValidator, createConversation);
router.route('/').get(protect, getAllConversations);
router.route('/:conversationId').get(protect, getSingleConversation);
router.route('/:conversationId').patch(protect, updateConversationValidator, updateConversation);
router.route('/:conversationId').delete(protect, removeConversation);
router.route('/:conversationId/participants/:channel').post(protect, createParticipantValidator, createConversationParticipant);
router.route('/:conversationId/participants').get(protect, getConversationParticipants);
router.route('/:conversationId/participants/:participantId').get(protect, getSingleConversationParticipant);
router.route('/:conversationId/participants/:participantId').patch(protect, updateParticipantValidator, updateConversationParticipants);
router.route('/:conversationId/participants/:participantId').delete(protect, removeConversationParticipant);
router.route('/:conversationId/messages').get(protect, getAllConversationMessage);
router.route('/:conversationId/messages').post(protect, createConversationMessageValidator, createConversationMessage);
router.route('/:conversationId/messages/:messageId').get(protect, getSingleConversationMessage);
router.route('/:conversationId/messages/:messageId').patch(protect, updateConversationMessageValidator, updateConversationMessage);
router.route('/:conversationId/messages/:messageId').delete(protect, removeConversationMessage);

export default router;
