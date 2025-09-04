import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createNewCourse } from '../../redux/slices/courseSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const CreateCourse = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  })

  function handleImageUpload(e){
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage){ //if you got the uploaded image
       console.log(uploadedImage);
      const fileReader = new FileReader(); // you got the fileReader object
      fileReader.readAsDataURL(uploadedImage); //inside file reader we will say 
      fileReader.addEventListener("load", function(){ //the moment you load the file it is a load event inside this we actually have a response back we actually get the result parameter , dont pass the fn as arrow fn it destruct the binding in previewImage
        setUserInput({
          ...userInput,  // structur of previous user input
          thumbnail: uploadedImage,  //this uploaded image is the actual file
          previewImage: this.result //this actually a load method give access to the result parameter 
        })
      });
    }

  }

  function handleUserInput(e){
    const {name,value} = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  async function onformSubmit(e){
    e.preventDefault();
    if(!userInput.title || !userInput.description || !userInput.createdBy || !userInput.category || !userInput.thumbnail){
      toast.error("All fields are mandatory");
      return;
    }
    // making it async function because this is the time we dispatch 
    const response = await dispatch(createNewCourse(userInput));
    if(response?.payload?.success){
      // agar successfully course create ho jaye toh setUserInput ko blank kr do aur /courses pe navigate kr do
      setUserInput({
         title: "",
          description: "",
          category: "",
          createdBy: "",
          thumbnail: null,
          previewImage: "",
      });

      navigate("/courses");
          
    }
  }

  return (
    <div>
       <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
              {/* card for creating the new card */}
              <form
                onSubmit={onformSubmit}
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] h-[450px] my-10 shadow-[0_0_10px_black] relative"
              >
                <Link
                  to={"/admin/dashboard"}
                  className="absolute top-8 text-2xl link text-accent cursor-pointer"
                >
                  <AiOutlineArrowLeft />
                </Link>
      
                {/* <h1 className="text-center text-2xl font-bold">
                  {!initialCourseData.newCourse ? "Update" : "Create new"}{" "}
                  <span>Course</span>
                </h1> */}
      
                <main className="grid grid-cols-2 gap-x-10">
                  {/* this is left side grid */}
                  {/* for course basic details */}
                  <div className="space-y-6">
                    <div
                      // onClick={() =>
                      //   !initialCourseData.newCourse
                      //     ? toast.error("Cannot update thumbnail image")
                      //     : ""
                      // }
                    >
                      {/* input for image file */}
                      <label className="cursor-pointer" htmlFor="image_uploads">
                        {userInput?.previewImage ? (
                          <img
                            className="w-full h-44 m-auto border"
                            src={userInput.previewImage}
                            alt="preview image"
                          />
                        ) : (
                          <div className="w-full h-44 m-auto flex items-center justify-center border">
                            <h1 className="font-bold text-lg">
                              Upload your course thumbnail
                            </h1>
                          </div>
                        )}
                      </label>
                      <input
                        onChange={handleImageUpload}
                        className="hidden"
                        type="file"
                        id="image_uploads" //this id is same as the link in label htmlfor
                        name="image_uploads"
                        accept=".jpg,.jpeg,.png,.svg"
                        // disabled={isDisabled}
                      />
                    </div>
      
                    {/* adding the title section */}
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold" htmlFor="title">
                        Course Title
                      </label>
                      <input
                        required
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter the course title"
                        className="bg-transparent px-2 py-1 border"
                        value={userInput.title}
                        onChange={handleUserInput}
                      />
                    </div>
                  </div>
                  {/* Right side of the grid */}
                  {/* for course description and go to profile button */}
      
                  {/* adding the course description */}
                  <div className="flex flex-col gap-1">
                    {/* adding the instructor */}
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold" htmlFor="createdBy">
                        Instructor Name
                      </label>
                      <input
                        required
                        type="name"
                        name="createdBy"
                        id="createdBy"
                        placeholder="Enter the instructure name"
                        className="bg-transparent px-2 py-1 border"
                        value={userInput.createdBy}
                        onChange={handleUserInput}
                      />
                    </div>
      
                    {/* adding the category */}
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold" htmlFor="category">
                        Course Category
                      </label>
                      <input
                        required
                        type="name"
                        name="category"
                        id="category"
                        placeholder="Enter the category name"
                        className="bg-transparent px-2 py-1 border"
                        value={userInput.category}
                        onChange={handleUserInput}
                      />
                    </div>
      
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold" htmlFor="description">
                        Course Description
                      </label>
                      <textarea
                        required
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Enter the course description"
                        className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                        value={userInput.description}
                        onChange={handleUserInput}
                      />
                    </div>
                  </div>
                </main>
      
                <button
                  className="w-full bg-orange-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                  type="submit"
                >
                  Create Course
                  {/* {!initialCourseData.newCourse ? "Update Course" : "Create Course"} */}
                </button>
              </form>
            </div>
    </HomeLayout>
    </div>
  )
}

export default CreateCourse
