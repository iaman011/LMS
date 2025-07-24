import { Router } from "express";
import { getAllCourses, getLecturesByCourseId } from "../controllers/course.controller.js";

const router = Router();

router
    .route('/')
    .get(getAllCourses);

router
    .route('/:courseId')
    .get(getLecturesByCourseId);  //to fetch lecture details


export default router;