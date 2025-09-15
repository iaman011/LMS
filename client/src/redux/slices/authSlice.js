import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../config/axiosinstance.js";

// Safe JSON parse helper
function safeJSONParse(item, fallback = {}) {
  try {
    const value = localStorage.getItem(item);
    return value && value !== "undefined" ? JSON.parse(value) : fallback;
  } catch (e) {
    return fallback;
  }
}

// Initial state
const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  data: safeJSONParse("data", {}),
  role:
    localStorage.getItem("role") && localStorage.getItem("role") !== "undefined"
      ? localStorage.getItem("role")
      : "",
};

// *** Thunks ***

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


// function to handle logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    let res = axiosInstance.get("/user/logout");

    await toast.promise(res, {
      loading: "Loading...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log out",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});



// function to fetch user data
export const getUserData = createAsyncThunk("/auth/getData", async () => {
  try {
    const res = await axiosInstance.get("/user/me");
    return (await res).data;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
});

// function to change user password
export const changePassword = createAsyncThunk(
  "/auth/changePassword",
  async (userPassword) => {
    try {
      let res = axiosInstance.post("/user/change-password", userPassword);

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => data?.data?.message,
        error: "Failed to change password",
      });

      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to handle forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email) => {
    try {
      let res = axiosInstance.post("/user/reset", { email });

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => data?.data?.message,
        error: "Failed to send verification email",
      });

      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// Redux thunk
// function to update user profile
export const updateProfile = createAsyncThunk(
  "/auth/update/profile",
  async (formData) => {
    try {
      let res = axiosInstance.put('/user/update', formData); // ✅ no id
      toast.promise(res, {
        loading: "Wait! Updating...",
        success: (data) => data?.data?.message,
        error: "Failed to update profile",
      });
      res = await res;
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);



// function to reset the password
export const resetPassword = createAsyncThunk("/user/reset", async (data) => {
  try {
    let res = axiosInstance.post(`/user/reset/${data.resetToken}`, {
      password: data.password,
    });

    toast.promise(res, {
      loading: "Resetting...",
      success: (data) => data?.data?.message,
      error: "Failed to reset password",
    });

    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

// *** Slice ***
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // for user login
      .addCase(login.fulfilled, (state, action) => {
        if (action?.payload?.user) {
          const { user } = action.payload;

          localStorage.setItem("data", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("role", user?.role || "");

          state.isLoggedIn = true;
          state.data = user;
          state.role = user?.role || "";
        }
      })

      // for user logout     
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
      })
    
      // for user details
      // .addCase(getUserData.fulfilled, (state, action) => {
      //   if (action?.payload?.user) {
      //     const { user } = action.payload;

      //     localStorage.setItem("data", JSON.stringify(user));
      //     localStorage.setItem("isLoggedIn", "true");
      //     localStorage.setItem("role", user?.role || "");

      //     state.isLoggedIn = true;
      //     state.data = user;
      //     state.role = user?.role || "";
      //   }
      // });
.addCase(getUserData.fulfilled, (state, action) => {
  if (!action?.payload?.user) return;

  localStorage.setItem("data", JSON.stringify(action?.payload?.user));
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("role", action?.payload?.user?.role);

  state.isLoggedIn = true;
  state.data = action?.payload?.user;
  state.role = action?.payload?.user?.role;




        
      });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
