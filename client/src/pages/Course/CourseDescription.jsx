import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";

const CourseDescription = () => {
  // onClick={() => navigate("/course/description", { state: { ...data } })}
  // to access this , we have a hook called useLocation() and useLocation() is going to return you the whole object inside that object  there is a state parameter , it is state key that is associated to another object which is the unpacked version of the data coming inside

  const { state } = useLocation();
  const navigate = useNavigate();

  const { role, data } = useSelector((state) => state.auth);

  console.log("ROLE ->", role, "STATUS ->", data?.subscription?.status);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
        <div className="grid grid-cols-2 gap-10 py-10 relative">
          <div className="space-y-5">
            <img
              className="w-full h-64"
              alt="thumbnail"
              src={state?.thumbnail?.secure_url}
            />
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-between text-xl">
                <p className="font-semibold">
                  <span className="text-yellow-600">Total Lectures: </span>{" "}
                  {state?.numberOfLectures}
                </p>
                <p className="font-semibold">
                  <span className="text-yellow-600">Instructor: </span>{" "}
                  {state?.createdBy}
                </p>
              </div>

              {role == "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                  onClick={() =>
                    navigate("/course/displaylectures", { state: { ...state } })
                  }
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-orange-600 transition-all ease-in-out duration-300"
                >
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-orange-600 transition-all ease-in-out duration-300"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          {/* Right of the grid */}
          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
                {state?.title}
            </h1>
            <p className="text-yellow-500">
                Course Description: {" "}

            </p>
            <p>
                {state?.description}
            </p>

          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
