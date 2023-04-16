import { Router } from "express";
import { getDetails, getLink, patchDetails, postForgotPassword, postNewPassword, signupPost } from "../controllers/signupController.js";
import { loginPost } from "../controllers/loginController.js";
import requireAuth from "../middleware/reqAuth.js";
import { getDetailsForClient, getDetailsForPT, loginPostPT, patchDetailsPT, signupPostPT } from "../controllers/signupControllerPT.js";
import requireAuthPT from "../middleware/reqAuthPT.js";

const userRouter = Router()

userRouter.post('/signup', signupPost)
userRouter.post('/login', loginPost)
userRouter.post('/signupPT', signupPostPT)
userRouter.post('/loginPT', loginPostPT)
userRouter.post('/forgotPassword', postForgotPassword)
userRouter.get('/forgotPassword/:id/:token', getLink)
userRouter.post('/forgotPassword/:id/:token',postNewPassword)
userRouter.use(requireAuth)
userRouter.get('/signupPTClient', getDetailsForClient)
userRouter.patch('/signup', patchDetails)
userRouter.get('/signup', getDetails)
userRouter.use(requireAuthPT)
userRouter.patch('/signupPT', patchDetailsPT)
userRouter.get('/signupPT',getDetailsForPT)


export default userRouter