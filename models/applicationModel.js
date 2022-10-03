const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, "Please state a company name"],
        maxlength:100
    },
    position:{
        type: String,
        required: [true, "Please provide job position"],
        maxlength: 100
    },
    location:{
        type: String,
        default: "not stated",
        maxlength:100
    },
    status:{
        type:String,
        enum:['pending', 'interview', 'rejected', 'declined', 'success'],
        default: 'pending'
    },
    jobType:{
        type:String,
        enum:['full-time', 'part-time', 'remote', 'hybrid', 'internship', 'contract'],
        default: 'full-time'
    },
    notes:{
        type: String,
        default:"No Additional Notes",
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, "Please provide user"]
    }
},{timestamps:true})


module.exports = mongoose.model('Application', applicationSchema);