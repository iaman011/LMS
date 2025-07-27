import crypto from 'crypto';
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import User from '../models/user.model.js';
import sendEmail from '../utils/sendEmail.js';
import AppError from '../utils/appError.js';


// User → This is a Mongoose model representing your MongoDB collection (probably users collection in your database).

const cookieOptions = {
    secure: true,
    maxAge: 7*24*60*60*1000, //7days
    httpOnly: true
}

const register = async (req,res,next) => {
    const {fullName, email, password, role} = req.body;

    if (!fullName || !email || !password){
        return next(new AppError('All fields are required', 400));
    }

    const UserExists = await User.findOne({email});

    if (UserExists){
        return next(new AppError('Email already exists', 400));

    }

    // if user not exist create the new user
    const user = await User.create({
        fullName,
        email,
        password,
        role: role || 'USER', // role is ADMIN or USER, Default role is USER
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        }
        
    });

    if (!user) {
        return next(new AppError('User registeration failed, please try again', 400 ));
    }

    // TODO: upload user picture
    // console.log('File details >',JSON.stringify(req.file));
     // Run only if user sends a file
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'LMS', // Save files in a folder named lms
        width: 250,
        height: 250,
        gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: 'fill',
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // After successful upload remove the file from local storage
        // fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(
        new AppError(error || 'File not uploaded, please try again', 400)
      );
    }
  }


    await user.save();  //save it in the database

    user.password = undefined;

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user
    })
}

const login = async (req,res, next) => {
    const { email, password} =req.body;

      if (!email || !password){
        return next(new AppError('All fields are required', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if(!user || ! user.comparePassword(password)){
        return next(new AppError('Email or password do not match', 400))
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    res.status(201).json({
        success: true,
        message: 'user registered successfully',
        user
    });
}

const logout = (req,res) => {
    res.cookie('token', null, {
        secure: true,
        maxAge: 0,
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    });
}

const getProfile = (req,res) => {
    const user = User.findById(req.user.id);

    res.status(200).json({
        success: true,
        message: 'user details',
        user
    });
}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError('Email is required', 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('Email is not registered', 400));
  }

  // Generate reset token and save user
  const resetToken = await user.generatePasswordResetToken();
  await user.save();

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  console.log(" Reset Password URL:", resetPasswordUrl);
  const subject = 'Reset Password';
  const message = `
    You can reset your password by clicking <a href="${resetPasswordUrl}" target="_blank">Reset your password</a>.<br/>
    If the above link doesn't work, copy and paste this link into a new tab:<br/>
    ${resetPasswordUrl}<br/><br/>
    If you did not request a password reset, please ignore this email.
  `;

  try {
    await sendEmail(email, subject, message);
    res.status(200).json({
      success: true,
      message: `Reset password token has been sent to ${email} successfully!`,
    });
  } catch (error) {
    // Clear reset token and expiry if sending fails
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    return next(new AppError(error.message, 500));
  }
};

const resetPassword = async (req,res,next) => {
    const {resetToken} = req.params;
    const{password} = req.body;

    // our data is encrypted in tha database as we use crypto for it so using the same for disable the encrytion
    const forgotPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: {$gt: Date.now()}

    });

    if (!user){
         return next(new AppError('Token is invalid or expired, Please try again', 400)); 
    }
// if user/token is valid
    user.password = password; //storing the new changed password in user password
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save(); //saving the new changed password in the database as it is automatically encrypted before saving in the database as we using pre hook in crypto

    res.status(200).json({
        success: true,
        message: 'Password changed successfully'
    })

}

const changePassword = async function(req, res, next) {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError('All fields are mandatory', 400)); 
  }

  // Find the user by their ID from the database, and also fetch the password field, even though it is hidden by default.
  const user = await User.findById(id).select('+password');

  if (!user) {
    return next(new AppError('User does not exist', 400)); 
  }

  const isPasswordValid = await user.comparePassword(oldPassword);

  if (!isPasswordValid) {
    return next(new AppError('Invalid old password', 400)); 
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Password changed successfully!"
  });
};

const updateUser = async function (req,res,next) {
    const {fullName} = req.body;
    const {id} = req.user;

    // checking user is exist or not
    const user = await User.findById(id);
    
    if(!user){
      return next(new AppError('User does not exist', 400));
    }

if (fullName) {
    user.fullName = fullName;
  }

  // Run only if user sends a file
  if (req.file) {
    // Deletes the old image uploaded by the user
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms', // Save files in a folder named lms
        width: 250,
        height: 250,
        gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: 'fill',
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(
        new AppError(error || 'File not uploaded, please try again', 400)
      );
    }
  }

  // Save the user object
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User details updated successfully',
  });
};



export { register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser };
