import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout.jsx";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isEmail } from "../helpers/regexMatcher.js";
import { useDispatch } from "react-redux";
import { createAccount } from "../redux/slices/authSlice.js";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    fullName: "",
    password: "",
    avatar: "",
    role: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  // here previewImage is the default image when user click on it, he choose the desired image

  function handleUserInput(e) {
    //the handler gets the event object
    const { name, value } = e.target; //target is the same input element on which you type
    setSignupDetails({
      ...signupDetails,
      [name]: value, // Update the changed field
    });
  }

  function handleImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) {
      return;
    }
    setSignupDetails({
      ...signupDetails,
      avatar: uploadedImage,
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  }

  const onFormSubmit = async (e) => {
    e.preventDefault(); //we dont page refresh to happen on submit the form

    // validation
    if (
      !signupDetails.email ||
      !signupDetails.password ||
      !signupDetails.fullName
    ) {
      toast.error("Please fill all the details");
      return;
    }
    if (signupDetails.fullName.length < 2) {
      toast.error("Name is Invalid");
    }
    if (!isEmail(signupDetails.email)) {
      toast.error("Invalid email is provided");
      return;
    }
    // if (!isValidPassword(signupDetails.password)) {
    //   toast.error(
    //     "Invalid password provided, password should be 6-16 character long with atleast a number and a special character"
    //   );
    //   return;
    // }

    // creating formData obj to serialise the image file
    const formData = new FormData();
    formData.append("fullName", signupDetails.fullName);
    formData.append("email", signupDetails.email);
    formData.append("password", signupDetails.password);
    formData.append("avatar", signupDetails.avatar);
    formData.append("role", signupDetails.role);

    const response = await dispatch(createAccount(formData));
    console.log(response);
    if (response?.payload?.success) {
      navigate("/");
    }

    // to reset the form after submission
    setSignupDetails({
      email: "",
      fullName: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  };

  return (
    <div>
      <HomeLayout>
        <div className="flex overflow-x-auto items-center justify-center h-[100vh] ">
          <form
            onSubmit={onFormSubmit}
            noValidate
            className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-35"
          >
            <h1 className="text-2xl text-center font-bold w-52">
              Registration Page
            </h1>
            {/* to upload avatar/image while signup */}
            <label htmlFor="image_uploads" className="cursor-pointer w-52">
              {previewImage ? (
                <img
                  className="w-24 h-24 rounded-full m-auto"
                  src={previewImage}
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
              )}
            </label>

            <input
              onChange={handleImage}
              type="file"
              className="hidden"
              name="image_uploads"
              id="image_uploads" //corresponds to label
              accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .webp, .svg, image/jpeg, image/png, image/gif, image/bmp, image/tiff, image/webp, image/svg+xml"
            />

            <div className="flex flex-col gap-1 w-52">
              <label htmlFor="fullName" className="font-semibold">
                Name
              </label>
              <input
                onChange={handleUserInput} //this callback receive an event object
                value={signupDetails.fullName}
                required
                type="text"
                name="fullName"
                className="bg-transparent px-2 py-1 border"
                placeholder="Enter your username"
                id="fullName"
              />
            </div>

            {/* Role Dropdown */}
            <div className="flex flex-col gap-1">
              <label htmlFor="role" className="font-semibold">
                Role
              </label>
              <select
                name="role"
                id="role"
                className="select select-bordered w-52 bg-transparent"
                defaultValue="USER" // default selected
                onChange={handleUserInput}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 w-52">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                onChange={handleUserInput} //this callback receive an event object
                value={signupDetails.email}
                required
                type="text"
                name="email"
                className="bg-transparent px-2 py-1 border"
                placeholder="Enter your Email"
                id="email"
              />
            </div>

            <div className="flex flex-col gap-1 w-52">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                onChange={handleUserInput} //this callback receive an event object
                value={signupDetails.password}
                required
                type="password"
                name="password"
                className="bg-transparent px-2 py-1 border"
                placeholder="Enter your password"
                id="password"
              />
            </div>

            <button className="mt-2 bg-yellow-800 hover:bg-yellow-500 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg w-52">
              Create Account
            </button>

            <p className="text-center w-52">
              Already have an account ?{" "}
              <Link to="/login" className="cursor-pointer text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
};

export default Signup;
