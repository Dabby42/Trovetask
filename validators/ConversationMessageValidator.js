import { checkSchema } from 'express-validator';
import validate from '../utils/validate';

export const createConversationMessageValidator = validate(
    checkSchema({
        author: {
            in: ['body'],
            isString: {
                errorMessage: 'author must be a string',
            },
        },
        body: {
            in: ['body'],
            isString: {
                errorMessage: 'body must be a string',
            },
        },
    })
);

export const updateConversationMessageValidator = validate(
    checkSchema({
        author: {
            in: ['body'],
            isString: {
                errorMessage: 'author must be a string',
            },
            optional: {
                options: { nullable: true },
            },
        },
        body: {
            in: ['body'],
            isString: {
                errorMessage: 'body must be a string',
            },
            optional: {
                options: { nullable: true },
            },
        }
    })
);