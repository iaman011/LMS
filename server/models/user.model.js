import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Name is required'],
    minLength: [1, 'Name must be at least 1 character'],
    maxLength: [50, 'Name should be less than 50 characters'],
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [5, 'Password must be at least 5 characters'],
    // maxLength: [50, 'Password should be less than 50 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  avatar: {
    public_id: { type: String },
    secure_url: { type: String }
  },
  forgotPasswordTokens: String,
  forgotPasswordExpiry: Date

}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance methods
userSchema.methods = {
  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },

  generateJWTToken: function () {
    return jwt.sign(
      {
        id: this._id,
        role: this.role,
        email: this.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY
      }
    );
  }
};

const User = model('User', userSchema);

export default User;
