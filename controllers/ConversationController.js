import asyncHandler from '../middleware/asyncHandler';
import { client } from '../config/twilio';

/**
 * @desc   Create conversation
 * @route  POST /api/v1/conversations/:botId
 * @access Private
 */
export const createConversation = asyncHandler(async (req, res, next) => {
    let conversation = await client.conversations.conversations.create({friendlyName:req.params.botId})
    let data = {
        conversationId: conversation.sid,
        friendlyName: conversation.friendlyName,
        chatServiceSid: conversation.chatServiceSid,
        dateCreated: conversation.dateCreated,
        dateUpdated: conversation.dateUpdated,  
    }

    res.status(201).send({
        data,
        success: true,
        status: 201,
        message: "Created conversation Successfully"
    })
});

/**
 * @desc   Get a conversation
 * @route  GET /api/v1/conversations/:conversationId
 * @access Private
*/
export const getSingleConversation = asyncHandler(async (req, res, next) => {
    let conversation = await client.conversations.conversations(req.params.conversationId).fetch();

    let data = {
        conversationId: conversation.sid,
        friendlyName: conversation.friendlyName,
        chatServiceSid: conversation.chatServiceSid,
        dateCreated: conversation.dateCreated,
        dateUpdated: conversation.dateUpdated,
    }

    res.status(200).send({
        data,
        success: true,
        status: 200,
        message: "Fetched conversation Successfully"
    })
});

/**
 * @desc   Get all conversations
 * @route  GET /api/v1/conversations
 * @access Private
 */
export const getAllConversations = asyncHandler(async (req, res, next) => {
    let conversations = await client.conversations.conversations.list();

    if (conversations.length) {
        conversations = conversations.map(conversation => ({
            conversationId: conversation.sid,
            friendlyName: conversation.friendlyName,
            chatServiceSid: conversation.chatServiceSid,
            dateCreated: conversation.dateCreated,
            dateUpdated: conversation.dateUpdated,
        }))
    }
    res.status(200).send({
        data: conversations,
        success: true,
        status: 200,
        message: "Conversations Retrieved Successfully"
    });
});

/**
 * @desc   Update a conversation
 * @route  PATCH /api/v1/conversations/:conversationId
 * @access Private
 */
export const updateConversation = asyncHandler(async (req, res, next) => {
    const { friendlyName } = req.body;
    let updatedconversation = await client.conversations.conversations(req.params.conversationId).update({ friendlyName });
    let data = {
        conversationId: updatedconversation.sid,
        friendlyName: updatedconversation.friendlyName,
        chatServiceSid: updatedconversation.chatServiceSid,
        dateCreated: updatedconversation.dateCreated,
        dateUpdated: updatedconversation.dateUpdated,
    }

    res.status(200).send({
        data,
        success: true,
        status: 200,
        message: "Updated Conversation Successfully"
    })
});

/**
 * @desc   Remove an conversation
 * @route  DELETE /api/v1/conversations/:conversationId
 * @access Private
 */
export const removeConversation = asyncHandler(async (req, res, next) => {
    await client.conversations.conversations(req.params.conversationId).remove();
    res.status(200).send({
        success: true,
        status: 200,
        message: "Removed Conversation Successfully"
    })
});



