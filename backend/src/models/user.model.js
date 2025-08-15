import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        trim: true,
    },
    refreshToken: {
        type: String,
    },
});

const User = mongoose.model('User',userSchema)