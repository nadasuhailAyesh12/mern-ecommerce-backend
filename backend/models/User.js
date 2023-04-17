const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"],
        maxlength: [30, "it ca’nt exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        validate: [isEmail, "email must be  a valid email"]
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        maxLength: [64, "password  cannot be longer than 64 characters"],
        minLength: [6, "password cannot be less than 6 characters "],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
            default: "0"
        },
        url: {
            type: String,
            required: true,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw2ep09oj2rnom7WHNByvS4j&ust=1679728250887000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPjfi8CB9P0CFQAAAAAdAAAAABAE"

        }
    },
    role: {
        type: String,
        requried: true,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpire: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('User', userSchema)