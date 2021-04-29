import mongoose from 'mongoose';

const FlowSchema = new mongoose.Schema({
  flowId: {
    type: String,
    required: true,
    unique: true
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bot',
    required: true
  },
  status: {
    type: String,
    require: true
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


export default mongoose.model('Flow', FlowSchema);
