import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  refId: {
    type: String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  messageId: {
    type: String
  },
  userId: { 
    type: String 
  },
  channel: {
    type: String
  },
  interaction: {
    type: String,
  },
  botId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bot'
  },
  direction: {
    type: String,
  },
  message: {
    type: String,
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

export default mongoose.model('Report', ReportSchema);
