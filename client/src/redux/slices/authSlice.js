// on refresh the page, user dont get logout if he loggedin it fetch the value from local storage and let the user logged in instead of logout

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import axiosInstance from "../../config/axiosinstance.js"


const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {}
}

// function to handle signup
export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    let res = axiosInstance.post("user/register", data);

    toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// function to handle signin
export const login = createAsyncThunk("/auth/signin", async (data) => {
  try {
    let res = axiosInstance.post("user/login", data);

    toast.promise(res, {
      loading: "Wait! Authenticating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to authenticate your account",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(login.fulfilled,(state, action) => {
        console.log(action);
        localStorage.setItem("data", JSON.stringify(action?.payload?.data));
        localStorage.setItem("isLogggedIn", true);
        localStorage.setItem("role", action?.payload?.data?.user?.role);
        state.isLoggedIn = true;
        state.role = action?.payload?.data?.user?.role;
        state.data = action?.payload?.data?.user;
      })
    }
});

export default authSlice.reducer;