import asyncHandler from '../middleware/asyncHandler';
import { client } from '../config/twilio';

/**
 * @desc   Create a conversation participant
 * @route  POST /api/v1/conversations/:conversationId/participants/:channel
 * @access Private
 */
export const createConversationParticipant = asyncHandler(async (req, res, next) => {
    let participant, identity;
    const { channel } = req.params;
    switch (channel) {
        case 'whatsapp':
            identity = req.body['messagingBinding.address'];
            participant = await client.conversations.conversations(req.params.conversationId).participants.create({
                'messagingBinding.address': `whatsapp:${identity}`
            });
            break;
        case 'chat':
            identity = req.body.identity;
            participant = await client.conversations.conversations(req.params.conversationId).participants.create({ identity });
            break;
        default:
            break;
    }

    let data = {
        participantId: participant.sid,
        roleId: participant.roleSid,
        identity: participant.identity,
        dateCreated: participant.dateCreated,
        dateUpdated: participant.dateUpdated,
    }

    res.status(201).send({
        data,
        success: true,
        status: 201,
        message: "Created Conversation Participant Successfully"
    })
});

/**
 * @desc   Create a conversation participant
 * @route  POST /api/v1/conversations/:conversationId/participants/chat
 * @access Private
 */
export const createConversationParticipant = asyncHandler(async (req, res, next) => {
    const identity = req.body.identity;
    let participant = await client.conversations.conversations(req.params.conversationId).participants.create({identity});
    let data = {
        participantId: participant.sid,
        roleId: participant.roleSid,
        identity: participant.identity,
        dateCreated: participant.dateCreated,
        dateUpdated: participant.dateUpdated,
    }

    res.status(201).send({
        data,
        success: true,
        status: 201,
        message: "Created Conversation Participant Successfully"
    })
});

/**
 * @desc   Get Conversation Participant
 * @route  GET /api/v1/conversations/:conversationId/participants/:participantId
 * @access Private
 */
export const getSingleConversationParticipant = asyncHandler(async (req, res, next) => {
    let participant = await client.conversations.conversations(req.params.conversationId).participants(req.params.participantId).fetch();

    let data = {
        participantId: participant.sid,
        roleId: participant.roleSid,
        identity: participant.identity,
        dateCreated: participant.dateCreated,
        dateUpdated: participant.dateUpdated, 
    }
    
    res.status(200).send({
        data,
        success: true,
        status: 200,
        message: "Conversation Participant Retrieved Successfully"
    });
});

/**
 * @desc   Get Conversation Participants
 * @route  GET /api/v1/conversations/:conversationId/participants
 * @access Private
 */
export const getConversationParticipants = asyncHandler(async (req, res, next) => {
    let participants = await client.conversations.conversations(req.params.conversationId).participants.list();

    if (participants.length) {
        participants = participants.map(participant => ({
            participantId: participant.sid,
            roleId: participant.roleSid,
            identity: participant.identity,
            dateCreated: participant.dateCreated,
            dateUpdated: participant.dateUpdated,
        }))
    }
    res.status(200).send({
        data: participants,
        success: true,
        status: 200,
        message: "Conversation Participants Retrieved Successfully"
    });
});

/**
 * @desc   Update Conversation Participant 
 * @route  PATCH /api/v1/conversations/:conversationId/participants/:participantId
 * @access Private
 */
export const updateConversationParticipants = asyncHandler(async (req, res, next) => {
    const { attributes: {role}} = req.body;
    let updatedParticipant = await client.conversations.conversations(req.params.conversationId).participants(req.params.participantId).update({
        attributes: JSON.stringify({ role })
    });
    let data = {
        participantId: updatedParticipant.sid,
        roleId: updatedParticipant.roleSid,
        identity: updatedParticipant.identity,
        dateCreated: updatedParticipant.dateCreated,
        dateUpdated: updatedParticipant.dateUpdated,
    }

    res.status(200).send({
        data,
        success: true,
        status: 200,
        message: "Updated Conversation Participant Successfully"
    })
});

/**
 * @desc   Remove Conversation Participant
 * @route  DELETE /api/v1/conversations/:conversationId/participants/:participantId
 * @access Private
 */
export const removeConversationParticipant = asyncHandler(async (req, res, next) => {
    await client.conversations.conversations(req.params.conversationId).participants(req.params.participantId).remove();
    res.status(200).send({
        success: true,
        status: 200,
        message: "Removed Conversation Participant Successfully"
    })
});