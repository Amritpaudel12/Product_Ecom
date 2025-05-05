import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"; 
import bcrypt from 'bcryptjs'

const tokenGenerate = async (userId) => {
    const user = await User.findById(userId);
    const token = user.generateToken();
    return token;
}

const registerUser = asyncHandler(
    async(req,res,next) => {
        const { username, email, password } = req.body;

        if(
            [username, email, password].some((field)=>{
                return field === '';
            })
        ) {
            new ApiError(
                402,
                "all fields are required" 
            )
        }

        const isEmailExist = await User.find({email:email}); 

        if(
            isEmailExist.length > 0
        ) {
            new ApiError(
                402,
                " User already exists "
            )
        }

        const newUser = new User({
            username,
            email,
            password
        })

        const user = await newUser.save();

        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                "User Registered Successfully ",
                user 
            )
        )
    }
)

const loginUser = asyncHandler(
    async(req,res,next) => {
        const { email, password } = req.body;
        if(
            [email, password].some((field)=>{
                return field === '';
            })
        ) {
            new ApiError(
                402,
                "all fields are required ! "
            )
        }

        const isUserExist = await User.find({email:email});

        if(
            !isUserExist 
        ) {
            new ApiError(
                404,
                " Please Register First " 
            )
        }

        const comparePassword = await bcrypt.compare(password, isUserExist[0].password);

        if(
            !comparePassword
        ) {
            new ApiError(
                402,
                "Incorrect Password "
            )
        }

        const token = await tokenGenerate(isUserExist[0]._id);

        console.log("token ", token);

        if(
            !token 
        ) {
            new ApiError(
                402,
                " token is not created "
            )
        }
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: true 
        })

        res.status(
            200
        ).json(

            new ApiResponse(
                200,
                " User LoggedIn Successfully ",
                isUserExist
            )
        )

    }
)

const logoutUser = asyncHandler(
    async(req,res,next) => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true
        });
        res.status(
            200
        ).json(
            new ApiResponse(
                200,
                " User LoggedOut Successfully " 
            )
        )
    }
)

export {
    registerUser,
    loginUser,
    logoutUser 
}