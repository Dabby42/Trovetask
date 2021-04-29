import mongoose from 'mongoose';

const ContactGroupSchema = new mongoose.Schema({
  name: {
    type: String
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  meta: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('ContactGroup', ContactGroupSchema);
