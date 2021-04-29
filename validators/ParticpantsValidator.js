import { checkSchema } from 'express-validator';
import validate from '../utils/validate';

export const createParticipantValidator = validate(
    checkSchema({
        channel: {
            in: ['params'],
            isString: {
                errorMessage: 'channel must be a string',
            },
            isIn: {
                options: [['whatsapp', 'chat']],
                errorMessage: 'participant channel type should be either whatsapp or chat'
            }
        }
    })
);

export const updateParticipantValidator = validate(
    checkSchema({
        attributes: {
            in: ['body'],
            custom: {
                options: async (value) => {
                    let attributesArr = ['role'];
                    var keys = Object.keys(value);
                    for (var i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        if (!attributesArr.includes(key)) {
                            throw new Error("Invalid attribute key")
                        };
                        if ( typeof(value[key]) !== 'string') {
                            throw new Error("role must be a string.");
                        }
                    }
                }
            }
        },
    })
);