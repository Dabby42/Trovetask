import asyncHandler from '../middleware/asyncHandler';
import { client } from '../config/twilio';
import Conversation from '../models/Conversation';

/**
 * @desc   Create conversation message
 * @route  POST /api/v1/conversations/:conversationId/messages
 * @access Private
 */
export const createConversationMessage = asyncHandler(async (req, res, next) => {
    const { author, body } = req.body;
    const { conversationId } = req.params;
    let conversationMessage = await client.conversations.conversations(conversationId).messages.create({ author, body })
    let data = {
        conversationId,
        messageId: conversationMessage.sid,
        body: conversationMessage.body,
        author: conversationMessage.author,
        participantId: conversationMessage.participantSid,
        delivery: conversationMessage.delivery
    }

    let newConversation = new Conversation(data);
    await newConversation.save();

    res.status(201).send({
        data,
        success: true,
        status: 201,
        message: "Created a conversation message successfully"
    })
});

/**
 * @desc   Get a conversation message
 * @route  GET /api/v1/conversations/:conversationId/messages/:messageId
 * @access Private
*/
export const getSingleConversationMessage = asyncHandler(async (req, res, next) => {
    const { conversationId, messageId } = req.params;
    let conversationMessage = await client.conversations.conversations(conversationId).messages(messageId).fetch();

    let data = {
        conversationId,
        chatId: conversationMessage.sid,
        body: conversationMessage.body,
        author: conversationMessage.author,
        participantId: conversationMessage.participantSid,
        delivery: conversationMessage.delivery
    }

    res.status(200).send({
        data,
        success: true,
        status: 200,
        message: "Fetched conversation message successfully"
    })
});

/**
 * @desc   Get all conversations
 * @route  GET /api/v1/conversations/:conversationId/messages
 * @access Private
 */
export const getAllConversationMessage = asyncHandler(async (req, res, next) => {
    const {conversationId} = req.params;
    const data = await Conversation.find({ conversationId });

    res.status(200).send({
        data,
        success: true,
        status: 200,
        message: "Conversation messages retrieved successfully"
    });
});

/**
 * @desc   Update a conversation message
 * @route  PATCH /api/v1/conversations/:conversationId/messages/:messageId
 * @access Private
 */
export const updateConversationMessage = asyncHandler(async (req, res, next) => {
    const { conversationId, messageId } = req.params;
    let updatedConversationMessage = await client.conversations.conversations(conversationId).messages(messageId).update(req.body)
    let data = {
        conversationId,
        chatId: updtedConversationMessage.sid,
        body: updatedConversationMessage.body,
        author: updatedConversationMessage.author,
        participantId: updatedConversationMessage.participantSid,
        delivery: wpdatedConversationMessage.delivery
    }
    res.status(200).send({
        data,
        success: true,
        status: 200,
        message: "Updated conversation message successfully"
    })
});

/**
 * @desc   Remove an conversation
 * @route  DELETE /api/v1/conversations/:conversationId/messages/:messageId
 * @access Private
 */
export const removeConversationMessage = asyncHandler(async (req, res, next) => {
    const { conversationId, messageId } = req.params;
    await client.conversations.conversations(conversationId).messages(messageId).remove();
    await Conversation.deleteOne({ messageId });
    res.status(200).send({
        success: true,
        status: 200,
        message: "Removed conversation message successfully"
    })
});



