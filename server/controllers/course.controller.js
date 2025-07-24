import Course from "../models/course.model.js"
import AppError from "../utils/appError.js"

export const getAllCourses =async(req,res,next) =>{

    try{
        // Fetch all courses from the database, excluding the 'lectures' field from the results because we dont want to show lecture name etc over here we just want to show how many lecture in it
        const courses = await Course.find({}).select('-lectures');
        res.status(200).json({
            success: true,
            message: 'All Courses',
            courses,
        })
    } catch (e){
        return next(new AppError (e.message, 500))
    }
}

export const getLecturesByCourseId = async(req,res,next) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
    }catch(e){
        
    }
}