used when fetching something from database mainly used in controller
export const getLecturesByCourseId = async(req,res,next) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId);
    }catch(e){
        
    }
}