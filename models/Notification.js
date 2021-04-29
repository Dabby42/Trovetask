import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,   //to ne used to get firstname, lastname, account sid
    ref: 'User',
    required: true
  },
  notificationId: {
    type: String,
  },
  refId: {
    type: String,
  },
  status: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to:{
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['sms', 'email', 'whatsapp'],
  },
  deleiveryTimestamp: {
    type: Date
  },
  error: {
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


export default mongoose.model('Notification', NotificationSchema);
