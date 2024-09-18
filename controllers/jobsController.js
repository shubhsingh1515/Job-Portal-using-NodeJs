
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

//UPDATE JOBS

export const updateJobController = async (req, res, next) => {
    const id = req.params.id;
    const { company, position } = req.body; 
    //validation
    if(!company || !position){
        return res.status(400).json({ message: "Please provide all fields" });
    }
    const job = await jobsModel.findOne({ _id: id });
    //validation
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }    
    if(req.user._id.toString() !== job.createdBy.toString()){
        return res.status(403).json({ message: "You are not authorized to update this job" });
    }
    const updatedJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, { new: true, runValidators: true }); 
    res.json({
        success: true,
        message: 'Job updated successfully',
        updatedJob
    });  
};

//DELETE JOBS

export const deleteJobController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const job = await jobsModel.findOne({ _id: id });
        
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        if (req.user._id.toString() !== job.createdBy.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this job" });
        }
        await job.deleteOne();
        res.json({
            success: true,
            message: 'Job deleted successfully'
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Server error" });
    }
};

 