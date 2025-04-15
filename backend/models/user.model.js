import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the user schema with fields and validation
const userSchema = new Schema(
  {
    // Array of video IDs that user has watched
    WatchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",  // References the Video model
      },
    ],
    // Unique identifier for the user
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,  // Indexed for faster queries
    },
    // User's email address with validation
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    // User's full name
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // Profile picture URL
    avatar: {
      type: String,
      required: true,
    },
    // Optional cover image URL
    coverImage: {
      type: String,
    },
    // Hashed password
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // JWT refresh token for authentication
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt fields
  }
);

// Middleware: Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
  next();
});

// Method to verify password
userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password)
}

// Method to generate JWT access token
userSchema.methods.generatedAccessToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullName: this.fullName,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}

// Method to generate JWT refresh token
userSchema.methods.generatedRefreshToken = async function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}

// Create and export the User model
const User = mongoose.model("user", userSchema);
export default User;
