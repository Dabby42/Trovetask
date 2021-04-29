import { checkSchema } from 'express-validator';
import validate from '../utils/validate';

export const createConversationValidator = validate(
    checkSchema({
        friendlyName: {
            in: ['body'],
            isString: {
                errorMessage: 'friendly Name must be a string',
            },
        },
    })
);

export const updateConversationValidator = validate(
    checkSchema({
        friendlyName: {
            in: ['body'],
            isString: {
                errorMessage: 'friendly Name must be a string',
            },
            optional: {
                options: { nullable: true },
            },
        },
    })
);