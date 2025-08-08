
import mongoose,{ Schema, model } from 'mongoose' 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'   

const userSchema = new Schema({
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true, 
        unique: true 
    },
    password: {
        type: String,
        required: true 
    },
    isAdmin: { 
        type: Boolean,
        default: false 
    },
    token: {
        type: String 
    }
},{ timestamps: true })

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);

    next();
}) 

userSchema.methods.generateToken = function() {
    return jwt.sign(
        {
            userId: this._id,
            username: this.username,
            email: this.email 
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRY 
        }
    )
}

export const User = mongoose.model('User', userSchema);  