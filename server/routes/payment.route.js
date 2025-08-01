import {Router} from 'express'
import { allPayments, buySubscription, cancelSubscription, getRazorpayApiKey, verifySubscription } from '../controllers/payment.controller.js';
import isLoggedIn, { authorizedRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router
    .route('/razorpay-key')
    .get(
        isLoggedIn,
        getRazorpayApiKey
    );

router
    .route('/subscribe')
    .get(
        isLoggedIn,
        buySubscription
    );

router  
    .route('/verify')
    .post(
        isLoggedIn,
        verifySubscription
    );

router  
    .route('/unsubscribe')
    .post(
        isLoggedIn,
        cancelSubscription
    );

router  
    .route('/')
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        allPayments
    );

export default router;