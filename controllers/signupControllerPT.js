import PTApp from "../models/signupPTModel.js";
import jwt from "jsonwebtoken";

//token creation 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}

//signup post 
export const signupPostPT = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    const furtherDetails = {about:null,profileImg:null,latitude:null,longitude:null}

    try {
        const pt = await PTApp.signup(firstName, lastName, email, password, furtherDetails.about, furtherDetails.profileImg, furtherDetails.latitude, furtherDetails.longitude)
        const token = createToken(pt._id)
        res.status(200).json({ firstName, email, lastName, token })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

//login post
export const loginPostPT = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await PTApp.login(email, password)
        const token = createToken(user._id)
        console.log(token)
        res.status(200).json({ token, firstName: user.firstName, lastName: user.lastName })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//patch 
export const patchDetailsPT = async (req, res) => {
    console.log(req.user)
    const user_id = req.user._id
    // console.log('userid', user_id)
    console.log()

    const portfolio = await PTApp.find({ _id: user_id }).updateOne({ _id: user_id }, { ...req.body })
    const updatedPortfolio = await PTApp.find({ _id: user_id })
    // if (!Portfolio) {
    //     return res.status(400).json({ error: 'No such portfolio' })
    // }

    res.status(200).json(updatedPortfolio)

}

//get for PT 
export const getDetailsForPT = async (req, res) => {
    const user_id = req.user._id
    const detail = await PTApp.find({ _id: user_id })
    res.status(200).json(detail)
    console.log('success for PT')
}

//get fo client
export const getDetailsForClient = async (req, res) => {
    const detail = await PTApp.find({})
    res.status(200).json(detail)
    console.log('success for client ')
}