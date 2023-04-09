import FurtherDetail from "../models/furtherDetailModel.js"

export const userDetailGet = async (req, res) => {
    const user_id = req.user._id
    console.log(user_id)
    const detail = await FurtherDetail.find({ user_id })
    res.status(200).json(detail)
}



export const userDetailPost = async (req,res) => {
    
    const { height, weight, gender ,fitnessGoal} = req.body
    // const user_id =  req.user
    let empty = [];
    if (!height && !weight && !gender && !fitnessGoal) {
        empty.push('text')
    }
    if (empty.length > 0) {
        return res.status(400).json({ error: 'please finish up with form', empty })
    }

    try {
        // const detail = await UserApp.findById(user_id)
        const user_id = req.user._id
        const detail = await FurtherDetail.create({ height, weight, gender, fitnessGoal, user_id })
        res.status(200).json(detail)
    } catch (error) {
        res.status(400).json(error)
    }
}