import UserApp from "../models/signupModel.js";
import jwt from "jsonwebtoken";

//token creation 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

//signup post 
export const loginPost = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserApp.login(email, password)
        const token = createToken(user._id)
        console.log(token)
        res.status(200).json({token, firstName: user.firstName,lastName: user.lastName})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}