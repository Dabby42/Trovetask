import { checkSchema } from 'express-validator';
import validate from '../utils/validate';
import User from '../models/User';

export const loginValidator = validate(
  checkSchema({
    email: {
        in: ['body'],
        isString: {
            errorMessage: 'email must be a string',
        },
        isEmail: {
            errorMessage: 'email is not valid',
        },
        trim: true
    },
    password: {
        in: ['body'],
        trim: true,
        isString: {
            errorMessage: 'password must be a string',
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'password should be at least 8 chars long',            
        },
        // matches: {
        //     options: [/\d/],
        //     errorMessage: 'password must contain a number'
        // }
    }
    })
);

export const registerValidator = validate(
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
    password: {
      in: ['body'],
      isString: {
        errorMessage: 'password must be a string',
      },
      isLength: {
        options: {
          min: 8
        },
        errorMessage: 'password must have minimum of eight characters'
      },
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

export const resetPasswordValidator = validate(
  checkSchema({
    newPassword: {
        in: ['body'],
        trim: true,
        isString: {
            errorMessage: 'password must be a string',
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'password should be at least 8 chars long',            
        },
        matches: {
            options: [/\d/],
            errorMessage: 'password must contain a number'
        }
    },
    resetPasswordToken: {
      in: ['body'],
      isString: {
          errorMessage: 'reset password token must be a string',
      },
    }
  })
);

export const forgotPasswordValidator = validate(
  checkSchema({
    email: {
      in: ['body'],
      isEmail: {
        errorMessage: 'Input a valid email',
      },
      trim: true,
    }
  })
);
