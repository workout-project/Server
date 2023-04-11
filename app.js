import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/signupRoutes.js";
import detailRouter from "./routes/userDetailRoutes.js";
// import PTRouter from "./routes/signupPTRoutes.js";

dotenv.config()

//mongoose connection 
mongoose.connect(process.env.DB_URI)
    .then(() => console.log('connected to db'))
    .catch(()=> console.log("connection failed"))

const app = express();

//middleware 
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());

//routes
app.use(userRouter)
// app.use(PTRouter)
app.use(detailRouter)





app.listen(process.env.PORT, () => {
    console.log('app is listening')
})

export default app