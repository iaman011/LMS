import Course from "../models/course.model.js"
import AppError from "../utils/appError.js"
import cloudinary from 'cloudinary';
import fs from 'fs/promises';

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

        if (!course){
              return next(new AppError ('Invalid course Id', 400))
        }

        res.status(200).json({
            success: true,
            message: 'Course lectures fetched successfully',
            lectures: course.lectures
        })
    }catch(e){
         return next(new AppError (e.message, 500))
    }
}

export const createCourse = async (req,res,next) => {
    try{
        const { title, description, category, createdBy } = req.body;

        if ( !title || !description || !category || !createdBy) {
             return next(new AppError ('All fields are required', 400))
        }

        const course = await Course.create({
            title,
            description,
            category,
            createdBy,
            thumbnail: {
                public_id: 'DUMMY',
                secure_url: 'DUMMY'
            },
        });

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'LMS'
            });

            if (result) {
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            }
            fs.rm(`uploads/${req.file.filename}`);

        }

        await course.save();

        res.status(201).json({
        success: true,
        message: 'Course created successfully'
    });


    } catch(e){
         return next(new AppError (e.message, 500))
    }
};

export const updateCourse = async (req,res,next) => {
      try{

    } catch(e){
         return next(new AppError (e.message, 500))
    }
};

export const deleteCourse = async (req,res,next) => {
      try{

    } catch(e){
         return next(new AppError (e.message, 500))
    }
};