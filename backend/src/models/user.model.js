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

userSchema.pre('save', async function(){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
})

userSchema.methods.isPasswordCorrect = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        id: this._id,
        name: this.name,
        email: this.email,
        userName: this.userName,
    },

    process.env.ACCESS_TOKEN_SECRET,

    { expiresIn: '1h' },
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '30d' },
    )
}
const User = mongoose.model('User',userSchema)