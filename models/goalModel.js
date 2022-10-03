const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    goal: {
        type: String,
        required: [ true, 'Goal should not be empty' ],
        minlength: 5
    },
    status: {
        type: String,
        enum: ['accomplished', 'unaccomplished'],
        default: "unaccomplished"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, "Please provide user"]
    }
},{timestamps:true})


module.exports = mongoose.model('Goal', goalSchema);