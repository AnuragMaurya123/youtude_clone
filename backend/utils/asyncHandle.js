import { ApiError } from "./apiError.js";

const asyncHandler=(requestHandler)=>{
   return (req,res,next)=>{
        Promise.resolve(
            requestHandler(req,res,next)
        ).catch((err)=>{
            // console.log("Error in async Function",err);
            if (err.name === "ZodError") {
                throw new ApiError(400, "Validation failed", err.errors);
            }
            next(err) 
        })
    }
}

export default asyncHandler ;