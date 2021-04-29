import { checkSchema } from 'express-validator';
import validate from '../utils/validate';
import ContactGroup from '../models/ContactGroup';

export const createContactGroupValidator = validate(
  checkSchema({
    name: {
      in: ['body'],
      isString: {
        errorMessage: 'Name must be a string',
      },
      isLength: {
        options: {
          min: 2
        },
        errorMessage: 'Name must have minimum of two characters'
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const { _id } = req.user;
          const contactGroups = await ContactGroup.find({ name: value, user: _id });
          if(contactGroups.length){
            throw new Error('contact group name already exist');
          }
        }
      }
    },
    contacts: {
      in: ['body'],
      isArray: {
        errorMessage: 'contacts must be an array with minimum of an item',
        options: {
          min: 1
        }
      },
      optional: {
        options: {
          nullable: true
        }
      }
    },
  })
);

export const updateContactGroupValidator = validate(
  checkSchema({
    contactGroupId: {
      in: ['params'],
      custom: {
        options: async (value) => {
          const contactGroup = await ContactGroup.findById(value);

          if(!contactGroup){
            throw new Error('Contact group does not exist')
          }
        }
      }
    },
    name: {
      in: ['body'],
      isString: {
        errorMessage: 'Name must be a string',
      },
      isLength: {
        options: {
          min: 2
        },
        errorMessage: 'Name must have minimum of two characters'
      },
      trim: true,
      optional: {
        options: {
          nullable: true
        }
      },
      custom: {
        options: async (value, { req }) => {
          const { _id } = req.user;
          const { contactGroupId } = req.params;
          const contactGroups = await ContactGroup.find({
            $or: [
              { name: value, user: _id, _id: { $ne: contactGroupId } },
            ]
          });
          if(contactGroups.length){
            throw new Error('contact group name already exist');
          }
        }
      }
    },
    contacts: {
      in: ['body'],
      isArray: {
        errorMessage: 'contacts must be an array',
        options: {
          min: 1
        }
      },
      optional: {
        options: {
          nullable: true
        }
      }
    },
  })
);

export const isContactGroupExistValidator = validate(
  checkSchema({
    contactGroupId: {
      in: ['params'],
      custom: {
        options: async (value) => {
          const contactGroup = await ContactGroup.findById(value);

          if(!contactGroup){
            throw new Error('Contact group does not exist')
          }
        }
      }
    },
  })
);
