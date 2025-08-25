import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout.jsx";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isEmail } from "../helpers/regexMatcher.js";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice.js";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signinDetails, setSigninDetails] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    //the handler gets the event object
    const { name, value } = e.target; //target is the same input element on which you type
    setSigninDetails({
      ...signinDetails,
      [name]: value, // Update the changed field
    });
  }

  const onFormSubmit = async (e) => {
    e.preventDefault(); //we dont page refresh to happen on submit the form

    // validation
    if (!signinDetails.email || !signinDetails.password) {
      toast.error("Please fill all the details");
      return;
    }

    if (!isEmail(signinDetails.email)) {
      toast.error("Invalid email is provided");
      return;
    }

    // from authslice, integrates frontend and backend
    const response = await dispatch(login(signinDetails));
    console.log(response);
    if (response?.payload?.success) {
      navigate("/");
    }

    // to reset the form after submission
    setSigninDetails({
      email: "",

      password: "",
    });
  };

  return (
    <div>
      <HomeLayout>
        <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
          <form
            onSubmit={onFormSubmit}
            noValidate
            className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-35"
          >
            <h1 className="text-2xl text-center font-bold">Login Page</h1>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                onChange={handleUserInput} //this callback receive an event object
                value={signinDetails.email}
                required
                type="text"
                name="email"
                className="bg-transparent px-2 py-1 border"
                placeholder="Enter your Email"
                id="email"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                onChange={handleUserInput} //this callback receive an event object
                value={signinDetails.password}
                required
                type="password"
                name="password"
                className="bg-transparent px-2 py-1 border"
                placeholder="Enter your password"
                id="password"
              />
            </div>

            <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg">
              Sign In
            </button>

            <p className="text-center">
              Do not have an account ?{" "}
              <Link to="/signup" className="cursor-pointer text-blue-500">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Signin;
