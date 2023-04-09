import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema


const userDetail = new Schema({
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
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    gender: {
        type: String
    },
    fitnessGoal: {
        type: String
    }
})


userDetail.statics.signup = async function (firstName, lastName, email, password, weight,height, gender, fitnessGoal) {
    //validation first , empty check
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

    const user = await this.create({ firstName, email, lastName, password: hash, weight, height, gender, fitnessGoal })

    return user 
    
}

userDetail.statics.login = async function (email,password) {
    //validation first , empty check
    if (!email || !password) {
        throw Error('Please fill up the sign up form')
    }
    //email check and password match
    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email is incorrect or not existed')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Password or email is incorrect')
    }

    return user
}



const UserApp = mongoose.model('userapp', userDetail);

export default UserApp