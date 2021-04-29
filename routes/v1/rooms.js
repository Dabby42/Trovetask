import express from 'express';
import {createRoom, getSingleRoom, getAllRooms, updateRoom} from '../../controllers/RoomController';
import { protect } from '../../middleware/verifyToken';
import { createRoomValidator, getAllRoomsValidator} from '../../validators/RoomValidator';

const router = express.Router();

router.post('/', protect, createRoomValidator ,createRoom);
router.get('/:roomId', protect, getSingleRoom);
router.get('/', protect, getAllRoomsValidator, getAllRooms);
router.patch('/:roomId', protect, updateRoom);

export default router;
