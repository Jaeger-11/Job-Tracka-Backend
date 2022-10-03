const Goal = require('../models/goalModel');
const {
    BadRequestError,
    NotFoundError,
} = require('../errors')

const getAllGoals = async (req,res) => {
    const goal = await Goal.find({createdBy:req.user.userId})
    res.status(200).json({count: goal.length ,goal})
}

const getGoal = async (req,res) => {
    res.send('A GOAL')
}

const createGoal = async (req,res) => {
    const { userId } = req.user
    req.body.createdBy = userId
    const goal = await Goal.create(req.body)
    res.status(200).json(goal)
}

const deleteGoal = async (req,res) => {
    const goal = await Goal.findByIdAndDelete({_id: req.params.id, createdBy: req.user.userId})
    if(!goal){
        throw new NotFoundError;
    }
    res.status(200).send()
}

const editGoal = async (req,res) => {
    const goal = await Goal.findByIdAndUpdate(
        {_id: req.params.id, createdBy: req.user.userId},
         req.body, 
         {new: true, runValidators: true}
    );
    if(!goal){
        throw new NotFoundError;
    }
    res.status(200).json(goal);
}

module.exports = {
    createGoal,
    getAllGoals,
    getGoal,
    deleteGoal,
    editGoal,
}