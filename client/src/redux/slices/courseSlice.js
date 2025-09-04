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
    let response = axiosInstance.get("/courses", data);

    toast.promise(response, {
      loading: "Wait! fetching all courses",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to load courses",
    });

    // getting response resolved here
    response = await response;
    return response.data.courses; //fetch all the courses
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});



// function to create a new course
export const createNewCourse = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail); // MUST be File

      // Debug formData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await axiosInstance.post("/courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Course created successfully");
      return res.data;
    } catch (error) {
      console.log("Upload error:", error.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Failed to create course");
      throw error;
    }
  }
);





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