import { checkSchema } from 'express-validator';
import validate from '../utils/validate';

export const createRoomValidator = validate(
    checkSchema({
        type: {
            in: ['body'],
            isString: {
                errorMessage: 'type must be a string',
            },
        },
        callback: {
            in: ['body'],
            isString: {
                errorMessage: 'callback must be a string',
            },
        },
        uniqueName: {
            in: ['body'],
            isString: {
                errorMessage: 'uniqueName must be a string',
            },
        },
    })
);

export const getAllRoomsValidator = validate(
    checkSchema({
        status: {
            in: ['body'],
            isString: {
                errorMessage: 'status must be a string',
            },
        },
    })
);
