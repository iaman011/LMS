✅ Summary Table:
Use Case	Correct Code	Notes
You already have the document	await course.deleteOne();	Calls .deleteOne() on the Mongoose document instance
You do not have the document yet	await Course.findByIdAndDelete(courseId);	Finds and deletes in one call (more concise, no need to call findById first)