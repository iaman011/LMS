import {model, Schema} from 'mongoose';

const courseSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        minLength: [2, 'Title must be atleast 2 Characters'],
        maxLength: [59, 'Title should be less than 60 characters'],
        trim: true
    },
    description:{
        type: String,
        required: [true, 'Description is required'],
        minLength: [2, 'Description must be atleast 2 Characters'],
        maxLength: [200, 'Description should be less than 200 characters'],
        trim: true
    },
    category:{
        type: String,
        required: [true,'Category is required'],

    },
    thumbnail:{
        public_id: {
            type: String,
            required: true
        },
        secure_url:{
            type: String,
        }
    },
    lectures:[{
        title: String,
        description: String,
        lectures: {
            public_id: {
                type: String
            },
            secure_url: {
                type: String
            }
        }
    }],
    numberOfLectures: {
        type: Number,
        default: 0
    },
    createdBy:{
        type: String
    }
},{ 
    timestamps: true

});

const Course = new model('Course', courseSchema);

export default Course;

