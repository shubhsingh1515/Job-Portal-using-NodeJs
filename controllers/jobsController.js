
import jobsModel from '../models/jobsModel.js';

export const createjobController = async (req, res, next) => { 
    const {company, position } = req.body;

    if (!company || !position) {
        return res.status(400).json({ message: "Please provide all fields" });
    }
    req.body.createdBy = req.user._id;
    const job = await jobsModel.create(req.body);
    res.json({
        success: true,
        message: 'Job created successfully',
        job
    });
};

//GET JOBS

export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModel.find({ createdBy: req.user._id })
    res.status(200).json({
        success: true,
        totaljobs: jobs.length, 
        message: 'All jobs fetched successfully',
        jobs
    });

};
 