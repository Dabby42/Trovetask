import mongoose from 'mongoose';
import bcrpyt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a firstname'],
  },
  lastName: {
    type: String,
    required: [true, 'Please add a lastname'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'agent'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: {
    data: String,
    default: ''
  },
  resetPasswordExpire: Date,
  accountId: { type: String },
  accountToken: { type: String },
  mainAccount: { 
    type:  mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

//Encrpyt password using bcrypt middleware
UserSchema.pre('save', async function (next) {
  const salt = await bcrpyt.genSalt(10);
  this.password = await bcrpyt.hash(this.password, salt);
  next();
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY_PERIOD,
  });
};

//We are comparing entered password with hashed password of the user in db
UserSchema.methods.matchedPassword = function (enteredPassword) {
  return bcrpyt.compare(this.password, enteredPassword);
};

//seiving out only user data to be made public
UserSchema.methods.response = function () {
  const userData = {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    country: this.country,
    role: this.role,
    createdAt: this.createdAt
  }
  return userData;
}

export default mongoose.model('User', UserSchema);
