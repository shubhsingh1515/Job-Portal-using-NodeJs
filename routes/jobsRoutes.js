
import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createjobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobsController.js';

const router = express.Router();

//create-job routes
router.post('/create-job', userAuth, createjobController);

//get-job routes
router.get('/get-job', userAuth, getAllJobsController);

// update jobs
router.put('/update-job/:id', userAuth, updateJobController );

//delete jobs
router.delete('/delete-job/:id', userAuth, deleteJobController );

//JOB STATS/FILTER
router.get('/job-stats', userAuth, jobStatsController ); 

export default router;