import AppError from "../utils/appError";

export const getRazorpayApiKey = async (req,res,next) => {
    try{

    } catch(e){
        return next(new AppError(e.message,500))
    }
};