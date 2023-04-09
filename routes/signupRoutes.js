import { Router } from "express";
import { getDetails, patchDetails, signupPost } from "../controllers/signupController.js";
import { loginPost } from "../controllers/loginController.js";
import requireAuth from "../middleware/reqAuth.js";

const userRouter = Router()

userRouter.post('/signup', signupPost)
userRouter.post('/login', loginPost)
userRouter.use(requireAuth)
userRouter.patch('/signup', patchDetails)
userRouter.get('/signup',getDetails)


export default userRouter