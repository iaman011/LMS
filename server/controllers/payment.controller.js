import User from "../models/user.model";
import AppError from "../utils/appError";

export const getRazorpayApiKey = async (req,res,next) => {
    try{
        res.status(200).json({
            success: true,
            message: 'Razorpay API Key',
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch(e){
        return next(new AppError(e.message,500))
    }
};

export const buySubscription = async (req,res,next) => {
      try{
        // checking user exist or not
        const {id} = req.user;
        const user = await User.findById(id);

        if(!user) {
             return next(new AppError('Unauthorized, please login',400))
        }

        if (user.role === 'ADMIN'){
            return next(new AppError("Admin cannot purchase a subscrition", 400))
        }
    } catch(e){
        return next(new AppError(e.message,500))
    }
};

export const verifySubscription = async (req,res,next) => {
      try{

    } catch(e){
        return next(new AppError(e.message,500))
    }
};

export const cancelSubscription = async (req,res,next) => {
      try{

    } catch(e){
        return next(new AppError(e.message,500))
    }
};

export const getAllPayment = async (req,res,next) => {
      try{

    } catch(e){
        return next(new AppError(e.message,500))
    }
};