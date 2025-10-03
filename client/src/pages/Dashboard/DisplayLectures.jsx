import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// import Layout from "../../Layout/Layout";
import HomeLayout from "../../layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../redux/slices/lectureSlice";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for getting the data from location of previous component
  const {state} = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  // to play the video accordingly
  const [currentVideo, setCurrentVideo] = useState(0);

  // function to handle lecture delete
  // const handleLectureDelete = async (courseId, lectureId) => {
  //   const data = { courseId, lectureId };
  //   await dispatch(deleteCourseLecture(data));
  //   await dispatch(getCourseLecture(courseDetails._id));
  // };

  async function onLectureDelete(cid, lid){
    await dispatch(deleteCourseLecture({courseId: cid, lectureId:  lid}));
    await dispatch(getCourseLecture(state._id));
  }

  useEffect(() => {
    if(!state) navigate("/courses");
    dispatch(getCourseLecture(state._id));
  }, [])

  // fetching the course lecture data
  // useEffect(() => {
  //   (async () => {
  //     await dispatch(getCourseLecture(courseDetails._id));
  //   })();
  // }, []);
  return (
   <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        {/* displaying the course name */}

        <div className="text-center text-2xl font-semibold text-yellow-500">
          Course Name : {state?.title}
        </div>

        {lectures && lectures.length > 0 && (
          <div className="flex justify-center gap-10 w-full">
          {/* left section for playing the video and displaying course details to admin */}
          <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
            <video
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              src={lectures[currentVideo]?.lecture?.secure_url}
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div>
              <h1>
                <span className="text-yellow-500">Title : </span>
                {lectures[currentVideo]?.title}
              </h1>
              <p>
                {" "}
                <span className="text-yellow-500 line-clamp-4">
                  Description :{" "}
                </span>
                {lectures[currentVideo]?.description}
              </p>
            </div>
          </div>

          {/* right section for displaying all the lectures of the course */}
          <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
            <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
              <p>Lectures List</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture")
                  }
                  className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                >
                  Add New Lecture
                </button>
              )}
            </li>
            {
              lectures.map((lecture, index) => {
                return (
                  <li className="space-y-2" key={lecture._id}>
                    <p
                      className="cursor-pointer"
                      onClick={() => setCurrentVideo(index)}
                    >
                      <span className="text-yellow-500">
                        {" "}
                        Lecture {index + 1} :{" "}
                      </span>
                      {lecture?.title}
                    </p>
                    {role === "ADMIN" && (
                      <button
                        onClick={() =>
                          onLectureDelete(state?._id, lecture?._id)
                        }
                        className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                      >
                        Delete Lecture
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div> 
        )}

       
      </div>
    </HomeLayout>
  );
};

export default DisplayLectures;
