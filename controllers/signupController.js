import { sendRestEmail } from "../helpers/sendRestEmail.js";
import UserApp from "../models/signupModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//token creation 
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}
//for reset password
const restPassToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '5m' })
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



//forgot password

//checking the email and send a link 
export const postForgotPassword = async (req, res) => {
    const { email } = req.body 

    try {
        const user = await UserApp.forgotPassword(email)
        // console.log(user)
        const token = restPassToken(user._id)
        // console.log(token)
        
        //send email 
        const link = `http://localhost:8080/forgotPassword/${user._id}/${token}`
        console.log(link)
        await sendRestEmail(email,link)
        res.status(200).json('email sent successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
} 

//get the form link
export const getLink = async (req, res) => {
    const { id, token } = req.params
    //verify 
    const user = await UserApp.findById({ _id: id })
    if (!user) {
        res.status(400).json('user not existed!')
    }
    

    try {
        const verify = await jwt.verify(token, process.env.SECRET)
        res.render('email',{id: user._id , token: token})
    } catch (error) {
        console.log(error)
        res.status(400).json('user not verified')
    }

}

export const postNewPassword = async (req, res) => {
    const { id, token } = req.params


    const { password} = req.body
    console.log(password)
    if (!password) {
        throw Error('Please fill up the sign up form')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    console.log(hashPassword)
    
    try {
        

        // lets update 
        await UserApp.findOneAndUpdate(
            { _id: id },
            { password: hashPassword }
        )
        
        res.status(200).json('Password changed successfully!')
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
    
    

}