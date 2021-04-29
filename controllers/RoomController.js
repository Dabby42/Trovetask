import asyncHandler from '../middleware/asyncHandler';
import { client } from '../config/twilio';

/**
 * @desc   Create a room
 * @route  POST /api/v1/rooms
 * @access Private
 */
export const createRoom = asyncHandler(async (req, res, next) => {
    const {type, callback, uniqueName } = req.body;
    let room = await client.video.rooms.create({ uniqueName, type, statusCallback: callback });

    let data = {
        roomId: room.sid,
        unqueName: room.uniqueName,
        status: room.status,
        type: room.type,
        maxParticipants: room.maxParticipants,
        callback: room.statusCallback,
        dateCreated: room.dateCreated,
        dateUpdated: room.dateUpdated,
    }

    res.status(201).send({
        data,
        success: true,
        status: 201,
        message: "Created room successfully"
    })
});

/**
 * @desc   Get a room
 * @route  GET /api/v1/rooms/:roomId
 * @access Private
*/
export const getSingleRoom = asyncHandler(async (req, res, next) => {
    const {roomId } = req.params;
    let room = await client.video.rooms(roomId).fetch();
    
    let data = {
        roomId: room.sid,
        unqueName: room.uniqueName,
        status: room.status,
        type: room.type,
        maxParticipants: room.maxParticipants,
        callback: room.statusCallback,
        dateCreated: room.dateCreated,
        dateUpdated: room.dateUpdated,
    }

    res.status(200).send({
        data,
        success: true,
        status: 200,
        message: "Fetched room successfully"
    })
});

/**
 * @desc   Get all rooms
 * @route  GET /api/v1/rooms
 * @access Private
 */
export const getAllRooms = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    let rooms = await client.video.rooms.list({status});
    
    if (rooms.length) {
        rooms = rooms.map(room => ({
            roomId: room.sid,
            unqueName: room.uniqueName,
            status: room.status,
            type: room.type,
            maxParticipants: room.maxParticipants,
            callback: room.statusCallback,
            dateCreated: room.dateCreated,
            dateUpdated: room.dateUpdated,
        }))
    }
    res.status(200).send({
        data: rooms,
        success: true,
        status: 200,
        message: "Rooms retrieved successfully"
    });
});

/**
 * @desc   Update a room
 * @route  PATCH /api/v1/rooms/:roomId
 * @access Private
 */
export const updateRoom = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    const { roomId } = req.params;
    let updatedRoom = await client.video.rooms(roomId).update({status})
    let data = {
        roomId: updatedRoom.sid,
        unqueName: updatedRoom.uniqueName,
        status: updatedRoom.status,
        type: updatedRoom.type,
        maxParticipants: updatedRoom.maxParticipants,
        callback: updatedRoom.statusCallback,
        dateCreated: updatedRoom.dateCreated,
        dateUpdated: updatedRoom.dateUpdated,
    }

    res.status(200).send({
        data,
        success: true,
        status: 200,
        message: "Updated room successfully"
    })
});




