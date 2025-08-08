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
    async (req, res, next) => {
        const { username, email, password } = req.body;

        if (
            [username, email, password].some((field) => {
                return field === '';
            })
        ) {
            throw new ApiError(
                400,
                "All fields are required!"
            );
        }

        const isEmailExist = await User.find({ email: email });
        console.log("isEmailExist: ", isEmailExist);
        if (
            isEmailExist.length > 0
        ) {
            throw new ApiError(
                409, // 409 Conflict if resource already exists
                "User with this email already exists!"
            );
        }

        const newUser = new User({
            username,
            email,
            password
        });
        console.log("newUser: ", newUser);

        const user = await newUser.save();
        console.log("User saved: ", user);
        res.status(201).json( // 201 Created
            new ApiResponse(
                201,
                "User Registered Successfully",
                user
            )
        );
    }
);

const loginUser = asyncHandler(
    async (req, res, next) => {
        const { email, password } = req.body;

        if (
            [email, password].some((field) => {
                return field === '';
            })
        ) {
            throw new ApiError(
                400,
                "All fields are required!"
            );
        }

        const isUserExist = await User.findOne({ email: email }); // Use findOne for a single document
        console.log("isUserExist: ", isUserExist);
        if (
            !isUserExist
        ) {
            throw new ApiError(
                404,
                "User not found. Please register first."
            );
        }

        const comparePassword = await bcrypt.compare(password, isUserExist.password);
        console.log("Password match: ", comparePassword);
        if (
            !comparePassword
        ) {
            res.status(401).json(
                {message: "Incorrect Password"}
            );
        }

        const token = await tokenGenerate(isUserExist._id);
        console.log("Generated Token: ", token);

        if (
            !token
        ) {
            throw new ApiError(
                500, // 500 Internal Server Error if token generation fails
                "Token could not be created."
            );
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure only in production
            sameSite: 'Lax', // Or 'Strict' depending on your needs
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json(
            new ApiResponse(
                200,
                "User Logged In Successfully",
                { user: isUserExist, token } // Return user object and token if needed
            )
        );
    }
);

const logoutUser = asyncHandler(
    async (req, res, next) => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
        });
        res.status(200).json(
            new ApiResponse(
                200,
                "User Logged Out Successfully"
            )
        );
    }
);

const getAllUsers = asyncHandler(
    async (req, res, next) => {

        const allUsers = await User.find({}).select('-password'); 
        console.log("All users: ", allUsers);
        if (!allUsers) {
            throw new ApiError(500, "Could not retrieve users.");
        }

        res.status(200).json(
            new ApiResponse(
                200,
                "All users retrieved successfully",
                allUsers
            )
        );
    }
);

export {
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers 
};