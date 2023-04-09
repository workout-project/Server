import mongoose from "mongoose";

const Schema = mongoose.Schema;

const furtherDetail = new Schema({
    weight: {
        type: Number,
        required: true 
    },
    height: {
        type: Number,
        required: true 
    },
    gender: {
        type: String,
        required: true 
    },
    fitnessGoal: {
        type: String,
        required: true 
    },
    user_id:{
        type: String,
        required: true
    }
})




const FurtherDetail = mongoose.model('furtherdetail', furtherDetail);

export default FurtherDetail