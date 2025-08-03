---
sabse pehle toh saare function ko sahi import aur export karo

agar function undefined bta rha hai toh sahi se import nahi hua hai

---
jis cheez ki bhi hame zaroorat hoti usse ham req.body se le lete hai phir isko aise   if ( !title || !description || !category || !createdBy) likhte hai taki error na ho aur value bhi used ho jaye nhi toh error cause value/element is unused


export const createCourse = async (req,res,next) => {
    try{
        const { title, description, category, createdBy } = req.body;

        if ( !title || !description || !category || !createdBy) {
             return next(new AppError ('All fields are required', 400))
        }
    } catch(e){
         return next(new AppError (e.message, 500))
    }
};

---
