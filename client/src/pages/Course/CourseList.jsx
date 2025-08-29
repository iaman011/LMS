import React, { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice";
import CourseCard from "../../components/CourseCard";

const CourseList = () => {
  const dispatch = useDispatch();

  // ✅ Better naming convention
  const { courseList = [] } = useSelector((state) => state.course);

  // ✅ No need for async wrapper
  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
        <h1 className="text-center text-4xl font-semibold mb-5">
          Explore courses made by{" "}
          <span className="font-bold text-orange-600">Industry Experts</span>
        </h1>

         <div className="mb-10 flex flex-wrap gap-14">
        {courseList.length > 0 ? (
          courseList.map((element) => (
            <CourseCard key={element._id} data={element} />
          ))
        ) : (
          <p className="text-gray-400 text-lg">No courses available.</p>
        )}
      </div>

     
      </div>
    </HomeLayout>
  );
};

export default CourseList;
