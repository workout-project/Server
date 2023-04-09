import UserApp from "../models/signupModel.js";
import jwt from "jsonwebtoken";

//token creation 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

//signup post 
export const signupPost = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const furtherDetails = {weight:null,height:null,gender:null,fitnessGoal:null}
    
    try {
        const user = await UserApp.signup(firstName, lastName, email, password, furtherDetails.weight, furtherDetails.height, furtherDetails.gender, furtherDetails.fitnessGoal)
        const token = createToken(user._id)
        // req.user_id = await UserApp.findById(user._id).select("_id")
        res.status(200).json({ firstName, email, lastName, token })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//patch request 
export const patchDetails = async (req,res) => {
    const user_id = req.user._id
    console.log('userid', user_id)

    const portfolio = await UserApp.find({ _id: user_id }).updateOne({ _id: user_id }, { ...req.body })
    const updatedPortfolio = await UserApp.find({ _id: user_id })
    // if (!Portfolio) {
    //     return res.status(400).json({ error: 'No such portfolio' })
    // }

    res.status(200).json(updatedPortfolio)

}

export const getDetails = async (req, res) => {
    const user_id = req.user._id
    const detail = await UserApp.find({ _id : user_id })
    res.status(200).json(detail)
}