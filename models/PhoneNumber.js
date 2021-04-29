import mongoose from 'mongoose';

const PhoneNumberSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumberId: {
    type: String,
    required: true,
    unique: true
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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


export default mongoose.model('PhoneNumber', PhoneNumberSchema);
