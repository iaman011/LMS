import {model,Schema} from 'mongoose';

const paymentSchema = new Schema({
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_subscription_id: {
        type: String,
        required: true
    },
    razorpay_signature:{  //it let us to know the status of payment either successfull or not
        type: String,
        required: true
    }
});

const Payment = model('Payment', paymentSchema);

export default Payment;