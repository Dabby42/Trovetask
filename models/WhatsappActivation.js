import mongoose from 'mongoose';

const WhatsappActivationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,   //to ne used to get firstname, lastname, account sid
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['new', 'in-review', 'approved', 'rejected'],
    default: 'new'
  },
  companyName: {
    type: String,
    require: true
  },
  companyWebsite: {
    type: String,
    require: true
  },
  companyHQCountry: {
    type: String,
    require: true
  },
  facebookBusinessManagerId: {
    type: String,
    require: true
  },
  companyVerticals: {
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


export default mongoose.model('WhatsappActivation', WhatsappActivationSchema);
