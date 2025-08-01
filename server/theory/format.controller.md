import AppError from "../utils/appError";

export const getRazorpayApiKey = async (req,res,next) => {
    try{

    } catch(e){
        return next(new AppError(e.message,500))
    }
};

<!-- controller bnane ke liye -->
sabse pehle jo bhi need hai usse defined krenge req.body, req.user etc se 

phir unn sabhi cheeezo neeche use krenge aur unka kaam assign krenge

agar directly tum kisi variable ka kaam assign kr doge toh wo error dega value is not defined so first define the variable