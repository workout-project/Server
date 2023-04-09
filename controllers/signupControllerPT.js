import PTApp from "../models/signupPTModel.js";
import jwt from "jsonwebtoken";

//token creation 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

//signup post 
export const signupPost = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const pt = await PTApp.signup(firstName, lastName, email, password)
        const token = createToken(pt._id)
        res.status(200).json({ firstName, email, lastName, token })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}
