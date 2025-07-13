const {schema, model, Schema} = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"],
        minLength: [1, 'Name must be at-least 5 character'],
        maxLength: [50, 'Name must should be less than 50 character'],
        lowerCase: true,
        trim: true
    },
    emails: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        lowerCase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, 'Password must be at-least 8 character'],
        maxLength: [50, 'Password must should be less than 50 character'],
        select: false
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    avatar: {
        public_id: {
            type: String
        },
        secure_url:{
            type: String
        }
    },
    forgotPasswordTokens: String,
    forgotPasswordExpiry: Date

}, {
    timestamps: true
});

// now we create our model and we are going to use this model in our controller

const User = model('User', userSchema);
// 'User' is the collection name that we want to use in our database and second tell me the schema

module.exports = User;