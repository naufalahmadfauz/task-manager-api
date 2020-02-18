const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const validator = require('validator');
const Task = require('./tasks')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema(
    {name:
        {
            type:String,
            required: true,
            trim:true
        },email:{
        type:String,
        required:true,
        trim: true,
        unique:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },age:
        {
            type:Number,
            trim:true,
            default:0,
            validate(value) {if (value<0)
            {
                throw new Error('Must be over 0!')
            }
            }
        },
    password:{
        type:String,
        minlength:7,
        required:true,
        trim:true,
        validate(value){if(value.includes("password"))
        {throw new Error('do not add password')}
        }
    },
    tokens:[{
      token:{
          type:String,
          required:true,
      }
    }],
    avatar : {
        type: Buffer
    }
},{
        timestamps : true
    });

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner',
})

userSchema.methods.toJSON = function (){

        const user = this;
        const userObject = user.toObject()
        delete userObject.password;
        delete userObject.tokens;
        delete userObject.avatar;
        return userObject

}

//fungsi generate token
userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save();
    return token
}

//proses login compare password
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
       throw new Error('Unable to login')
    }

    return user

}
//hash plain text before save
userSchema.pre('save',async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})
//delete user task when user is removed
userSchema.pre('remove',async function (next) {
    const user = this;
    await Task.deleteMany({owner: user.id})
    next()
})
const User = mongoose.model('User',userSchema);
module.exports = User;