// This slice is going to maintain all the relevent information that we need
// in order to integrate to redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosinstance";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
   subscription: {
    status: null,
    id: null,
  },
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

// function to get the api key
export const getRazorPayId = createAsyncThunk("/razorPayId/get", async () => {
//   try {
    const res = await axiosInstance.get("/payments/razorpay-key");
    return res.data;
//   } catch (error) {
    // toast.error("Failed to load data");
//   }
});

// function to purchase the course bundle
// purchaseCourseBundle is going to set up the new subscriptionId for our new upcoming subscription 
export const purchaseCourseBundle = createAsyncThunk(
  "/purchasecourse",
  async () => {
    try {
      const res = await axiosInstance.post("/payments/subscribe");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to verify the user payment
export const verifyUserPayment = createAsyncThunk(
  "/payments/verify",
  async (data) => {
    // try {
      const res = await axiosInstance.post("/payments/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      return res.data;
    // } catch (error) {
    //   toast.error("error?.response?.data?.message");
    // }
  }
);

// function to get all the payment record
export const getPaymentRecord = createAsyncThunk("/payment/record", async () => {
//   try {
    const res = axiosInstance.get("/payments?count=100"); //queryparam
    toast.promise(res, {
      loading: "Getting the payments record...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to get payment records",
    });

    const response = await res;
    return response.data;
//   } catch (error) {
    // toast.error("Operation failed");
//   }
});

// function to cancel the course bundle subscription
export const cancelCourseBundle = createAsyncThunk(
  "/payment/cancel",
  async () => {
    try {
      const res = axiosInstance.post("/payments/unsubscribe");
      toast.promise(res, {
        loading: "Unsubscribing the bundle...",
        success: "Bundle unsubscibed successfully",
        error: "Failed to unsubscibe the bundle",
      });
      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.rejected, () => {
        toast.error("Failed to get razor pay id");
      })
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
        state.subscription = action.payload.subscription;
  
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        toast.error(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  },
});

// export const {} = razorpaySlice.actions;
export default razorpaySlice.reducer;
