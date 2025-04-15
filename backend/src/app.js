// Import required packages
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// Create an express app instance
const app=express()

// Configure CORS middleware
app.use(cors({
    origin:[process.env.CORS_ORIGIN],  // Allow requests from specified origin
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",  // Allow specific HTTP methods
    credentials:true  // Allow credentials (cookies, authorization headers)
}))

// Parse JSON payloads with size limit of 16kb
app.use(express.json({limit:"16kb"}))

// Parse URL-encoded bodies with extended support and size limit
app.use(express.urlencoded({extended:true,limit:"16kb"}))

// Serve static files from the 'public' directory
app.use(express.static("public"))

// Parse cookies in incoming requests
app.use(cookieParser())

// Routes declaration & Import router
import userRouter from "../routes/user.routes.js"
app.use("/api/v1/users", userRouter)


// Export the configured app
export {app}