import { Router } from "express";
import { userDetailGet, userDetailPost } from "../controllers/userDetailController.js";
import requireAuth from "../middleware/reqAuth.js";

const detailRouter = Router();


//middleware 
detailRouter.use(requireAuth)

//post
detailRouter.post('/profile', userDetailPost)
detailRouter.get('/profile', userDetailGet)

export default detailRouter