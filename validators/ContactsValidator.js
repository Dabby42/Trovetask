import { checkSchema } from 'express-validator';
import validate from '../utils/validate';
import Contact from '../models/Contact';

export const createContactValidator = validate(
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
      trim: true,
      optional: {
        options: {
          nullable: true
        }
      }
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
      trim: true,
      optional: {
        options: {
          nullable: true
        }
      }
    },
    email: {
      in: ['body'],
      isEmail: {
        errorMessage: 'Input a valid email',
      },
      trim: true,
      optional: {
        options: {
          nullable: true
        }
      },
      custom: {
        options: async (value, { req }) => {
          const { phoneNumber } = req.body;
          const { _id } = req.user;
          const contact = await Contact.find({
            $or : [
              { email: value, user: _id }, { phoneNumber, user: _id }
            ]
          });
          if(contact.length){
            throw new Error('contact email or phone number already exist');
          }
        }
      }
    },
    phoneNumber: {
      in: ['body'],
      isMobilePhone: {
        errorMessage: 'phoneNumber must be a valid phone number',
      },
      optional: {
        options: {
          nullable: true
        }
      },
      custom: {
        options: async (value, { req }) => {
          const { email } = req.body;
          const { _id } = req.user;
          const contact = await Contact.find({ 
            $or : [
              { phoneNumber: value, user: _id }, { email, user: _id }
            ]
          });
          if(contact.length){
            throw new Error('contact email or phone number already exist');
          }
        }
      }
    },
  })
);

export const updateContactValidator = validate(
  checkSchema({
    contactId: {
      in: ['params'],
      custom: {
        options: async (value) => {
          const contact = await Contact.findById(value);
          if(!contact){
            throw new Error('Contact does not exist')
          }
        }
      }
    },
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
      trim: true,
      optional: {
        options: {
          nullable: true
        }
      }
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
      trim: true,
      optional: {
        options: {
          nullable: true
        }
      }
    },
    email: {
      in: ['body'],
      isEmail: {
        errorMessage: 'Input a valid email',
      },
      trim: true,
      optional: {
        options: {
          nullable: true
        }
      },
      custom: {
        options: async (value, { req }) => {
          const { phoneNumber } = req.body;
          const { _id } = req.user;
          const { contactId } = req.params;
          const contact = await Contact.find({
            $or : [
              { email: value, user: _id, _id: { $ne: contactId } }, 
              { phoneNumber, user: _id, _id: { $ne: contactId } },
            ]
          });
          if(contact.length){
            throw new Error('contact email or phone number already exist');
          }
        }
      }
    },
    phoneNumber: {
      in: ['body'],
      isMobilePhone: {
        errorMessage: 'phoneNumber must be a valid phone number',
      },
      optional: {
        options: {
          nullable: true
        }
      },
      custom: {
        options: async (value, { req }) => {
          const { email } = req.body;
          const { _id } = req.user;
          const { contactId } = req.params;
          const contact = await Contact.find({
            $or : [
              { email: value, user: _id, _id: { $ne: contactId } }, 
              { phoneNumber, user: _id, _id: { $ne: contactId } },
            ]
          });
          if(contact.length){
            throw new Error('contact email or phone number already exist');
          }
        }
      }
    },
  })
);

export const isContactExistValidator = validate(
  checkSchema({
    contactId: {
      in: ['params'],
      custom: {
        options: async (value) => {
          const contact = await Contact.findById(value);

          if(!contact){
            throw new Error('Contact does not exist')
          }
        }
      }
    },
  })
);
