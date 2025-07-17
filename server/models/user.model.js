import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Name is required'],
    minLength: [1, 'Name must be at least 1 character'],
    maxLength: [50, 'Name should be less than 50 characters'],
    lowercase: true,
    trim: true  //// Removes unnecessary spaces
  },
  email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill in a valid email address',
      ], // Matches email against regex
      trim: true
    },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: [5, 'Password must be at least 5 characters'],
    // maxLength: [50, 'Password should be less than 50 characters'],
    select: false  //// Will not select password upon looking up a document
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

// Hashes password before saving to the database
userSchema.pre('save', async function (next) {

  // If password is not modified then do not hash it
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance methods
userSchema.methods = {
  // method which will help us compare plain password with hashed password and returns true or false
  comparePassword: async function (plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  },

    // Will generate a JWT token with user id as payload
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
  },
  
     // This will generate a token for password reset
     generatePasswordResetToken: async function () {
       // creating a random token using node's built-in crypto module
       const resetToken = crypto.randomBytes(20).toString('hex');
   
       // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
       this.forgotPasswordToken = crypto
         .createHash('sha256')
         .update(resetToken)
         .digest('hex');
   
       // Adding forgot password expiry to 15 minutes
       this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
   
       return resetToken;
     },
};

const User = model('User', userSchema);

export default User;
