import { checkSchema } from 'express-validator';
import validate from '../utils/validate';
import User from '../models/User';

export const createAgentValidator = validate(
  checkSchema({
    firstName: {
      in: ['body'],
      isString: {
        errorMessage: 'firstname must be a string',
      },
      isLength: {
        options: {
          min: 2
        },
        errorMessage: 'firstname must have minimum of two characters'
      },
      trim: true
    },
    lastName: {
      in: ['body'],
      isString: {
        errorMessage: 'lastName must be a string',
      },
      isLength: {
        options: {
          min: 2
        },
        errorMessage: 'lastName must have minimum of two characters'
      },
      trim: true
    },
    email: {
      in: ['body'],
      isEmail: {
        errorMessage: 'Input a valid email',
      },
      trim: true,
      custom: {
        options: async (value) => {
          const user = await User.findOne({ email: value });
          if(user){
            throw new Error('email already exist');
          }
        }
      }
    },
    country: {
      in: ['body'],
      isString: {
        errorMessage: 'country must be a string',
      },
      isLength: {
        options: {
          min: 2
        },
        errorMessage: 'ciuntry must have minimum of two characters'
      },
      trim: true
    },
  })
);
