// on refresh the page, user dont get logout if he loggedin it fetch the value from local storage and let the user logged in instead of logout

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import axiosInstance from "../../config/axiosinstance.js"


const initialState = {
    courseList: []
}

// function to handle signup
export const getAllCourses = createAsyncThunk("/courses/getAllCourses", async (data) => {
  try {
    let res = axiosInstance.get("/courses", data);

    toast.promise(res, {
      loading: "Wait! fetching all courses",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to load courses",
    });

    // getting response resolved here
    res = await res;
    return res.data.courses; //fetch all the courses
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});



const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllCourses.fulfilled, (state, action) => {
        console.log(action.payload)
        if(action?.payload){
          state.courseList = [...action.payload]; //we are prepare a courseList page, we are download the courselist and print them one by one
        }
      })
    }
});

export default courseSlice.reducer;