import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";

const CourseDescription = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // User role from auth slice
  const { role } = useSelector((state) => state.auth);

  // Subscription info from razorpay slice
  const subscriptionStatus = useSelector(
    (state) => state.razorpay.subscription.status
  );

  const isSubscribed = role === "ADMIN" || subscriptionStatus === "active";

  console.log("ROLE ->", role, "STATUS ->", subscriptionStatus, "isSubscribed ->", isSubscribed);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
        <div className="grid grid-cols-2 gap-10 py-10 relative">
          {/* Left side */}
          <div className="space-y-5">
            <img
              className="w-full h-64 object-cover rounded-md"
              alt="thumbnail"
              src={state?.thumbnail?.secure_url}
            />
            <div className="space-y-4 text-center">
              <p className="text-xl font-semibold">
                <span className="text-yellow-600">Total Lectures: </span>
                {state?.numberOfLectures || "N/A"}
              </p>
              <p className="text-xl font-semibold">
                <span className="text-yellow-600">Instructor: </span>
                {state?.createdBy || "N/A"}
              </p>
              <p className="text-xl">
                Subscription:{" "}
                <span
                  className={`font-bold ${
                    isSubscribed ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {subscriptionStatus || "Not Subscribed"}
                </span>
              </p>

              {isSubscribed ? (
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

          {/* Right side */}
          <div className="space-y-4 text-xl">
            <h1 className="text-3xl font-bold text-yellow-500 mb-5 text-center">
              {state?.title || "Course Title"}
            </h1>
            <p className="text-yellow-500 font-semibold">Course Description:</p>
            <p>{state?.description || "No description available."}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CourseDescription;
