import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }])

userRouter.route("/register").post(cpUpload,registerUser);

export default userRouter;
