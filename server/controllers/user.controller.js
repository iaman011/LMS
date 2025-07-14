const User = require("../models/user.model");
const { default: AppError } = require("../utils/appError").default;

// User → This is a Mongoose model representing your MongoDB collection (probably users collection in your database).

const cookieOptions = {
    secure: true,
    maxAge: 7*24*60*60*1000, //7days
    httpOnly: true
}

const register = async (req,res) => {
    const {fullName, email, password} = req.body;

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
        avatar: {
            public_id: email,
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        }
        
    });

    if (!user) {
        return next(new AppError('User registeration failed, please try again', 400 ));
    }

    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        user
    })
}

const login = async (req,res) => {
    const { email, password} =req.body;

      if (!email || !password){
        return next(new AppError('All fields are required', 400));
    }

    const user = await User.findOne({
        email
    }).select('+password');

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
    })
}

const getProfile = (req,res) => {
    const user = User.findById(req.user.id);

    res.status(200).json({
        success: true,
        message: 'user details',
        user
    })
}

module.exports = {
    register,
    login,
    logout,
    getProfile
}