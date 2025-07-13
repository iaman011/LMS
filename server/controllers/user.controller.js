const User = require("../models/user.model");
const { default: AppError } = require("../utils/appError");

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
        password
        
    })
}

const login = () => {

}

const logout = () => {

}

const getProfile = () => {

}

module.exports = {
    register,
    login,
    logout,
    getProfile
}