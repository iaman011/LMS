import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, getLecturesByCourseId, updateCourse } from "../controllers/course.controller.js";
import isLoggedIn from "../middlewares/auth.middleware.js"
import upload from "../middlewares/multer.middleware.js"

const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post(
    upload.single('thumbnail'),  
    // Middleware to handle single file upload (field name: 'thumbnail') using Multer
    // The file will be available in req.file.

        createCourse
    );

// Route for fetching lectures, updating, and deleting a specific course using its id

router
    .route('/:courseId')
    .get(isLoggedIn,getLecturesByCourseId)  //to fetch lecture details
    // check this from lec 3 later after upload courses on postman
    .put(updateCourse)
    .delete(deleteCourse);

export default router;