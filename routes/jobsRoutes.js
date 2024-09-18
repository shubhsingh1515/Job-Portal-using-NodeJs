
import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createjobController, deleteJobController, getAllJobsController, updateJobController } from '../controllers/jobsController.js';

const router = express.Router();

//create-job routes
router.post('/create-job', userAuth, createjobController);

//get-job routes
router.get('/get-job', userAuth, getAllJobsController);

// update jobs
router.put('/update-job/:id', userAuth, updateJobController );

//delete jobs
router.delete('/delete-job/:id', userAuth, deleteJobController );

export default router;