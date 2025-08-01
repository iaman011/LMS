import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import Payment from "../models/payment.model.js";
import crypto from 'crypto';
import { razorpay } from '../server.js';


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
             return next(new AppError('Unauthorized, please login',500))
        }

        if (user.role === 'ADMIN'){
            return next(new AppError("Admin cannot purchase a subscrition", 400))
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1
        })

        // if we successfully create the subscription, then thinges we are needed
        // update user model with subscription
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Subscribed Successfully',
        })

    } catch(e){
        return next(new AppError(e.message,500))
    }
};

export const verifySubscription = async (req,res,next) => {
      try{
        const {id} = req.user;
        const user = await User.findById(id);

        if(!user) {
             return next(new AppError('Unauthorized, please login',500))
        }

        const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${razorpay_subscription_id}`);

        if (generatedSignature !== razorpay_signature){
             return next(new AppError('Payment not verified, please try again',500))
        }

        // Record payment details in Payment collection

        await Payment.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id
        });

        // Update user record with subscription status

        user.subscription.status ='active';
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully!'
        }); 


    } catch(e){
        return next(new AppError(e.message,500))
    }
};

export const cancelSubscription = async (req,res,next) => {
      try{

              const {id} = req.user;
        const user = await User.findById(id);

        if(!user) {
             return next(new AppError('Unauthorized, please login',500))
        }

         if(user.role === 'ADMIN') {
             return next(new AppError('Admin cannot cancel the subscription',403))
        } 
        
        const subscriptionId = user.subscription.id;

        const subscription = await razorpay.subscriptions.cancel(
            subscriptionId
        );

        user.subscription.status = subscription.status;

        await user.save();
        res.status(200).json({
            success: true,
            message: 'Subscription Cancelled',
        })



    } catch(e){
        return next(new AppError(e.message,500))
    }
};

export const allPayments = asyncHandler(async (req, res, _next) => {
  const { count, skip } = req.query;

  // Find all subscriptions from razorpay
  const allPayments = await razorpay.subscriptions.all({
    count: count ? count : 10, // If count is sent then use that else default to 10
    skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
  });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const finalMonths = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  const monthlyWisePayments = allPayments.items.map((payment) => {
    // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
    const monthsInNumbers = new Date(payment.start_at * 1000);

    return monthNames[monthsInNumbers.getMonth()];
  });

  monthlyWisePayments.map((month) => {
    Object.keys(finalMonths).forEach((objMonth) => {
      if (month === objMonth) {
        finalMonths[month] += 1;
      }
    });
  });

  const monthlySalesRecord = [];

  Object.keys(finalMonths).forEach((monthName) => {
    monthlySalesRecord.push(finalMonths[monthName]);
  });

  res.status(200).json({
    success: true,
    message: 'All payments',
    allPayments,
    finalMonths,
    monthlySalesRecord,
  });
});
