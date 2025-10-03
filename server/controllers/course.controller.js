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
        message: 'Course created successfully',
        course
    });


    } catch(e){
         return next(new AppError (e.message, 500))
    }
};

export const updateCourse = async (req,res,next) => {
      try{
        const {courseId} = req.params;
console.log("courseId:", courseId);

        const course = await Course.findByIdAndUpdate(
           courseId,
           {
            $set: req.body // means only provide the fields you want to update

           },
           {
            runValidators: true,
            new: true, // return the updated document
           } 
        )

        if (!course) {
             return next(new AppError ('Course not found', 400))
        }

        res.status(200).json({
            success: true,
            message: 'Course updated successfully!',
            course
        })

    } catch(e){
         return next(new AppError (e.message, 500))
    }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { lectureId } = req.query;

    const course = await Course.findById(courseId);
    if (!course) {
      return next(new AppError("Course does not exist on given Id!", 404));
    }

    //  If lectureId provided → delete lecture only
    if (lectureId) {
      const lectureIndex = course.lectures.findIndex(
        (lec) => lec._id.toString() === lectureId
      );

      if (lectureIndex === -1) {
        return next(new AppError("Lecture not found!", 404));
      }

      course.lectures.splice(lectureIndex, 1);
      course.numberOfLectures = course.lectures.length;

      await course.save();

      return res.status(200).json({
        success: true,
        message: "Lecture deleted successfully",
        course,
      });
    }

    //  If no lectureId → delete whole course
    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};


export const addLectureToCourseById = async (req, res, next) => {
  try {
    // required Inputs
    const { title, description } = req.body;
    const { courseId } = req.params;
    console.log(title, description)

    // Input validation
    if (!title || !description) {
      return next(new AppError('Title and description are required', 400));
    }

    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return next(new AppError('Course not found with given ID', 400));

    }

    const lectureData = {
        title,
        description,
        lecture: {} 
    }

    const isVideo = req.file.mimetype.startsWith("video");
console.log(req.file.mimetype)
    if (req.file){ //file upload for thumbnail
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'LMS',
            // resource_type: "auto" //to add both image and video
             resource_type: isVideo ? "video" : "image",
        });

        if (result) {
            lectureData.lecture.public_id = result.public_id;
            lectureData.lecture.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`);
    }

    course.lectures.push(lectureData);
    course.numberOfLectures = course.lectures.length;

    // Save changes
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Lecture added successfully',
      course
    });

  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};
