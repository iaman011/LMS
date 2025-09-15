
import { useDispatch, useSelector } from 'react-redux'
import HomeLayout from '../../layouts/HomeLayout'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getUserData, updateProfile } from '../../redux/slices/authSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPersonCircle } from "react-icons/bs";

const EditProfie = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [data, setData] = useState({
        fullName: "",
        previewImage: "",
        avatar: undefined,  
        userId: useSelector((state) => state?.auth?.data._id)

    });
//  image upload have two steps:
// one step is going to be once you upload the image 
// then you are going to see the current image that you have uploaded as a preview image 
// second step is when you send the whole form data to the backend that point of time whole image file is sent to the backend 
    function handleImageUpload(e){
      e.preventDefault();
      const uploadedImage = e.target.files[0]; //this is the actual file
      if(uploadedImage){
        // base64 encoded string
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
          setData({
            ...data,
            previewImage: this.result, //base 64 stored in previewImage property
            avatar: uploadedImage  //actual file is stored in avatar property
          })
        })

      } 
    }

    function handleInputChange(e){
      const {name, value} = e.target;
      setData({
        ...data,
          [name]: value

        //   name consisit of anyone of these values so whatever it is we put it as a key (wrap up in square brackets) and then put the vaue directly: 
        //    fullName: "",
        // previewImage: "",
        // avatar: undefined,  
        // userId: useSelector((state) => state?.auth?.data._id)

        });
      
    }

   async function onFormSubmit(e){
  e.preventDefault();
  
  // optional check: file not mandatory if only name is being updated
  if(!data.fullName && !data.avatar){
    toast.error("At least one field required");
    return;
  }
  if(data.fullName && data.fullName.length < 1){
    toast.error("Name cannot be less than 1 character");
    return;
  }

  const formData = new FormData();
  // fullName may be empty if only image updating
  if (data.fullName) formData.append('fullName', data.fullName);
  // avatar may be undefined if only name updating
  if (data.avatar) formData.append('avatar', data.avatar);

  await dispatch(updateProfile(formData));   // PUT /user/update
  await dispatch(getUserData());             // GET /user/me





      navigate("/user/profile");
    }
  return (
    <HomeLayout>
    <div className="flex items-center justify-center h-[100vh]">
            <form
              onSubmit={onFormSubmit}
              className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]"
            >
              <h1 className="text-center text-2xl font-bold">
                Edit Profile
              </h1>
    
              {/* input for image file */}
              <label className="cursor-pointer" htmlFor="image_uploads">
                {data.previewImage ? (
                  <img
                    className="w-28 h-28 rounded-full m-auto"
                    src={data.previewImage}
                    alt="preview image"
                  />
                ) : (
                  <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                )}
              </label>
              <input
                onChange={handleImageUpload}
                // className="hidden"
                className="cursor-pointer"
                type="file"
                id="image_uploads"
                name="image_uploads"
                accept="image/jpeg, image/jpg, image/png"
              />
    
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter your full name"
                  className="bg-transparent px-2 py-1 border"
                  value={data.fullName}
                  onChange={handleInputChange}
                />
              </div>
    
              <Link to={"/user/profile"}>
                <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                  <AiOutlineArrowLeft /> Go Back to Profile
                </p>
              </Link>
    
              <button
                className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                type="submit"
              >
                Update Profile
              </button>
            </form>
          </div>
    </HomeLayout>
  )
}

export default EditProfie
