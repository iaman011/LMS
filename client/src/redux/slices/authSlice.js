// on refresh the page, user dont get logout if he loggedin it fetch the value from local storage and let the user logged in instead of logout

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
});

export default authSlice.reducer;