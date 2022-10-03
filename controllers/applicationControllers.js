const Application = require("../models/applicationModel");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const { default: mongoose } = require("mongoose");

const getAllApplications = async (req,res) => {
    const { 
        jobType,
        status, 
        searchByCompany, 
        searchByPosition, 
        sort,
    } = req.query

    const queryObject = { createdBy: req.user.userId }

    // const sortBy = sort ? sort : "-createdAt"
    if(searchByCompany){
        queryObject.company = {$regex: searchByCompany, $options:'i'}
    }
    if(searchByPosition){
        queryObject.position = {$regex: searchByPosition, $options:'i'}
    }
    if(status && status !== "all"){
        queryObject.status = status;
    }
    if(jobType && jobType !== "all"){
        queryObject.jobType = jobType;
    }
    let result = Application.find(queryObject).select('company position status jobType createdAt location')
    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
    result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
    result = result.sort('position');
    }
    if (sort === 'z-a') {
    result = result.sort('-position');
    }

    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
   
    result = result.skip(skip).limit(limit)
    const applications = await result
    const totalApplications = await Application.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalApplications / limit)
    res.status(200).json({totalApplications, numOfPages , applications})
}

const showStatistics = async (req,res) => {
    let stats = await Application.aggregate([
        { $match: { createdBy : mongoose.Types.ObjectId(req.user.userId) } },
        { $group : { _id : '$status', count: { $sum: 1 } } },
    ])

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc; 
    }, {} )

    const totalApplications = await Application.countDocuments({createdBy: req.user.userId });

    defaultStats = {
        total : totalApplications,
        success : stats.success || 0,
        pending : stats.pending || 0,
        interview : stats.interview || 0,
        declined : stats.declined || 0,
        rejected : stats.rejected || 0,
    }

    res.status(200).json(defaultStats)
}

const getApplication = async (req,res) => {
    const { id } = req.params
    const { userId } = req.user
    try {
        const application = await Application.findOne({ _id:id, createdBy: userId })
        res.status(200).json({application})
    } catch (error) {
        throw new NotFoundError("Application does not exist");
    }
}

const createApplication = async (req,res) => {
    const { userId} = req.user
    req.body.createdBy = userId;
    const application = await Application.create(req.body)
    res.status(200).json(application)
}

const deleteApplication = async (req,res) => {
    const {  user : {userId}, params : { id }  } = req;
    const application = await Application.findByIdAndRemove({_id:id, createdBy: userId})
    if(!application){
        throw new NotFoundError('Application does not exist!')
    }
    res.status(200).send()
}

const editApplication = async (req,res) => {
    const {  
        user : {userId}, 
        params : { id },
        body: { company, position } 
    } = req;
    if( company === "" || position === "" ){
        throw new BadRequestError("Company or Position cannot be empty");
    }
    const application = await Application.findByIdAndUpdate({
        _id:id, createdBy: userId },
        req.body, 
        {new: true, runValidators: true
        })
    if(!application){
        throw new NotFoundError('Application does not exist!')
    }
    res.status(200).json({application})
}

module.exports = {
    getAllApplications,
    getApplication,
    createApplication,
    editApplication,
    deleteApplication,
    showStatistics
}