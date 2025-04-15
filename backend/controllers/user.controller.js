import { ApiError } from "../utils/apiError.js";
import asyncHandle from "../utils/asyncHandle.js";
import { userRegisterValidation } from "../validation/user.validation.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const registerUser = asyncHandle(async (req, res) => {
  //getting data from frontend
  const { username, email, fullName, password } = await req.body;
  const avatarPath = req.files?.avatar[0]?.path;
  const coverImagePath = req.files?.coverImage[0]?.path;

  //ensuring data is properly coming if not throwing error
  userRegisterValidation.parse({
    ...req.body,
    avatar: avatarPath,
    coverImage: coverImagePath,
  });

  //checking if user already exists or not (email & username)
  const existingUser = await User.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (existingUser) {
    const field = existingUser.email === email ? "email" : "username";
    throw new ApiError(400, `User with  ${field} already exists`);
  }
  // uploading images in cloudinary and getting url

  const avatarImage = await uploadOnCloudinary(avatarPath);

  if (!avatarPath) {
    throw new ApiError(400, "Error while uploading avatar image");
  }

  // Handle optional cover image upload
  let uploadedCoverImageUrl = null;
  if (coverImagePath) {
    const uploadedCoverImage = await uploadOnCloudinary(coverImagePath);
    if (!uploadedCoverImage?.url) {
      throw new ApiError(500, "Error while uploading cover image");
    }
    uploadedCoverImageUrl = uploadedCoverImage.url;
  }
  //creating user object
  const newUser = await User.create({
    username,
    email,
    avatar: avatarImage.url,
    password,
    fullName,
    coverImage: uploadedCoverImageUrl,
  });
  const userWithoutPassword = await User.findById(newUser._id).select(
    "-password"
  );
  return res.status(201).json(
    new ApiResponse(
      200,
      true,
      userWithoutPassword,
      "User successfully resgister"
    )
  );

  //todo:creating accessToken passing throught cookie

  //todo:creating refreshToken storing in  database
});
