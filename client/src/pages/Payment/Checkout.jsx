import React, { useEffect } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from '../../redux/slices/razorPaySlice';
import toast from 'react-hot-toast';
import { BiRupee } from "react-icons/bi";

const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    // const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified);

    // const userData = useSelector((state) => state?.auth?.data);

    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: "",
    }

    async function handleSubscription(e) {
        e.preventDefault();
        if(!razorpayKey || !subscription_id){
            toast.error("something went wrong");
            return;
        }

        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "codeXdev pvt ltd", 
            description: "Subscription",
            theme: {
                colors: '#F37254'
            },
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                toast.success("payment successfull");

                const res = await dispatch(verifyUserPayment(paymentDetails));
                res?.payload?.success ? navigate("/checkout/success") : navigate("checkout/fail");

            }
        };

        const paymentOptions = new window.Razorpay(options);
        paymentOptions.open();

    }

    async function load(){
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
    }

   useEffect(() => {
    load();
   }, [])



  return (
    <HomeLayout>
        <form
               onSubmit={handleSubscription}
               className="min-h-[90vh] flex items-center justify-center text-white"
             >
               {/* checkout card */}
               <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                 <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
                   Subscription Bundle
                 </h1>
       
                 <div className="px-4 space-y-5 text-center">
                   <p className="text-[17px]">
                     This purchase will allow you to access all the available courses
                     of our platform for{" "}
                     <span className="text-yellow-500 font-bold">1 Year Duration</span>
                     . <br />
                     All the existing and new launched courses will be available to you
                     in this subscription bundle
                   </p>
       
                   <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                     <BiRupee /> <span>499</span>only
                   </p>
       
                   <div className="text-gray-200">
                     <p>100% refund at cancellation</p>
                     <p>* Terms & Condition Applied</p>
                   </div>
                 </div>
       
                 <button
                   type="submit"
                   className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
                 >
                   Buy Now
                 </button>
               </div>
             </form>
    </HomeLayout>
    
  )
}

export default Checkout
