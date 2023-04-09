import { Router } from "express";
import { signupPost } from "../controllers/signupControllerPT.js"

const PTRouter = Router()

PTRouter.post('/signupPT', signupPost)
// userRouter.post('/login', loginPost)

export default PTRouter