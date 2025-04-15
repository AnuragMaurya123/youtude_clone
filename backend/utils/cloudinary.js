import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { ApiError } from "./apiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadOnCloudinary = async function (localFilePath) {
  if (!localFilePath) return null;

  try {
    if (!fs.existsSync(localFilePath)) {
      throw new ApiError(400, `File not found at path: ${localFilePath}`);
    }
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    return uploadResult;
  } catch (error) {
    console.log(error);
    // ✅ Safely try to clean up
    if (fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
      } catch (unlinkErr) {
        console.warn("Error deleting local file:", unlinkErr.message);
      }
    }
    throw new ApiError(400, "Error while uploading image", [error.message]);
  }
};

export { uploadOnCloudinary };
