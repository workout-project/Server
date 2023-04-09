import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;


const signupPT = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

//sign up 
signupPT.statics.signup = async function (firstName, lastName, email, password) {
    if (!firstName && !email && !lastName && !password) {
        throw Error('Please fill up the sign up form')
    }
    // email check
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    //password check
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong! Password should include at least one Upper letter,Lower Letter , numbers and signs')
    }

    const emailExist = await this.findOne({ email })
    if (emailExist) {
        throw Error('Email already registered')
    }

    //password hashing adding salt haha!
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const pt = await this.create({ firstName, email, lastName, password: hash })

    return pt
}






const PTApp = mongoose.model('ptapp', signupPT)


export default PTApp